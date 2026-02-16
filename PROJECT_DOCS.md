# Lokar - Car Rental System Documentation

## Project Overview
Lokar is a full-stack car rental management system designed to facilitate the rental process between agencies and customers. It features a modern, responsive frontend and a robust backend API.

## Technology Stack

### Frontend
- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using Mongoose ODM)
- **Language**: TypeScript
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
lokar/
├── backend/          # Server-side application
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── modules/  # Feature modules (controllers, services, routes)
│   │   ├── dal/      # Data Access Layer
│   │   └── types/    # TypeScript type definitions
│   └── ...
├── frontend/         # Client-side application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   └── ...
│   └── ...
└── docs/             # Additional project documentation
    └── how-to-use.md # Detailed usage guide
```

## Prerequisites
Before running the project, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local instance or cloud via MongoDB Atlas)

## Configuration

### Backend Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=3000                 # Server port
DB_URL=mongodb://...      # MongoDB connection string
JWT_PRIVATE_KEY=secret    # Secret key for JWT signing
NODE_ENV=development      # Environment (development/production)
```

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/samadou-101/lokar.git
cd lokar
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server.

```bash
cd backend
npm install
# Ensure you have created the .env file as described above
npm run dev
```
The backend server will typically run on `http://localhost:3000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the client.

```bash
cd frontend
npm install
npm run dev
```
The frontend application will typically run on `http://localhost:5173`.

## Usage
For a detailed guide on system roles (Superadmin, Agency) and workflows, please refer to [docs/how-to-use.md](./docs/how-to-use.md).

### Key Features
- **User Roles**: 
  - **Superadmin**: Manages agencies and platform settings.
  - **Agency**: Manages their car fleet and listings.
  - **User**: Browses and rents cars.
- **Car Listings**: Agencies can add cars with external image URLs for lightweight handling.
- **Search & Filter**: comprehensive search functionality on the frontend.

## Design
The frontend design specifications, including color palette and layout details, can be found in [frontend/design.md](./frontend/design.md).
