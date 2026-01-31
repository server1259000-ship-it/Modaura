import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, desc, url, price, affiliate_link, category } = req.body;
    try {
      await sql`INSERT INTO dresses (name, description, url, price, affiliate_link, category) 
                VALUES (${name}, ${desc}, ${url}, ${price}, ${affiliate_link}, ${category});`;
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
