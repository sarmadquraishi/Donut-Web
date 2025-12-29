import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Show welcome message
        toast.success(`Welcome ${user.name}! 🍩`);
        
        // Redirect to home after 1 second
        setTimeout(() => {
          navigate('/home');
        }, 1000);
        
      } catch (error) {
        console.error('Error parsing user data:', error);
        toast.error('Login failed. Please try again.');
        navigate('/login');
      }
    } else {
      // No token found
      toast.error('Login failed. Please try again.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container className="text-center py-5" style={{ minHeight: '70vh' }}>
      <Spinner animation="border" variant="primary" />
      <h3 className="mt-4">Completing Login...</h3>
      <p className="text-muted">You will be redirected shortly</p>
    </Container>
  );
}

export default AuthSuccess;