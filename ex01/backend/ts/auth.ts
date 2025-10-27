import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const UNSPLASH_AUTH_URL = "https://unsplash.com/oauth/authorize";
const UNSPLASH_TOKEN_URL = "https://unsplash.com/oauth/token";

const getEnv = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing ${key}`);
  return v;
};

// redirect to Unsplash login
router.get("/login", (_req, res) => {
  const clientId = getEnv("UNSPLASH_CLIENT_ID");
  const redirectUri = getEnv("UNSPLASH_REDIRECT_URI");
  const authUrl = `${UNSPLASH_AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public+read_user`;
  res.redirect(authUrl);
});

// exchange code for token
router.post("/exchange", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Missing code" });

  try {
    const response = await fetch(UNSPLASH_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: getEnv("UNSPLASH_CLIENT_ID"),
        client_secret: getEnv("UNSPLASH_CLIENT_SECRET"),
        redirect_uri: getEnv("UNSPLASH_REDIRECT_URI"),
        code,
        grant_type: "authorization_code",
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Token exchange failed" });
  }
});

export default router;
