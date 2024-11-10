// src/components/Login.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HttpClient from '../clients/httpClient';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const httpClient = new HttpClient();

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await httpClient.post('auth/login',{
        username: email,
        password
      });

      setLoading(false);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token
        navigate('/home'); // Redirect to homepage after successful login
      }
    } catch (err) {
      setLoading(false);
      setError('Login failed! Invalid email or password.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-50">
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <div style={{ marginTop: '10px' }}>
            <Link to="/passwordreset">Forgot Password?</Link>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
