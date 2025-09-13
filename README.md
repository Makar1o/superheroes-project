# Superheroes App

A full-stack application to manage superheroes, including their details and images. Built with **Next.js** (frontend) and **Express + TypeScript** (backend).

---

## Features

- List superheroes with pagination
- View detailed information about each superhero
- Add new superheroes
- Edit existing superheroes
- Delete superheroes
- Upload and delete superhero images
- Responsive design with modern card layout

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Express, TypeScript, LowDB (JSON file-based database)
- **File Uploads**: Multer
- **Unique IDs**: nanoid
- **API**: REST endpoints

---

## Getting Started

### Backend

1. Go to the backend folder:

Install dependencies:
npm install

Run the server in development mode:

npm run dev
The backend server will start at: http://localhost:5000

### Frontend

Go to the frontend folder:

cd frontend

Install dependencies:
npm install

Run the development server:

npm run dev
The frontend will run at: http://localhost:3000

### Assumptions:

- Hero images are stored locally in the uploads/ folder.

- API base URL is http://localhost:5000.

- Frontend expects the first image (images[0]) as a card thumbnail.

- LowDB is used as a lightweight JSON-based database for simplicity.

- No authentication is implemented; all operations are open.

- UI is responsive and styled with Tailwind CSS.
