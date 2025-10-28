const BACKEND = "http://localhost:3000";

export async function logout() {
  await fetch(`${BACKEND}/auth/logout`, { method: "POST", credentials: "include" });
  alert("Logged out");
  window.location.reload();
}

export async function isLoggedIn(): Promise<boolean> {
  const cookies = document.cookie.split(";");
  return cookies.some((c) => c.trim().startsWith("jwt="));
}
