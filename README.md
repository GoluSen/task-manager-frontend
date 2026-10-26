# Task Manager Frontend

React frontend for a task management app. Users can log in and manage their own tasks (create, view, update, delete). Works with the [Task Manager API](https://github.com/GoluSen/task-manager-api).

**Live Demo:** https://task-manager-frontend-hazel-iota.vercel.app/

> The backend runs on a free hosting plan. The first request after inactivity can take up to a minute. Please wait and try again.

## Demo Login

- Email: `demo@taskmanager.com`
- Password: `Demo@12345`

## Features

- JWT-based login
- Protected routes (tasks page needs login)
- Per-user task CRUD
- Connected to a self-built REST API

## Tech Stack

React.js, Vite, React Router, Axios

## Run Locally

1. Clone the repo
   ```bash
   git clone https://github.com/GoluSen/task-manager-frontend.git
   cd task-manager-frontend
   ```
2. Install packages
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and add the backend URL
   ```
   VITE_API_URL=http://localhost:8000
   ```
4. Start the app
   ```bash
   npm run dev
   ```

The backend must be running for login and tasks to work. See the API repo for setup: https://github.com/GoluSen/task-manager-api

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Author

Golu Sen
