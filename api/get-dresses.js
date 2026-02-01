import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);
  try {
    const posts = await sql('SELECT * FROM dresses ORDER BY id DESC');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
