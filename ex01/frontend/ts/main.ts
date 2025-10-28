import { logout, isLoggedIn } from "./auth.js";

const loginBtn = document.getElementById("loginBtn")!;
const logoutBtn = document.getElementById("logoutBtn")!;
const favoritesBtn = document.getElementById("favoritesBtn")!;
const searchBtn = document.getElementById("searchBtn")!;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const gallery = document.getElementById("gallery")!;

// login
loginBtn.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/auth/login";
});

// logout
logoutBtn.addEventListener("click", logout);

// check if logged in
if (await isLoggedIn()) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline";
}

// search btn
searchBtn.addEventListener("click", async () => {
  const q = searchInput.value.trim() || "nature";
  const res = await fetch(`http://localhost:3000/api/search?query=${q}`);
  const data = await res.json();
  gallery.innerHTML = "";
  data.results.forEach((photo: any) => {
    const img = document.createElement("img");
    img.src = photo.urls.small;
    img.addEventListener("click", async () => {
      await fetch(`http://localhost:3000/api/like/${photo.id}`, {
        method: "POST",
        credentials: "include",
      });
      alert("Photo liked!");
    });
    gallery.appendChild(img);
  });
});
