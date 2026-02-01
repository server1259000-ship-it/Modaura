import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const sql = neon(process.env.DATABASE_URL);
    const { name, desc, url, price, affiliate_link, category } = req.body;
    
    try {
      await sql('INSERT INTO dresses (name, description, url, price, affiliate_link, category) VALUES ($1, $2, $3, $4, $5, $6)', 
      [name, desc, url, price, affiliate_link, category]);
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
