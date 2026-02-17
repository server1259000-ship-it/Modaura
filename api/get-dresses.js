import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  try {
    const dresses = await redis.lrange('dresses', 0, -1);
    const data = dresses.map(item => {
      try { return typeof item === 'string' ? JSON.parse(item) : item; } 
      catch (e) { return null; }
    }).filter(i => i !== null);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
