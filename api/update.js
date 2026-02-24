import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const updatedDress = req.body;
      const allDresses = await redis.lrange('dresses', 0, -1);
      
      const newDataList = allDresses.map(item => {
        const dress = typeof item === 'string' ? JSON.parse(item) : item;
        return dress.id === updatedDress.id ? JSON.stringify(updatedDress) : item;
      });

      await redis.del('dresses');
      if(newDataList.length > 0) {
        await redis.rpush('dresses', ...newDataList);
      }
      return res.status(200).json({ message: 'Dress updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
