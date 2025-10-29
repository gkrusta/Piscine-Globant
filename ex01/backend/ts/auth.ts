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
  if (!code) return res.status(400).json({ error: "Missing authorization code" });

  try {
    const body = {
      client_id: process.env.UNSPLASH_CLIENT_ID,
      client_secret: process.env.UNSPLASH_CLIENT_SECRET,
      redirect_uri: process.env.UNSPLASH_REDIRECT_URI,
      code,
      grant_type: "authorization_code",
    };

    const r = await fetch("https://unsplash.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await r.text(); // 👈 change to text() to log raw output
    console.log("Unsplash token response:", data);

    if (!r.ok) {
      return res.status(r.status).send(data);
    }

    const token = jwt.sign(
      { access_token: JSON.parse(data).access_token },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Send as http-only cookie
    res.cookie("jwt", token, { httpOnly: true, sameSite: "lax", secure: false });
    res.redirect("http://localhost:8080/");
  } catch (err) {
    console.error("Token exchange failed:", err);
    res.status(500).json({ error: "Token exchange failed", details: String(err) });
  }
});


router.get("/me", (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.json({ loggedIn: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    res.json({ loggedIn: true });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ ok: true });
});

export default router;

