// Jednostavan in-memory rate limiter (dovoljan za jednu instancu aplikacije).
const globalForLimits = globalThis;
if (!globalForLimits.__alyRateLimits) globalForLimits.__alyRateLimits = new Map();
const buckets = globalForLimits.__alyRateLimits;

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return (forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown').trim();
}

// Vraća {ok:true} ili {ok:false, retryAfter: sekunde}. Svaki poziv troši jedan pokušaj.
export function rateLimit(key, {limit, windowMs}) {
  const now = Date.now();
  if (buckets.size > 10000) for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = {count: 0, resetAt: now + windowMs};
    buckets.set(key, bucket);
  }
  bucket.count += 1;
  if (bucket.count > limit) return {ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000)};
  return {ok: true};
}

export function resetRateLimit(key) {
  buckets.delete(key);
}

export function tooManyAttempts(retryAfter) {
  return Response.json(
    {message: 'Previše pokušaja. Pokušajte ponovo za nekoliko minuta.'},
    {status: 429, headers: {'Retry-After': String(retryAfter)}}
  );
}
