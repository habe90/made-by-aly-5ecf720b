import {getInstagramFeed, DEFAULT_INSTAGRAM_URL} from '@/lib/instagram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const {posts, profileUrl} = await getInstagramFeed(8);
    return Response.json({posts, profileUrl}, {headers: {'Cache-Control': 'public, max-age=300'}});
  } catch {
    return Response.json({posts: [], profileUrl: DEFAULT_INSTAGRAM_URL});
  }
}
