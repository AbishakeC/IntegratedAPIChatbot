# Integrated Chatbot - Full Stack Application

This project is a full-stack AI-integrated chatbot application featuring a **Node.js/Express Backend** and a **React/Vite Frontend**.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud URI)

## Project Structure
- **BackendNew/**: Contains the server configuration, API models, controllers, and routes.
- **Frontend/**: Contains the React user interface.

---

## Installation Guide

### 1. Backend Setup

Navigate to the `BackendNew` directory and install dependencies:

```bash
cd BackendNew
npm install
```

#### Configuration
Ensure you have a `.env` file in `BackendNew` with the following keys (example):

```env
PORT = 5200
MongoDb_URI = mongodb://localhost:27017/YourDBName
JWT_secret_key = your_super_secret_key
GEMINI_API_KEY = your_google_gemini_api_key
```

### 2. Frontend Setup

Navigate to the `Frontend` directory and install dependencies:

```bash
cd ../Frontend
npm install
```

---

## How to Run

You need to run both the Backend and Frontend servers simultaneously. You can use two separate terminal windows.

**Terminal 1 (Backend):**
```bash
cd BackendNew
npm start
```
*Expected Output:* `the app is running on server : 5200` / `Connected to DB`

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm run dev
```
*Expected Output:* `VITE vX.X.X  ready in X ms` -> `Local: http://localhost:5173/` (or 5174)

---

## Usage Instructions

1.  **Access the App**: Open your browser and go to the local URL provided by the Frontend (e.g., `http://localhost:5173`).
2.  **Register**:
    - Navigate to the Registration page (click "Login/Signup" in sidebar or go to `/au`).
    - Enter your Name, Email, and Password.
    - Click **Register**. (You will be redirected to Login).
3.  **Login**:
    - Navigate to `/login`.
    - Enter your credentials.
    - Click **Login**.
4.  **Chat**:
    - Once logged in, you will be on the main Chat interface.
    - Click **+ New Chat** in the sidebar to start a session.
    - Type a message in the input box and press Enter.
    - The AI provider (Gemini) will reply to your queries.
