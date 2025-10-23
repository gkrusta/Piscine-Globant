import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Backend running!');
});

app.listen(PORT, () => {
  console.log(`Backend is listening on port ${PORT}`);
  console.log(`UNSPLASH_CLIENT_ID from .env: ${process.env.UNSPLASH_CLIENT_ID}`);
});

