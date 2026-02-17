# Lokar - Car Rental System Documentation

## Project Overview
Lokar is a full-stack car rental management system designed to facilitate the rental process between agencies and customers. It features a modern, responsive frontend and a robust backend API designed for scale and maintainability.

## Technology Stack

### Frontend
- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Charts**: [Recharts](https://recharts.org/) for data visualization.
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using Mongoose ODM)
- **Language**: TypeScript
- **Authentication**: JWT (JSON Web Tokens)
- **PDF Generation**: Component-based contract generation.

## Project Structure

```
lokar/
├── backend/          # Server-side application
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── modules/  # Modular feature logic (controllers, services, routes)
│   │   │   ├── admin_panel/
│   │   │   ├── agency/
│   │   │   ├── auth/
│   │   │   ├── booking/
│   │   │   ├── contract/
│   │   │   ├── prebooking/
│   │   │   ├── user/
│   │   │   └── vehicle/
│   │   ├── dal/      # Data Access Layer (Mongoose models and DALs)
│   │   └── types/    # TypeScript type definitions
│   └── ...
├── frontend/         # Client-side application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   │   ├── admin/      # Admin/Agency specific components
│   │   │   ├── analytics/  # Recharts implementation
│   │   │   └── ui/         # Base UI components (shadcn-like)
│   │   ├── services/   # API communication Layer
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

## Key Features

### Analytics Dashboard
The Agency Dashboard now includes a dedicated Analytics tab providing:
- **Revenue Overview**: Monthly and total earnings tracking.
- **Vehicle Performance**: Metrics on which cars are rented the most.
- **Booking Trends**: Visualization of peak rental periods.

### Automated Contract Generation
Agencies can now generate professional PDF rental contracts directly from the booking interface:
- **Automatic Data Mapping**: Fills customer and vehicle details automatically.
- **Customizable Fields**: Overrides for specific contract terms.
- **Instant Download**: Direct PDF generation and download for easy printing.

### Prebooking Workflow
A new multi-step booking process:
1. **Request**: Customers submit a prebooking request with their details.
2. **Review**: Agencies receive notifications and review the request.
3. **Draft**: Agency can generate a draft contract for the prebooking.
4. **Confirm**: Finalize the rental and update vehicle availability.

## Design
The frontend design specifications, including color palette and layout details, can be found in [frontend/design.md](./frontend/design.md).
