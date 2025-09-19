# Mini E-Commerce Store

This project is a **Mini E-Commerce Store** built with **Next.js (App Router)**, **TypeScript**, **Redux Toolkit**, **TailwindCSS**.  
It demonstrates authentication, routing, state management, sidebar navigation, and cart functionality as per the assignment requirements.

---

## 🌐 Live Demo
👉 [View Live Project](https://ecom-ur-shop.vercel.app/)

---

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/prajwalsiwa/ecom-ur-shop.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.


---

## 📂 Project Structure

```
📦 project-root
├── 📂 app              # Next.js App Router pages, layouts, routes
│   ├── cart/           # Shopping cart page (protected)
│   ├── checkout/       # Checkout page (protected)
│   ├── login/          # OAuth login page
│   ├── products/       # Product listing & product details
│   ├── profile/        # User profile page (protected)
│   └── page.tsx        # Home page (Product List)
│
├── 📂 components       # Reusable UI components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Pagination.tsx
│   ├── ProductGridSkeleton.tsx
│   └── ProductCard.tsx
│
├── 📂 lib              # Utilities/helpers
│   └── fetcher.ts
│
├── 📂 services         # API calls / business logic
│   └── api.ts
│
├── 📂 store            # Redux slices & global state
│   ├── cartSlice.ts
│   └── index.ts
│
├── 📂 types            # TypeScript types & interfaces
│   └── product.ts
│
├── README.md
└── package.json
```

---

## 🔄 Project Flow

- **Authentication (NextAuth.js)**  
  - Users can log in via **Google/GitHub**.  
  - Only logged-in users can access **Cart, Checkout, and Profile**.  
  - If not logged in → redirect to `/login`.  
  - **Sidebar dynamically updates**: "Cart", "Checkout", and "Profile" are only visible after login.

- **Homepage (Products List)**  
  - Fetches product data from **fakestoreapi.com** (or mock JSON).  
  - Displays products in a responsive grid with name, price, and image.  
  - Implements **loading skeletons** and **error states**.  
  - Pagination and search bar included (bonus).  
  - Clicking a product navigates to **Product Detail Page**.

- **Product Detail Page (/products/[id])**  
  - Displays product title, description, price.  
  - **Add to Cart** button with success/error toast notifications.

- **Cart Page**  
  - Powered by **Redux Toolkit** (persisted in `localStorage`).  
  - Features: Add, Remove, Update quantity.  
  - Displays **total items and total price**.  

- **Checkout Page (Protected)**  
  - Shows **order summary** (cart items & total).  
  - Simulates order placement with confirmation message.  

- **Sidebar Navigation**  
  - Links: **Home, Cart, Checkout, Profile**.  
  - Active link is highlighted.  
  - Collapsible into a hamburger menu on smaller screens.  
  - **Cart/Checkout/Profile appear only when logged in.**

---

## 🛠 Tech Stack

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit + Persist](https://redux-toolkit.js.org/)
- [NextAuth.js](https://next-auth.js.org/) for OAuth (Google/GitHub)
- [TailwindCSS](https://tailwindcss.com/)

---

## ✅ Features Implemented

- ✅ OAuth authentication with **Google/GitHub**  
- ✅ Protected routes for **Cart, Checkout, Profile**  
- ✅ Product list & detail pages with **skeleton loaders** and **error handling**  
- ✅ Cart with **add, remove, update, persist**  
- ✅ Checkout with order summary + confirmation  
- ✅ Sidebar navigation with **dynamic links** (only visible when logged in)  
- ✅ Responsive design (mobile → desktop)  
- ✅ Toast notifications for cart actions  


✨ This project fulfills all requirements of the **Yatri Design Studio Frontend Assignment**.
