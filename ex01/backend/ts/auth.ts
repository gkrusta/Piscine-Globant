import express from "express";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const UNSPLASH_AUTH_URL = "https://unsplash.com/oauth/authorize";
const UNSPLASH_TOKEN_URL = "https://unsplash.com/oauth/token";

function getEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing ${key}`);
  return v;
}

// Redirect to Unsplash
router.get("/login", (_req, res) => {
  const clientId = getEnv("UNSPLASH_CLIENT_ID");
  const redirectUri = getEnv("UNSPLASH_REDIRECT_URI");
  const scope = "public+read_user+write_likes";
  const url = `${UNSPLASH_AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  res.redirect(url);
});

// hides and displays btns after login
export async function handleLoginSuccess() {
  document.getElementById("loginBtn")!.classList.add("hidden");
  document.getElementById("logoutBtn")!.classList.remove("hidden");
}


// Unsplash redirects back here
router.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.status(400).send("Missing code");

  const body = {
    client_id: getEnv("UNSPLASH_CLIENT_ID"),
    client_secret: getEnv("UNSPLASH_CLIENT_SECRET"),
    redirect_uri: getEnv("UNSPLASH_REDIRECT_URI"),
    code,
    grant_type: "authorization_code",
  };

  try {
    const r = await fetch(UNSPLASH_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data: any= await r.json();

    if (!data.access_token) {
      return res.status(500).json({ error: "Failed to get access token" });
    }

    handleLoginSuccess();

    // Create a JWT for user
    const token = jwt.sign(
      { access_token: data.access_token },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );

    // Send JWT as a cookie and redirect to frontend
    res.cookie("jwt", token, { httpOnly: true, sameSite: "lax" });
    res.redirect("http://localhost:8080/");
  } catch (err) {
    res.status(500).json({ error: "Token exchange failed" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ ok: true });
});

export default router;

// UNSPLASH_REDIRECT_URI=http://localhost:3000/auth/callback
