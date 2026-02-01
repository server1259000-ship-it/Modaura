import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const dress = req.body;
      const currentData = await redis.get('dresses');
      let dresses = [];
      
      if (currentData) {
        dresses = typeof currentData === 'string' ? JSON.parse(currentData) : currentData;
      }
      
      dresses.push(dress);
      await redis.set('dresses', JSON.stringify(dresses));
      
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
