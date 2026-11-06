# FoodHub React Cart & Login Upgrade

This folder contains React versions of the FoodHub Cart and Login pages. The original HTML/CSS/JavaScript pages are preserved in the parent FoodHub folder.

## Requirements
- Node.js (LTS)
- npm

## Run locally
1. Open a terminal inside `react-app`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL printed by Vite.
5. Use `#/cart` for the React Cart and `#/login` for the React Login.

## Existing FoodHub data compatibility
- Cart reads and writes the existing `localStorage` key: `cart`.
- Login reads registered accounts from `foodhubUsers`.
- Successful login saves the same `currentUser` structure used by the existing FoodHub pages.
- The existing menu page can continue adding items to the same cart when the app is served from the same site origin.

## Demo admin login
- Username: `admin`
- Password: `admin123`

This is a front-end demonstration. For a real production website, authentication must be handled securely by a backend; passwords should not be stored as plain text in localStorage.
