import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
       
       const token = jwt.sign(
        { userId: newUser._id, username: newUser.username },
        process.env.JWT_SECRET,  
        { expiresIn: '100h' }      
    );

    // Send response with token
    res.status(201).json({
        message: 'User created successfully',
        token,  // Send the JWT token to the client
    });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const passwordReset = async (req, res) => {
    const { username } = req.body;
  
    // Find user by email
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(400).json({ message: 'No account found with that email address.' });
    }  
   
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour expiry
  
    // Save token and expiration in the user object (in a real app, save this to a database)
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save()
  
    // Create reset URL (replace with your actual domain)
    const resetUrl = `http://localhost:${process.env.PORT}/reset-password/${resetToken}`;
  
    // Password reset email content
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: username,
      subject: 'Password Reset Request',
      html: `
        <h3>Password Reset Request</h3>
        <p>We received a request to reset your password. Please click the link below to reset it:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you did not request a password reset, please ignore this email.</p>
      `,
    };
  
    // Mock password reset mail
    res.status(200).json({ message: 'Password reset email sent.' });
  };
  
  // Placeholder reset password page (you can use React for this)
  export const clickResetPasswordLink = async(req, res) => {
    const token = req.params.token;
  
    // Find user with the matching token
    const user = await User.find((user) => user.resetToken === token);
  
    if (!user || user.resetTokenExpiration < Date.now()) {
      return res.status(400).send('Invalid or expired reset token.');
    }
  
    // Here you could render a form to reset the password or return a message
    res.send('Password reset form (implement this as needed)');
  };
  

  export const manageProfile = async (req, res) => {
    const { userId, username, email, phoneNumber } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


