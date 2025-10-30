# Image Gallery

An image gallery using Unsplash API used for the Piscine Globant exercise.


<div align="center">
  <img src="images/gallery.png" alt="Standard Version">
</div>

## Description
A simple SPA image gallery that uses Unsplash OAuth for login, allows users to search photos, like/unlike photos, and view their favorites.

Built with Vanilla TypeScript (no frameworks) and runs with Docker + Docker Compose.


## ENV
Create backend/.env (copy .env.example):
```bash
UNSPLASH_CLIENT_ID=your_client_id
UNSPLASH_CLIENT_SECRET=your_secret
UNSPLASH_REDIRECT_URI=http://localhost:8080/auth/callback
JWT_SECRET=secret
```


## How to run
```bash
docker compose up --build
```
1. Open `index.html` in your browser, or
2. From the project folder run a simple server and open the page:
   - python: `python3 -m http.server 8000`
   - then open `http://localhost:8000/`


## Features
✅ Login with Unsplash OAuth

✅ Search photos

✅ Display random photos on load

✅ Like & Unlike photos

✅ View favorite photos

✅ JWT stored in HttpOnly cookies

✅ Backend proxy to keep secrets safe

✅ Tailwind + TypeScript frontend

✅ SPA navigation (no page refresh)


## Project structure
```bash
├── backend/              # Node/Express backend
│   ├── ts/               # TypeScript source
│   │   ├── server.ts
│   │   ├── auth.ts
│   │   └── photos.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── frontend/             # Frontend (HTML,Tailwind CSS + TS)
│   ├── ts/
│   │   ├── main.ts       # UI + routing
│   │   └── auth.ts       # login / token check
│   ├── css/
│   │   └── style.css
│   ├── index.html
│   ├── default.conf      # nginx config
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```