import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
// app.use(cors()); // Allow all origins

dotenv.config();
const app = express();
const PORT = 3000;


app.get('/api/search', async (req, res) => {
  try {
    const q = (req.query.query as string) || 'random';
    const page = req.query.page || '1';
    const per_page = req.query.per_page || '10';
    const accessKey = process.env.UNSPLASH_CLIENT_ID;
    if (!accessKey) return res.status(500).json({ error: 'Missing access key' });

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&page=${page}&per_page=${per_page}&client_id=${accessKey}`;
    const r = await fetch(url);
    if (!r.ok) return res.status(r.status).json({ error: 'Unsplash error' });
    const data = await r.json();
    // Optionally: map to only needed fields
    const results = data.results.map((p: any) => ({
      id: p.id,
      alt: p.alt_description,
      thumb: p.urls.thumb,
      small: p.urls.small,
      full: p.urls.full,
      author: p.user.name
    }));
    res.json({ total: data.total, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend is listening on port ${PORT}`);
  console.log(`UNSPLASH_CLIENT_ID from .env: ${process.env.UNSPLASH_CLIENT_ID}`);
});
