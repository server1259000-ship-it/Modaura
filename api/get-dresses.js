import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function handler(req, res) {
  try {
    const dresses = await redis.get('dresses');
    return res.status(200).json(dresses || []);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
