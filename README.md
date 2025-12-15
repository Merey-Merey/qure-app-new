# Qure — More Than a Pharmacy 💚

**Qure** is a modern frontend web application for ordering medicines and managing a healthy lifestyle.
The project was built as a **Final Exam Project** for the *Full‑Stack Web Technologies* course (Frontend track).

The application demonstrates real-world frontend architecture, API integration, authentication, role-based access, and admin management.

---

## 🔗 Live Demo

👉 **Production (Vercel):**
[https://qure-app-main.vercel.app](https://qure-app.vercel.app)

👉 **GitHub Repository:**
[https://github.com/Merey-Merey/qure-app-new](https://github.com/Merey-Merey/qure-app-new)

---

## 🎯 Project Goal

The goal of Qure is to create a calm, friendly, and trustworthy digital pharmacy experience where users can:

* Browse medicines (RX & OTC)
* Manage personal profiles
* Place orders and track them
* Access a role-based admin panel
* Interact with real dynamic data via API

This project focuses on **UX clarity, accessibility, and real CRUD logic**.

---

## 🧑‍💻 Tech Stack

### Frontend

* **React + TypeScript**
* **Vite**
* **React Router**
* **Zustand** 
* **Axios** 
* **Tailwind CSS**
* **React DatePicker**

### API

* Mock API (MockAPI / JSON-based REST)
* Real CRUD operations (Create, Read, Update, Delete)
* Token-based authentication

### Deployment

* **Vercel**

---

## 👥 User Roles

### 👤 User

* Login & authentication
* Browse products
* View categories and subcategories
* View product details
* Manage personal profile

### 🛠 Admin

* Admin-only protected routes
* View product list
* Create / Edit / Delete products
* Manage core entities

Access control is enforced via **token-based authentication** and **protected routes**.

---

## 🧭 Application Routes

### Public Routes (User)

| Route                        | Description             |
| ---------------------------- | ----------------------- |
| `/`                          | Splash screen           |
| `/onboarding`                | Onboarding screens      |
| `/welcome`                   | Welcome screen          |
| `/login`                     | User & Admin login      |
| `/register`                  | User registration       |
| `/register/success`          | Account created screen  |
| `/main-page`                 | Main application page   |
| `/categories`                | Categories list         |
| `/categories/:slug`          | Subcategories page      |
| `/categories/:slug/:subSlug` | Products by subcategory |
| `/product/:id`               | Product details         |
| `/search`                    | Product search          |
| `/favorites`                 | Favorite products       |
| `/cart`                      | Shopping cart           |
| `/checkout`                  | Checkout process        |
| `/order-success`             | Order success page      |
| `/profile`                   | User profile            |
| `/profile/personal`          | Personal data settings  |

---

### 🔐 Protected Admin Routes

| Route                 | Description              |
| --------------------- | ------------------------ |
| `/admin`              | Admin dashboard          |
| `/admin/products`     | Admin product management |
| `/admin/products/new` | Add new product          |
| `/admin/orders`       | Orders management        |

---

## ⚙️ Core Features

* ✅ Authentication (login + token storage)
* ✅ Protected user & admin routes
* ✅ CRUD operations via API
* ✅ Dynamic data (no hardcoded content)
* ✅ Loading, error, and empty states
* ✅ Search and filtering
* ✅ Responsive UI
* ✅ Clean component architecture
* ✅ Notifications (success / error)

---

## 📁 Project Structure (Simplified)

```
src/
 ├── pages/
 │   ├── LoginPage.tsx
 │   ├── Dashboard.tsx
 │   ├── AdminPage.tsx
 │   └── ProductPage.tsx
 ├── components/
 ├── store/
 ├── services/
 ├── styles/
 └── main.tsx
public/
 └── assets/images/
```

---

## 🔐 Authentication & Security

* Token stored in `localStorage`
* Role-based route protection
* Admin-only access to management pages
* Logout clears session data

---

## 🚀 Installation & Setup

```bash
# Clone repository
git clone https://github.com/Merey-Merey/qure-app-new.git

# Install dependencies
npm install

# Run locally
npm run dev
```

---

## 📦 Deployment

The project is deployed using **Vercel**.

Every push to the `main` branch triggers an automatic deployment.

---

## 📝 Exam Compliance Checklist

✔ Framework used (React)
✔ Routing (5+ pages)
✔ State management
✔ API integration (CRUD)
✔ Authentication + protected routes
✔ User & Admin roles
✔ Responsive UI
✔ GitHub repository
✔ Clean commit history
✔ Deployed live project

---

## 🏁 Final Notes

Qure is designed as a **real product MVP**, not a demo or landing page.
The architecture allows easy scaling to a full backend and mobile app in the future.

---

**Author:** Мерей
**Course:** Web Technologies
**Track:** Frontend
**Year:** 2025
