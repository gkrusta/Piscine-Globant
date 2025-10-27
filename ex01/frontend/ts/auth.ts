import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const UNSPLASH_AUTH_URL = "https://unsplash.com/oauth/authorize"; // when click login
const UNSPLASH_TOKEN_URL = "https://unsplash.com/oauth/token"; // to ask API for a token

// env var
function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

// generate Unsplash login URL
function getUnsplashAuthUrl(): string {
  const clientId = getEnv("UNSPLASH_CLIENT_ID");
  const redirectUri = getEnv("UNSPLASH_REDIRECT_URI");
  const responseType = "code";
  const scope = "public read_user";

  return `${UNSPLASH_AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
}

// route to start login
router.get("/login", (_req, res) => {
  res.redirect(getUnsplashAuthUrl());
});

// route Unsplash redirects back to
router.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  try {
    const tokenResponse = await fetch(UNSPLASH_TOKEN_URL, {
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

    const data = await tokenResponse.json();
    if (!data.access_token) {
      return res.status(500).json({ error: "Failed to get access token", data });
    }

    res.json({ access_token: data.access_token });
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Authentication failed" });
  }
});

export default router;
