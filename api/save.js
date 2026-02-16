import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Frontend se aane wala data
      const { name, price, image, link, desc, id } = req.body;
      
      // Sab cheezon ko ek saath JSON bana kar Redis ki 'dresses' list mein daalna
      await redis.lpush('dresses', JSON.stringify({ name, price, image, link, desc, id }));
      
      return res.status(200).json({ message: 'Saved successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.status(405).json({ message: 'Method not allowed' });
}
