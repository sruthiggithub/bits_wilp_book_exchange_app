import { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import HttpClient from '../clients/httpClient';
import React from 'react';

const httpClient = new HttpClient();

const UserProfile = () => {
  const [profile, setProfile] = useState({
    phoneNumber: '',
    name: '',
    favoriteGenres: '',
    booksWishList: ''
  });
  const navigate = useNavigate();
 
  useEffect(() => {
    // Fetch user profile data
    httpClient.get('auth/user')
      .then(response => setProfile({ 
        phoneNumber: response.data?.phoneNumber,
        name: response.data?.name,
        favoriteGenres: response.data?.favoriteGenres,
        booksWishList: response.data?.booksWishList           
    }))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile data
    httpClient.put('auth/manageProfile', profile)
      .then(response => {
        console.log('Profile updated:', response.data)
        alert('Profile updated successfully') 
        navigate('/home')
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <Container className="mt-4">
      <h1>User Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formFavoriteGenres">
              <Form.Label>Favorite Genres</Form.Label>
              <Form.Control
                type="text"
                name="favoriteGenres"
                value={profile.favoriteGenres}
                onChange={handleChange}
                placeholder="Enter your favorite genres"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
        <Col md={6}>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </Form.Group>
          </Col> 
          <Col md={6}>
            <Form.Group controlId="formbooksWishList">
              <Form.Label>Books Wishes</Form.Label>
              <Form.Control
                type="text"
                name="booksWishList"
                value={profile.booksWishList}
                onChange={handleChange}
                placeholder="Enter books you wish to acquire"
              />
            </Form.Group>
          </Col>
        </Row>       
        <Button variant="primary" type="submit" className="mt-3">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default memo(UserProfile);