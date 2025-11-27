RangRivaaz — Upgraded Full MVP (v2)
===================================

This package contains:
- client/  (React + Vite + Tailwind front-end with images, tabs, cart, checkout demo)
- server/  (Node + Express API with categories, search, checkout endpoints)
- run_dev.sh / run_dev.bat to install and start both (root-level script uses concurrently)

Quick start (UNIX / macOS / WSL):
1. Unzip the package.
2. From project root run:
   ./run_dev.sh
This will:
 - install root, client and server dependencies
 - start the server (http://localhost:4000)
 - start the Vite dev server (http://localhost:5173)

API endpoints:
 - GET /api/venues
 - GET /api/vendors
 - GET /api/categories
 - GET /api/search?q=...
 - POST /api/checkout

Notes:
 - Images are local SVG placeholders under client/public/images.
 - For production, build the client (cd client && npm run build) and serve with the server (node server/index.js).

If you want Docker + docker-compose or a deployed Vercel link, tell me and I'll add it.
