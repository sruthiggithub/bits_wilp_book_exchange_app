# Book Exchange App - API

This is the backend server application for the Book Exchange App, built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/book-exchange-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd book-exchange-app/App.Api
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    In a `.env` file in the root directory and add the following:
    ```env
    PORT=4000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_token_secret
    ```

## Usage

1. Start the server:
    ```bash
    node server.js
    ```
2. The server will be running on `http://localhost:4000`.

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `GET /api/books/:id` - Get a book by ID
- `PUT /api/books/:id` - Update a book by ID
- `DELETE /api/books/:id` - Delete a book by ID

### User Authentication

- `GET /user` - Retrieve user information
- `POST /register` - Register a new user
- `POST /login` - Authenticate a user
- `POST /passwordReset` - Request a password reset
- `POST /newPassword` - Set a new password
- `PUT /manageProfile` - Update user profile information

