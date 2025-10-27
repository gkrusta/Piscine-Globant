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
const loginBtn = document.getElementById("loginBtn");


if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "http://localhost:3000/auth/login"; // redirect user to Unsplash OAuth login
  });
}


if (searchBtn) {
  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim() || "nature";

    // call backend (port 3000)
    const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    // clear old photos
    gallery.innerHTML = "";

    // pick up to 10 random distinct photos
    const results = Array.isArray(data.results) ? data.results.slice() : [];

    for (let i = results.length - 1; i > 0; i--) { // shuffle
      const j = Math.floor(Math.random() * (i + 1));
      [results[i], results[j]] = [results[j], results[i]];
    }
    const selected = results.slice(0, 10);

    // show new photos
    selected.forEach((photo: any, idx: number) => {
      const img = document.createElement("img");
      img.src = photo.small;
      img.alt = photo.alt || `Photo ${idx + 1}`;
      img.classList.add('gallery-img'); // styling + animation from CSS
      // add slight stagger using inline style for animation delay
      img.style.animationDelay = `${(idx % 5) * 0.3}s`;
      gallery.appendChild(img);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  searchInput.value = "nature";
  searchBtn?.click();
});