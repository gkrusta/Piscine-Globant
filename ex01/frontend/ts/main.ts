// const button = document.getElementById("clickMe") as HTMLButtonElement;
// const message = document.getElementById("message") as HTMLParagraphElement;
// let count: number = 0;

// button.addEventListener("click", (): void => {
// count++;
// message.textContent = ‘You clicked ${count} times!‘;
// });

import { login, getToken, setToken } from "./auth.js";
import { getPhotos, searchPhotos } from "./api.js";
import { Photo } from "./types.js";

const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const gallery = document.getElementById("gallery") as HTMLElement;

loginBtn.addEventListener("click", login);

async function renderPhotos(photos: Photo[]) {
  gallery.innerHTML = "";
  for (const photo of photos) {
    const img = document.createElement("img");
    img.src = photo.urls.small;
    img.alt = photo.alt_description || "Photo";
    gallery.appendChild(img);
  }
}

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (!query) return renderPhotos(await getPhotos());
  const results = await searchPhotos(query);
  renderPhotos(results);
});

renderPhotos(await getPhotos());
