import express from "express";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

function getToken(req: express.Request): string | null {
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const match = cookie.match(/jwt=([^;]+)/);
  return match ? match[1] : null;
}

// Middleware to verify JWT
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).access_token = decoded.access_token;
    next();
  } catch {
    res.status(403).json({ error: "Invalid or expired token" });
  }
}

// Public random/search photos
router.get("/search", async (req, res) => {
  const query = (req.query.query as string) || "random";
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&client_id=${process.env.UNSPLASH_CLIENT_ID}`;
  const r = await fetch(url);
  const data = await r.json();
  res.json(data);
});

// Favorite photo
router.post("/like/:id", requireAuth, async (req, res) => {
  const accessToken = (req as any).access_token;
  const photoId = req.params.id;

  const r = await fetch(`https://api.unsplash.com/photos/${photoId}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await r.json();
  res.json(data);
});

// Get liked photos
router.get("/favorites", requireAuth, async (req, res) => {
  const accessToken = (req as any).access_token;
  const r = await fetch(`https://api.unsplash.com/users/me/likes`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await r.json();
  res.json(data);
});

export default router;
