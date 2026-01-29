# How to Use the Lokar System

This document explains the core workflow and features of the Lokar car rental management system.

## 1. System Roles & Access Control

The system follows a hierarchical structure for managing car rentals and agencies.

### Superadmin Workflow

The Superadmin has the highest level of authority and manages the platform's ecosystem.

- **Adding Agencies**: From the Admin Panel, the Superadmin can promote existing registered users to Agency status.
- **Process**:
  1. The user must first create a regular account.
  2. The Superadmin enters the user's **email address** and assigns an **Agency Name**.
  3. Once converted, the user gains access to the Agency features.

### Agency Dashboard

Once a user is designated as an agency, they get access to a dedicated dashboard.

- **Management**: Agencies can manage their fleet and view analytics related to their listings.
- **Adding Cars**: Agencies can list new vehicles available for rent through their dashboard.

## 2. Managing Car Listings

The system is designed to be lightweight by using external image references rather than hosting images locally.

### Car Images

To optimize storage and simplify the process of adding cars:

- **No Local Storage**: We do not store image files on our servers.
- **Process for Adding Images**:
  1. Perform a **Google Search** for the desired car model.
  2. Find a high-quality image and **Copy the Image URL**.
  3. Enter this URL into the car's image field when creating or editing a listing.
- **Benefit**: This keeps the system fast and eliminates the need for complex cloud storage configurations (like AWS S3 or Cloudinary) for vehicle assets.

## 3. General Workflow Summary

1. **User Registration**: A user signs up on the platform.
2. **Agency Creation**: Superadmin upgrades the user to an agency via the Admin Panel.
3. **Fleet Management**: The new agency logs in, accesses their dashboard, and adds cars using external image URLs.
4. **Public Browsing**: Users can browse cars from all registered agencies on the main platform.
