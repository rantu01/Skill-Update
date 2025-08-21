
# MyShop - Next.js E-Commerce Dashboard



A simple e-commerce web application built with **Next.js 15** using the **App Router**, **NextAuth.js** for authentication, and **MongoDB** as the database. The application features public product pages and a protected dashboard for product management.

---

## 🚀 Features

### Public Pages
- Landing page with **Navbar**, **Hero section**, **Product Highlights**, and **Footer**.
- Product list page (`/products`) displaying all products.
- Product details page (`/products/[id]`) for viewing full product information.
- No authentication required to browse products.

### Authentication
- **Login** via **NextAuth.js** (Google OAuth or credentials).
- Redirects users to `/dashboard` after successful login.
- Protected routes only accessible by authenticated users.

### Dashboard (Protected)
- Add new products (`/dashboard/add-product`) with name, description, and price.
- Update and delete existing products (`/dashboard/manage-products`).
- Sidebar navigation for dashboard sections.
- Responsive design with mobile-friendly sidebar toggle.

### Optional Enhancements
- Loading spinners during API calls.
- Toast messages on successful product add/update/delete.
- Light/Dark theme toggle (can be added to Navbar).

---

## 🛠 Technologies Used
- **Next.js 15 (App Router)**
- **NextAuth.js** (Authentication)
- **MongoDB** (Database)
- **React & Tailwind CSS** (Frontend)
- **Lucide Icons** (Dashboard icons)
- **Vercel** (Deployment)

---

## 📁 Folder Structure

```

app/
├─ (site)/
│  ├─ layout.js          # Main layout with Navbar & Footer
│  ├─ page.js            # Landing page
│  ├─ products/
│  │  ├─ page.js         # Product list
│  │  └─ \[id]/page.js    # Product details
│
├─ (dashboard)/
│  ├─ layout.js          # Dashboard layout with sidebar
│  ├─ add-product/page.js
│  └─ manage-products/page.js
│
├─ api/
│  └─ products/
│     ├─ add/route.js
│     └─ \[id]/route.js   # GET, PATCH, DELETE
│
components/
├─ Navbar.js
├─ Footer.js
├─ AddProductForm.js
├─ ProductUpdateForm.js
└─ AuthProvider.js

lib/
└─ mongodb.js            # MongoDB connection

````

---

## ⚙ Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/rantu01/Skill-Update.git
cd myshop
````

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**

Create a `.env.local` file:

```
MONGODB_URI=<Your MongoDB connection string>
NEXTAUTH_SECRET=<Random secret string>
GOOGLE_CLIENT_ID=<Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Google OAuth Client Secret>
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
```

5. **Access the app**
   Open [http://localhost:3000](http://localhost:3000)

---

## 🔗 Routes Summary

| Route                        | Description            | Authentication |
| ---------------------------- | ---------------------- | -------------- |
| `/`                          | Landing page           | Public         |
| `/products`                  | Product list           | Public         |
| `/products/[id]`             | Product details        | Public         |
| `/login`                     | Login page             | Public         |
| `/dashboard/add-product`     | Add new product        | Protected      |
| `/dashboard/manage-products` | Update/Delete products | Protected      |

---

## 📌 Notes

* Only authenticated users can access dashboard routes. Unauthenticated users are redirected to login.
* Error and 404 pages are **standalone layouts**, Navbar and Footer are hidden on these pages.
* MongoDB is used as a backend database. You can switch to a different database by updating the API routes.

---

## 🌐 Live Demo

[Live Site on Vercel](https://first-next-app-q8cw.vercel.app)

---

## 📄 License

MIT License © \[Rantu Mondal]

