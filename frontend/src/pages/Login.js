import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './../App.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [loading, setLoading] = useState(false);

  // Check for Google login success on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Notify parent component
        if (onLogin) onLogin(token);
        
        // Show welcome message
        toast.success(`Welcome ${user.name}! 🍩`);
        
        // Redirect to home
        navigate('/home');
        
      } catch (error) {
        console.error('Error processing Google login:', error);
        toast.error('Google login failed. Please try again.');
      }
    }
  }, [navigate, onLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      setTimeout(() => {
        const mockUser = {
          token: 'demo-token-' + Date.now(),
          user: {
            id: 1,
            name: loginData.email.split('@')[0],
            email: loginData.email
          }
        };
        
        onLogin(mockUser.token);
        localStorage.setItem('user', JSON.stringify(mockUser.user));
        toast.success('Welcome to Drunk Donuts! 🍩');
        navigate('/home');
      }, 1000);
      
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      setTimeout(() => {
        const mockUser = {
          token: 'demo-token-' + Date.now(),
          user: {
            id: Date.now(),
            name: registerData.name,
            email: registerData.email
          }
        };
        
        onLogin(mockUser.token);
        localStorage.setItem('user', JSON.stringify(mockUser.user));
        toast.success('Account created successfully! 🎉');
        navigate('/home');
      }, 1000);
      
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="login-page">
      {/* No header - just background image */}
      
      <Container className="login-container d-flex align-items-center justify-content-center">
        <Row className="w-100" style={{ maxWidth: '1000px' }}>
          <Col lg={6} className="d-none d-lg-flex align-items-center">
            {/* Branding Side with Logo */}
            <div className="login-branding text-center">
              <div className="login-branding-logo"></div>
              <h1 className="login-branding-title mb-3">
                DRUNK DONUTS
              </h1>
              <p className="login-branding-subtitle">
                Welcome to the sweetest experience!<br/>
                Sign in to explore our delicious collection.
              </p>
            </div>
          </Col>
          
          <Col lg={6}>
            <Card className="login-card shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="login-card-logo"></div>
                  <h2 className="fw-bold login-form-title">Welcome!</h2>
                  <p className="login-form-subtitle">Sign in to your account</p>
                </div>
                
                <Tabs defaultActiveKey="login" className="mb-4 login-tabs">
                  <Tab eventKey="login" title="Login" className="login-tab">
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          required
                          className="form-control-premium"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required
                          className="form-control-premium"
                        />
                      </Form.Group>

                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 mb-3 cta-btn"
                        disabled={loading}
                      >
                        {loading ? 'Logging in...' : 'Login'}
                      </Button>
                      
                      {/* Divider with "Or" text */}
                      <div className="divider text-center mb-3">
                        <span className="text-muted">Or continue with</span>
                      </div>
                      
                      {/* Google Login Button - MOVED BELOW LOGIN BUTTON */}
                      <Button
                        variant="outline-danger"
                        className="w-100 mb-3 google-btn"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <img 
                            src="https://www.google.com/favicon.ico" 
                            alt="Google" 
                            width="20" 
                            height="20"
                            className="me-3"
                          />
                          <span style={{ fontSize: '15px', fontWeight: '500' }}>Login with Google</span>
                        </div>
                      </Button>
                    </Form>
                  </Tab>
                  
                  <Tab eventKey="register" title="Register" className="register-tab">
                    <Form onSubmit={handleRegister}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                          required
                          className="form-control-premium"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          required
                          className="form-control-premium"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password (min 6 characters)"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          required
                          minLength={6}
                          className="form-control-premium"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                          required
                          className="form-control-premium"
                        />
                      </Form.Group>

                      <Button 
                        variant="success" 
                        type="submit" 
                        className="w-100 mb-3 cta-btn"
                        disabled={loading}
                      >
                        {loading ? 'Creating account...' : 'Register'}
                      </Button>
                      
                      {/* Divider for Register tab too */}
                      <div className="divider text-center mb-3">
                        <span className="text-muted">Or sign up with</span>
                      </div>
                      
                      {/* Google Login Button in Register tab */}
                      <Button
                        variant="outline-danger"
                        className="w-100 google-btn"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <img 
                            src="https://www.google.com/favicon.ico" 
                            alt="Google" 
                            width="20" 
                            height="20"
                            className="me-3"
                          />
                          <span style={{ fontSize: '15px', fontWeight: '500' }}>Sign up with Google</span>
                        </div>
                      </Button>
                    </Form>
                  </Tab>
                </Tabs>
                
                <div className="login-terms mt-4">
                  <small className="text-muted">
                    By signing in, you agree to our Terms & Conditions
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;