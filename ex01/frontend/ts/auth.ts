const BACKEND = "http://localhost:3000";

export async function logout() {
  await fetch(`${BACKEND}/auth/logout`, { method: "POST", credentials: "include" });
  alert("Logged out");
  window.location.reload();
}

async function isLoggedIn(): Promise<boolean> {
  const r = await fetch(`${BACKEND}/auth/me`, { credentials: "include" }); // 👈 add here
  const data = await r.json();
  return !!data.loggedIn;
}
