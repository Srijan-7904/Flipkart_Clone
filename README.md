# Flipkart Clone - Full Stack E-Commerce Platform

A fully functional, full-stack E-Commerce application inspired by Flipkart. This project features a modern UI, real-time product listing, shopping cart functionality, secure checkout with Razorpay, and Google Authentication via Firebase.

## 🚀 Features

- **Modern & Responsive UI**: Built with React and Material-UI for a pixel-perfect, Flipkart-like design.
- **User Authentication**: Secure login and signup functionality using Firebase (Google Sign-In supported).
- **Product Catalog**: Dynamic product listing with rich detail pages including image galleries and offer accordions.
- **Shopping Cart**: Add, remove, and manage cart items with real-time price calculation and Redux state management.
- **Secure Checkout**: Integrated with Razorpay for seamless and secure payment processing.
- **RESTful API**: Robust backend built with Node.js, Express, and MongoDB to manage users, products, and orders.

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Material-UI (MUI)
- Redux (State Management)
- React Router DOM
- Firebase (Authentication)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Razorpay (Payment Gateway)

## 📁 Project Structure

```
ECommerce-Website/
├── client/          # React Frontend
│   ├── public/      # Static assets and index.html
│   └── src/         # React components, context, redux store, and API services
└── server/          # Node.js/Express Backend
    ├── controller/  # API endpoint logic
    ├── database/    # MongoDB connection setup
    ├── model/       # Mongoose database schemas
    └── routes/      # Express API routes
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas connection string
- Razorpay account (for payment keys)
- Firebase account (for authentication config)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ECommerce-Website
```

### 2. Backend Setup
```bash
cd server
npm install
```
- Create a `.env` file in the `server` directory and add your environment variables:
  ```env
  PORT=8000
  DB_USERNAME=your_mongodb_username
  DB_PASSWORD=your_mongodb_password
  RAZORPAY_KEY_ID=your_razorpay_key
  RAZORPAY_KEY_SECRET=your_razorpay_secret
  ```
- Start the server:
  ```bash
  npm start
  ```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
- Configure Firebase in your frontend code with your specific Firebase Project Config.
- Start the React app:
  ```bash
  npm start
  ```

## 💳 Payment Integration
This project uses **Razorpay** in test mode to simulate the checkout experience. To use it, simply provide your API keys in the backend `.env` file.

## 🔐 Authentication
User authentication is managed via Firebase, offering robust security and easy Google Account sign-ins out of the box.

## 📝 License
This project is open-source and available under the MIT License.
