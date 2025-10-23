import { Photo } from "./types.js";
import { getToken } from "./auth.js";

const UNSPLASH_API = "https://api.unsplash.com";

export async function getPhotos(): Promise<Photo[]> {
  const res = await fetch(`${UNSPLASH_API}/photos?per_page=20`, {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`
    }
  });
  return res.json();
}

export async function searchPhotos(query: string): Promise<Photo[]> {
  const res = await fetch(`${UNSPLASH_API}/search/photos?query=${query}`, {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`
    }
  });
  const data = await res.json();
  return data.results;
}
