import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Graceful degradation: if Upstash env vars are not set, rate limiting is bypassed.
// In production, always set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
function createRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    console.warn(
      '[rate-limit] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set. ' +
      'Rate limiting is disabled. Set these env vars in production.',
    )
    return null
  }

  const redis = new Redis({ url, token })

  // 5 attempts per 15 minutes per IP
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m'),
    analytics: true,
    prefix: 'krylosys:login',
  })
}

const limiter = createRateLimiter()

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: Date
}

export async function checkLoginRateLimit(ip: string): Promise<RateLimitResult> {
  if (!limiter) {
    // No Redis configured — allow request (dev mode / missing config)
    return { allowed: true, remaining: 999, resetAt: new Date() }
  }

  const { success, remaining, reset } = await limiter.limit(ip)

  return {
    allowed: success,
    remaining,
    resetAt: new Date(reset),
  }
}
