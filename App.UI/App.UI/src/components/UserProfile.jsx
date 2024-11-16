import { useState, useEffect, memo } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    readingPreferences: '',
    favoriteGenres: '',
    booksOwned: '',
    booksWished: ''
  });

  useEffect(() => {
    // Fetch user profile data
    axios.get('/api/user')
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile data
    axios.put('manageProfile', profile)
      .then(response => console.log('Profile updated:', response.data))
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
            <Form.Group controlId="formReadingPreferences">
              <Form.Label>Reading Preferences</Form.Label>
              <Form.Control
                type="text"
                name="readingPreferences"
                value={profile.readingPreferences}
                onChange={handleChange}
                placeholder="Enter your reading preferences"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBooksWished">
              <Form.Label>Books Wished</Form.Label>
              <Form.Control
                type="text"
                name="booksWished"
                value={profile.booksWished}
                onChange={handleChange}
                placeholder="Enter books you wish to acquire"
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
                name="phone"
                value={profile.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
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