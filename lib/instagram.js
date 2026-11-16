import {db} from './db';

// Instagram API (Instagram Login). Token: Postavke → Instagram, ili env INSTAGRAM_ACCESS_TOKEN.
// Long-lived token traje 60 dana; ovdje se automatski osvježava svakih ~7 dana.
const GRAPH = 'https://graph.instagram.com';
const CACHE_MS = 15 * 60 * 1000;
const REFRESH_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
export const DEFAULT_INSTAGRAM_URL = 'https://www.instagram.com/madebyaly/';

const g = globalThis;
if (!g.__alyInstagram) g.__alyInstagram = {posts: null, at: 0, pending: null};
const cache = g.__alyInstagram;

async function loadSettings() {
  const {rows} = await db.query('SELECT data FROM admin_settings WHERE id=1');
  return rows[0]?.data || {};
}

async function refreshTokenIfDue(settings) {
  const token = settings.instagram_token;
  if (!token) return;
  const last = Date.parse(settings.instagram_token_refreshed_at || 0) || 0;
  if (Date.now() - last < REFRESH_AFTER_MS) return;
  try {
    const r = await fetch(`${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`, {cache: 'no-store'});
    const d = await r.json();
    if (!r.ok || !d.access_token) throw new Error(d.error?.message || `HTTP ${r.status}`);
    await db.query(
      `UPDATE admin_settings SET data = data || jsonb_build_object('instagram_token', $1::text, 'instagram_token_refreshed_at', $2::text) WHERE id=1`,
      [d.access_token, new Date().toISOString()]
    );
  } catch (e) {
    console.error('Instagram token refresh nije uspio:', e.message);
  }
}

async function fetchPosts(limit) {
  const settings = await loadSettings();
  const token = settings.instagram_token || process.env.INSTAGRAM_ACCESS_TOKEN;
  const profileUrl = settings.instagram_url || DEFAULT_INSTAGRAM_URL;
  if (!token) return {posts: [], profileUrl, configured: false};
  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const r = await fetch(`${GRAPH}/me/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`, {cache: 'no-store'});
  const d = await r.json();
  if (!r.ok) throw new Error(d.error?.message || `HTTP ${r.status}`);
  if (settings.instagram_token) refreshTokenIfDue(settings);
  const posts = (d.data || [])
    .map(p => ({
      id: p.id,
      image: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
      video: p.media_type === 'VIDEO',
      caption: (p.caption || '').slice(0, 160),
      url: p.permalink,
      date: p.timestamp
    }))
    .filter(p => p.image && p.url);
  return {posts, profileUrl, configured: true};
}

export async function getInstagramFeed(limit = 8) {
  if (cache.posts && Date.now() - cache.at < CACHE_MS) return cache.posts;
  if (!cache.pending) {
    cache.pending = fetchPosts(limit)
      .then(result => { cache.posts = result; cache.at = Date.now(); return result; })
      .catch(async e => {
        console.error('Instagram feed nije dostupan:', e.message);
        if (cache.posts) return cache.posts; // zadrži zadnji uspješan rezultat
        let profileUrl = DEFAULT_INSTAGRAM_URL;
        try { profileUrl = (await loadSettings()).instagram_url || profileUrl; } catch {}
        return {posts: [], profileUrl, configured: true, error: true};
      })
      .finally(() => { cache.pending = null; });
  }
  return cache.pending;
}

export function clearInstagramCache() {
  cache.posts = null;
  cache.at = 0;
}
