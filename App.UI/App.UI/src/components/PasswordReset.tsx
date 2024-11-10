import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import HttpClient from '../clients/httpClient';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const httpClient = new HttpClient();

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await httpClient.post('auth/passwordReset', {
        username: email
      });

      setLoading(false);
      setSuccessMessage(response.data.message || 'Password reset email sent. Please check your inbox.');

      navigate('/login')
    } catch (err) {
      setLoading(false);
      setError('An error occurred! Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Password Reset</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleReset}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="w-100 mt-3">
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default React.memo(PasswordReset);
