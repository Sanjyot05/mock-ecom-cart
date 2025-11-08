📦 My Mock E-Commerce Store

A full-stack mock e-commerce cart built for Vibe Commerce coding assignment.

🧠 Overview

This project demonstrates:

A React (Vite) frontend

A Node/Express backend

SQLite database for persistence

Full CRUD cart management

Mock checkout flow (no payments)

⚙️ Tech Stack

Frontend: React + TailwindCSS + Vite

Backend: Node.js + Express

Database: SQLite (via better-sqlite3)

API: RESTful endpoints

🚀 How to Run Locally
Backend
cd backend
npm install
npm run dev


Backend runs on http://localhost:4000

Frontend

Open a new terminal:

cd frontend
npm install
npm run dev


Frontend runs on http://localhost:5173

🧾 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch product list
GET	/api/cart	Get cart + total
POST	/api/cart	Add to cart
DELETE	/api/cart/:id	Remove item
POST	/api/checkout	Mock checkout receipt
🛍️ Features

✅ Add / remove / update cart items
✅ See running total
✅ Mock checkout (name + email)
✅ SQLite database storage
✅ Responsive design (TailwindCSS)

🧩 Folder Structure
mock-ecom-cart/
 ├── backend/
 │   ├── server.js
 │   ├── routes/
 │   ├── db.js
 ├── frontend/
 │   ├── src/
 │   ├── index.css
 ├── README.md
