Lokar: Frontend Design Specification
This document provides the UI/UX blueprint for the Home and Cars pages of the Lokar platform, specifically designed for implementation with React and Tailwind CSS.

1. Global Layout & Components
   Navigation Bar
   Style: Transparent on Hero, solid Midnight Navy (#0A1633) on scroll.

Links: Home, Browse Cars, About, Contact.

Actions: "Login/Register" (Outline button) and "List Your Agency" (Red solid button).

Footer
Style: Dark Navy background.

Sections: Brand bio, Quick Links, Newsletter, and Social links.

2. Home Page Design (/)
   The Home page focuses on brand trust, the core search experience, and high-conversion "Featured" listings.

Hero Section
Visual: Large high-quality car image (e.g., Mercedes or Audi) with a split-color background (Navy/Red).

Headline: "Rent Your Dream Car from the Best Local Agencies."

Mini-Search Widget:

Horizontal bar with 3 inputs: Location/Agency, Date Range, and Car Type.

Action: "Search" button redirects to /cars with query params.

Agency/Category Showcase
Layout: Horizontal scrolling list or 6-column grid.

Items: Circular cards showing Agency logos or Car Category icons (SUV, Sport, Economy).

Featured Fleet
Content: A "Preview" of the top 6 highest-rated cars.

Card UI: High-quality image, Car Name, Price/Day, and the Agency Name badge.

CTA: A large button at the bottom: "View All Available Cars" (links to /cars).

3. Cars Archive Page (/cars)
   This page is built for utility, allowing users to drill down into the multi-agency inventory.

Layout
Sidebar (Left - 25%): Sticky filter panel.

Main Content (Right - 75%): Result count, sort dropdown, and a 3-column responsive grid of cars.

Filter Panel Components
Price Range: Dual-point slider (e.g., $50 - $1000+).

Agencies: Checkbox list of all active agencies on the platform.

Brands/Models: Searchable checkbox list (VW, BMW, etc.).

Transmission: Toggle for Manual/Automatic.

The "Lokar" Car Card (<CarCard />)
Image: Aspect-ratio 16/9, with a "badge" on the top left indicating "Verified Agency."

Body:

Title: {Brand} {Model} {Year}.

Agency Info: Small text: "Offered by [Agency Name]" with a link to the agency's profile.

Specs: 3 small icons (Fuel, Gearbox, Seats).

Footer:

Price: Bold text (e.g., "$85/day").

Action: "View Details" (Navy) or "WhatsApp Agency" (Green).

4. Design Constants (Tailwind Config)
   JavaScript

// For implementation in tailwind.config.js
theme: {
extend: {
colors: {
brandRed: '#C8102E',
brandNavy: '#0A1633',
brandGreen: '#00C853',
bgLight: '#F8F9FA'
},
fontFamily: {
heading: ['Orbitron', 'sans-serif'],
body: ['Inter', 'sans-serif']
}
}
}
