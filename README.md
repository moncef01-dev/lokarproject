# Lokar - Car Rental Management Platform

A high-performance, full-stack car rental management system designed for agencies and customers. Built with a modern React frontend and a robust Express/Node.js backend.

## 🚀 Key Features

- **Agency Dashboard**: Advanced management tools for fleet and bookings.
- **Analytics Dashboard**: Real-time visualization of revenue, vehicle performance, and booking trends using Recharts.
- **Contract Generation**: Automated PDF rental agreement generation with customizable fields.
- **Prebooking System**: Streamlined workflow for customers to request vehicles and agencies to manage reservations.
- **Fleet Management**: Easily list and manage vehicles with external image support for optimized performance.
- **Role-Based Access**: Specialized interfaces for Superadmins, Agency Owners, and Customers.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: MongoDB with Mongoose ODM.
- **Authentication**: JWT (JSON Web Tokens).

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **npm** or **yarn**
- **MongoDB**: Local instance or MongoDB Atlas cloud instance

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/moncef01-dev/lokarproject.git
cd lokar
```

### 2. Backend Setup

```bash
cd backend
npm install
# Create .env file based on PROJECT_DOCS.md instructions
npm run dev
```

The backend server will start on `http://localhost:3000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend application will start on `http://localhost:5173`.

## 📖 Documentation

For detailed guides, check out:
- [PROJECT_DOCS.md](./PROJECT_DOCS.md): Architecture and Configuration details.
- [docs/how-to-use.md](./docs/how-to-use.md): Comprehensive system workflow and user roles.
