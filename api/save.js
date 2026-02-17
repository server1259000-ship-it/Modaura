import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, price, images, category, link, desc, id } = req.body;
      // 'images' ab array ki shakal mein save hoga
      await redis.lpush('dresses', JSON.stringify({ name, price, images, category, link, desc, id }));
      return res.status(200).json({ message: 'Saved successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.status(405).json({ message: 'Method not allowed' });
}
