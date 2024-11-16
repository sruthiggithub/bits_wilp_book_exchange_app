// src/components/PasswordReset.jsx
import { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap'; // Import Bootstrap components
import HttpClient from '../clients/httpClient';
import { useNavigate } from 'react-router-dom';

const httpClient = new HttpClient();

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Validate the passwords
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
   
    try {
        const response = await httpClient.post('auth/resetPassword', {
            username: email
          });
    
          setLoading(false);

          setMessage(response.data.message || 'Password reset email sent. Please check your inbox.');
    
          navigate('/login')
    } catch {
      setLoading(false);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>New Password</h2>
      {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}
      
      <Form onSubmit={handlePasswordReset} className="mt-4">
      <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading} onClick={handlePasswordReset} className="mt-3">
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </Form>
    </Container>
  );
};

export default PasswordReset;
