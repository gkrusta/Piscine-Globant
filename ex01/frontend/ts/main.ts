// const button = document.getElementById("clickMe") as HTMLButtonElement;
// const message = document.getElementById("message") as HTMLParagraphElement;
// let count: number = 0;

// button.addEventListener("click", (): void => {
// count++;
// message.textContent = ‘You clicked ${count} times!‘;
// });
// call your backend, then render images

const searchBtn = document.getElementById("searchBtn")!;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const gallery = document.getElementById("gallery")!;

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim() || "nature";

  // call backend (port 3000)
  const response = await fetch(`http://localhost:3000/api/search?query=${query}`);
  const data = await response.json();

  // clear old photos
  gallery.innerHTML = "";

  // show new photos
  data.results.forEach((photo: any) => {
    const img = document.createElement("img");
    img.src = photo.small;
    img.alt = photo.alt || "Photo";
    img.style.width = "150px";
    img.style.margin = "5px";
    gallery.appendChild(img);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  searchInput.value = "nature";
  searchBtn.click();
});