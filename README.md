
Drunk Donuts is a full-stack e-commerce website with a frontend built using React.js and a backend powered by Node.js with Express. This project demonstrates a comprehensive implementation of a modern donut shop platform, including user authentication, product management, shopping cart functionality, and order processing.

Features:
Frontend: Developed using React.js with React Bootstrap for styling.

Backend: Node.js with Express.js framework.

Database: MongoDB for storing user data, cart items, and order details.

Authentication: JWT-based authentication with Google OAuth 2.0 integration.

State Management: Cart state and cart counter managed using React state and localStorage.

Payment Processing: Demo payment system with multiple payment methods.

Social Sign-In: Google sign-in integrated using Passport.js.

Responsive Design: Fully responsive UI that works on all devices.

Toast Notifications: User feedback system with toast notifications.

Environment Variables
Backend (.env)
Create a .env file in the backend directory with the following variables:
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL='http://localhost:5000/api/auth/google/callback'
FRONTEND_URL='http://localhost:3000'

Tech Stack
Frontend
React.js - UI library

React Bootstrap - Component library

React Router DOM - Client-side routing

Axios - HTTP client for API calls

React Toastify - Notification system

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB + Mongoose - Database and ODM

Passport.js - Authentication middleware

JSON Web Tokens - Secure token-based auth

CORS - Cross-origin resource sharing
