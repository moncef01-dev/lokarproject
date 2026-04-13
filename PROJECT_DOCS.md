# Project Documentation: Platform Specs & Logic

This document provides a comprehensive overview of the Lokar architecture, product logic, and the localized rental ecosystem it supports.

## 🚀 Product Vision

Lokar is designed to catalyze the digital transformation of the car rental industry in Algeria. It addresses market fragmentation by providing a **centralized marketplace** that combines modern digital interactions with strict compliance to the Algerian legal and administrative framework.
This approach enables gradual digital transformation without disrupting existing agency workflows.

---

## 🏗️ System Architecture Logic

The platform manages a complex interaction between three primary user roles, ensuring a smooth flow from discovery to physical rental.

*   **Customers**: Explore the marketplace using refined search filters, initiate reservations via the 3-step booking flow, and receive digital confirmations.
*   **Agencies**: Manage their fleet in real-time, monitor incoming booking requests, and download/print automatically generated PDF contracts.
*   **Admins**: Oversee the ecosystem, verify new agency applications, monitor platform performance, and ensure system auditability.

---

## 🛠️ Technology Stack

Lokar utilizes a reliable and performant stack to ensure data integrity and a premium user experience:

- **Frontend**: **React** (built with Vite) for a fast, responsive SPA (Single Page Application). Styled with **Tailwind CSS** for a clean, modern aesthetic.
- **Backend**: **Node.js** & **Express.js** providing a modular RESTful API.
- **Database**: **MongoDB** with **Mongoose ODM**, optimized for flexible vehicle and booking schemas.
- **Authentication**: **JWT (JSON Web Tokens)** managed via secure, HttpOnly cookies for professional session handling.

---

## 🔄 3-Step Booking & Payment Flow

Formerly known as the "Payment Wizard," this system is the core conversion engine of the platform.

1.  **Rental Parameters**: Selection of pickup/return dates and locations.
2.  **Verified Identification**: Input of personal details, license information, and age verification (25+ requirement).
3.  **Payment Selection**: User chooses between a simulated online payment or the standard "Pay at Pickup" model.

> [!NOTE] 
> **SATIM Readiness**: While current payments are **simulated**, the architecture is fully prepared for **SATIM (CIB/Edahabia)** API integration, including secure processing states and validation UI.

---

## 📜 Contract Generation & Legal Workflow

One of Lokar's standout innovations is its automated PDF contract generation system.

### The Process:
1.  **Booking Submission**: User finishes the booking flow.
2.  **Auto-Generation**: The server instantly compiles a PDF contract using stored agency and customer data.
3.  **Secure Storage**: Contracts are linked to the booking ID and stored securely.
4.  **Physical Finalization**: The agency downloads and prints the contract. At pickup, the agreement is signed by both parties and officially stamped by the agency.

### Why it Matters:
-   **No Manual Work**: Agencies no longer need to type or hand-write contract details.
-   **Standardization**: Every agency agreement on the platform follows a professional, consistent format.
-   **Legal Compliance**: Aligns perfectly with the Algerian legal framework while modernizing the administrative step.

---

## 🤝 Hybrid Booking Model

Lokar operates on a hybrid model: **Online Booking + Offline Validation.**

In the Algerian market, trust and legal compliance are vital. By allowing customers to reserve and "pre-pay" online while requiring a physical signature and stamp at the agency, Lokar provides the best of both worlds: the convenience of a modern marketplace and the security of a traditional legal agreement.

---

## 🔒 Authentication & Session Security

- **Cookie-Based JWT**: Tokens are stored in HttpOnly cookies to prevent XSS attacks.
- **Secure Logout**: A robust backend-verified flow that terminates sessions on both the client and server.
- **Protected Routes**: Navigation guards ensure that only authorized roles (Agencies/Admins) can access sensitive management panels.

---

## 🎨 Design & UX Principles

- **Trust-Driven UX**: Professional branding and clear, step-based interactions to build user confidence.
- **Clean Aesthetic**: A focus on usability and fast data entry.
- **Responsive Layouts**: Fully accessible across desktop and mobile devices to accommodate all user types.
