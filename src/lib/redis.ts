import Redis from "ioredis";

let redis: Redis | null = null;

function getRedisClient(): Redis | null {
  if (redis) return redis;

  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

  try {
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      lazyConnect: true,
      enableOfflineQueue: false,
    });

    redis.on("error", () => {
      // silently fail - Redis is optional
      redis = null;
    });

    return redis;
  } catch {
    return null;
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = getRedisClient();
    if (!client) return null;
    const data = await client.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds = 300
): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client) return;
    await client.setex(key, ttlSeconds, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

export async function cacheDel(key: string): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client) return;
    await client.del(key);
  } catch {
    // silently fail
  }
}

export async function cacheFlushPattern(pattern: string): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client) return;
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(...keys);
    }
  } catch {
    // silently fail
  }
}

export const CACHE_KEYS = {
  departments: "hospital:departments",
  doctors: "hospital:doctors",
  doctorsByDept: (deptId: number) => `hospital:doctors:dept:${deptId}`,
  doctor: (id: number) => `hospital:doctor:${id}`,
  news: "hospital:news",
  newsItem: (slug: string) => `hospital:news:${slug}`,
  testimonials: "hospital:testimonials",
  services: "hospital:services",
  stats: "hospital:stats",
};
