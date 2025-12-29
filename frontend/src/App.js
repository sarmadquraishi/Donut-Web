import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AuthSuccess from './pages/AuthSuccess';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Check if user is already logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      console.log('User already logged in');
    } else {
      console.log('No user logged in - showing login page');
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        
        <main className="flex-grow-1">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/home" /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/auth-success" 
              element={<AuthSuccess />} 
            />
            <Route 
              path="/home" 
              element={
                isAuthenticated ? 
                <Home /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/shop/:category?" 
              element={
                isAuthenticated ? 
                <Shop /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/cart" 
              element={
                isAuthenticated ? 
                <Cart /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                isAuthenticated ? 
                <Checkout /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/" 
              element={
                <Navigate to={isAuthenticated ? "/home" : "/login"} />
              } 
            />
            {/* Catch all route */}
            <Route 
              path="*" 
              element={
                <Navigate to="/login" />
              } 
            />
          </Routes>
        </main>
        
        {isAuthenticated && <Footer />}
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;