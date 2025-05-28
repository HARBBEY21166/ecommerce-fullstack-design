# Full-Stack E-commerce Application

This is a full-stack e-commerce application built with modern web technologies. It provides a platform for users to browse products, add them to their cart, manage wishlists, place orders, and for administrators to manage products and view analytics.

## Features

*   **User Authentication:** Secure user registration and login.
*   **Product Catalog:** Browse products by category, view product details, and search for products.
*   **Shopping Cart:** Add products to the cart, update quantities, and remove items.
*   **Wishlist:** Save products to a wishlist for later.
*   **Checkout:** Process orders with a secure checkout flow.
*   **User Profile:** Manage user information and view past orders.
*   **Admin Dashboard:** (For administrators)
    *   Manage products (add, edit, delete).
    *   View orders.
    *   Access analytics and reports.
*   **Responsive Design:** Optimized for various screen sizes.

## Technologies Used

**Frontend:**

*   React
*   Next.js
*   TypeScript
*   Tailwind CSS
*   Shadcn/ui (for UI components)

**Backend:**

*   Firebase (Authentication, Firestore Database, Storage)

**Other:**

*   Zustand (for state management)
*   Zod (for validation)
*   Various utility libraries (e.g., `clsx`, `date-fns`)

## Setup Instructions

To set up and run this project locally, follow these steps:

1.  **Clone the repository:**
    
```bash
git clone <repository-url>
    cd <project-directory>
```

2.  **Install dependencies:**
    
```bash
pnpm install
```
    or
    
```bash
npm install
```
    or
    
```bash
yarn install
```

3.  **Set up Firebase:**
    *   Create a Firebase project in the Firebase Console.
    *   Enable Firebase Authentication (Email/Password provider).
    *   Set up a Firestore database. Choose a location and start in production mode (you can adjust security rules later).
    *   Enable Firebase Storage.
    *   Copy your Firebase project configuration.

4.  **Configure environment variables:**
    *   Create a `.env.local` file in the root of the project.
    *   Add your Firebase configuration to this file:
        
```
env
        NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```
    *   If you have a different setup (e.g., using environment variables for the seed script), add those as well.

5.  **Run the development server:**
    
```bash
pnpm dev
```
    or
    
```bash
npm run dev
```
    or
    
```bash
yarn dev
```

6.  **Access the application:** Open your browser and go to `http://localhost:3000`.

## Seeding the Database (Optional)

To populate your Firestore database with sample data, you can use the seeding script:

1.  Ensure your Firebase project is set up and environment variables are configured.
2.  Run the seed script:
    
```bash
pnpm tsx scripts/seed-database.tsx
```
    or
    
```bash
npx tsx scripts/seed-database.tsx
```

    *Note: You might need to adjust the script if you have different data structures or requirements.*

## Contributing

We welcome contributions to this project! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and ensure the code follows the project's style guidelines.
4.  Write tests for your changes (if applicable).
5.  Commit your changes with a clear and descriptive message.
6.  Push your branch to your fork.
7.  Create a pull request to the main repository.

Please ensure your pull request includes:

*   A clear description of the changes.
*   Any relevant screenshots or demos.
*   References to any issues it resolves.

We will review your pull request and provide feedback. Thank you for your contribution!
