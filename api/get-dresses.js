import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  try {
    // Redis se sari dresses uthana
    const dresses = await redis.lrange('dresses', 0, -1);
    
    // Har item ko check karna ke wo sahi format mein hai ya nahi
    const data = dresses.map(item => typeof item === 'string' ? JSON.parse(item) : item);
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
