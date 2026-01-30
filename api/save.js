import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const sql = neon(process.env.DATABASE_URL);
  const { name, desc, url } = req.body;
  try {
    await sql`INSERT INTO dresses (name, description, image_url) VALUES (${name}, ${desc}, ${url})`;
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
                                 }

