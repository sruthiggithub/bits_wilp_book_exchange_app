'use strict';

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var userRoutes = require('./routes/UserRoutes'); // Adjust the path as necessary

var app = express();
var PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
var mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('MongoDB connection string is missing in environment variables');
    process.exit(1);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
    return console.log('Book exchange app database is connected');
}).catch(function (err) {
    return console.error(err);
});

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});