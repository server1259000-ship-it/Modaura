import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Ye line database se saara updated data (Price, Link, etc.) nikaal kar laati hai
    const { rows } = await sql`SELECT * FROM dresses ORDER BY id DESC;`;
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
