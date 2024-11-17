import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();     
       
    // Send response with token
    res.status(201).json({
        message: 'User created successfully'        
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser =  async (req, res) => { 
  try {
     const user = await User.findById(req.user.id);

      if (!user) {
          return res.status(401).json({ message: 'User not found' });
      }
      
      res.json({ 
        name: user.name, 
        username: user.username, 
        phoneNumber: user.phoneNumber || '', 
        favoriteGenres: user.favoriteGenres, 
        booksWishList: user.booksWishList 
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

export const passwordReset = async (req, res) => {
    const { username } = req.body;
  
    // Find user by email
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(404).json({ message: 'No account found with that email address.' });
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
  
  export const newPassword = async (req, res) => {
    const { username, newPassword } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  

  export const manageProfile = async (req, res) => {
    const { phoneNumber,name, favoriteGenres,booksWishList  } = req.body;
    try {

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.name = name || user.name;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.favoriteGenres = favoriteGenres || user.favoriteGenres;
        user.booksWishList = booksWishList || user.booksWishList;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


