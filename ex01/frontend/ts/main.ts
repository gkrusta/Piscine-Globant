import { logout, isLoggedIn } from "./auth.js";
const BACKEND = "http://localhost:3000";

const loginBtn = document.getElementById("loginBtn")!;
const logoutBtn = document.getElementById("logoutBtn")!;
const favoritesBtn = document.getElementById("favoritesBtn")!;
const searchBtn = document.getElementById("searchBtn")!;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const gallery = document.getElementById("gallery")!;
const homeBtn = document.getElementById("homeBtn")!;

// login
loginBtn.addEventListener("click", () => {
  window.location.href = `${BACKEND}/auth/login`;
});

// home
homeBtn.addEventListener("click", async () => {
  searchInput.value = "";
  loadRandom();
});

// render photos
function renderPhotos(photos: any[], loggedIn: boolean) {
  gallery.innerHTML = "";
  photos.forEach((photo) => {
    const wrap = document.createElement("div");
    wrap.className = "relative inline-block";

    const img = document.createElement("img");
    img.src = photo.urls.small;
    img.alt = photo.alt_description || "photo";
    img.classList.add("rounded","shadow-md");

    const heart = document.createElement("button");
    heart.innerHTML = "♡";
    heart.className = "absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 text-lg hover:text-red-600";

    let liked = false;
    heart.addEventListener("click", async () => {
      if (!loggedIn) {
        alert("You can't like photos.");
        return;
      }
      const method = liked ? "DELETE" : "POST";
      const res = await fetch(`${BACKEND}/api/like/${photo.id}`, {
        method,
        credentials: "include",
      });
      if (res.ok) {
        liked = !liked;
        heart.innerHTML = liked ? "❤️" : "♡";
      }  
      else alert("Failed to like (maybe rate-limited).");
    });

    wrap.appendChild(img);
    wrap.appendChild(heart);
    gallery.appendChild(wrap);
  });
}

// logout
logoutBtn.addEventListener("click", async () => {
  await fetch(`${BACKEND}/auth/logout`, { method: "POST", credentials: "include" });
  loginBtn.classList.remove("hidden");
  logoutBtn.classList.add("hidden");
  // reload random after logout
  searchInput.value = "";
  loadRandom();
});

// favs
favoritesBtn.addEventListener("click", async () => {
  const logged = await isLoggedIn();
  if (!logged) {
    alert("Please log in to view favorites.");
    return;
  }
  searchBtn.classList.add("hidden");
  searchInput.classList.add("hidden");
  const r = await fetch(`${BACKEND}/api/favorites`, { credentials: "include" });
  const data = await r.json();
  renderPhotos(data.results ?? [], false);
});

// search
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // stop form reload
  const q = searchInput.value.trim();
  const r = await fetch(`${BACKEND}/api/search?query=${encodeURIComponent(q)}`);
  const data = await r.json();
  const logged = await isLoggedIn();
  renderPhotos(data.results ?? [], logged);
});

// load gallery
async function loadRandom() {
  searchBtn.classList.remove("hidden");
  searchInput.classList.remove("hidden");
  const r = await fetch(`${BACKEND}/api/search`); // no query so random
  const data = await r.json();
  const logged = await isLoggedIn();
  renderPhotos(data.results ?? [], logged);
  //  header buttons
  if (logged) { loginBtn.classList.add("hidden"); logoutBtn.classList.remove("hidden"); }
  else { loginBtn.classList.remove("hidden"); logoutBtn.classList.add("hidden"); }
}

window.addEventListener("DOMContentLoaded", loadRandom);
// load random 10 photos at the beginning
// window.addEventListener("DOMContentLoaded", async () => {
//   const res = await fetch("http://localhost:3000/api/search");
//   const data = await res.json();
//   gallery.innerHTML = "";
//   data.results.forEach((photo: any) => {
//     const img = document.createElement("img");
//     img.src = photo.urls.small;
//     img.classList.add('gallery-img');
//     gallery.appendChild(img);
//   });
// });
