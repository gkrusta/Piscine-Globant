import express from "express";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();


// JWT from cookies
function getAccessToken(req: express.Request): string | null {
  const token = req.cookies?.jwt;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    return decoded.access_token as string;
  } catch {
    return null;
  }
}

// Middleware to protect routes
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const t = getAccessToken(req);
  if (!t) return res.status(401).json({ error: "Not logged in" });

  (req as any).access_token = t;
  next();
}

// Public random/search photos
router.get("/search", async (req, res) => {
  try {
    const query = (req.query.query as string) || "";
    let url = "";
    if (query) {
      url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&client_id=${process.env.UNSPLASH_CLIENT_ID}`;  // normal search
    } else {
      url = `https://api.unsplash.com/photos/random?count=10&client_id=${process.env.UNSPLASH_CLIENT_ID}`; // random photos
    }

    const r = await fetch(url);
    const data: any = await r.json();

    const results = query ? data.results : data;
    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load photos" });
  }
});

// Like / unlike a photo
router.all("/like/:id", requireAuth, async (req, res) => {
  const accessToken = (req as any).access_token;
  const photoId = req.params.id;
  const method = req.method;
  const r = await fetch(`https://api.unsplash.com/photos/${photoId}/like`, {
    method,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await r.json();
  res.json(data);
});

// Get liked photos
router.get("/favorites", requireAuth, async (req, res) => {
  const accessToken = (req as any).access_token;

  const r = await fetch(`https://api.unsplash.com/users/gkrusta/likes`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data: any = await r.json();
  const results = Array.isArray(data) ? data : data.results;
  res.json({ results });
});

export default router;
