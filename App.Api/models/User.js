import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({    
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: {type: String, required: false},
    name: {type: String, required: false },        
    favoriteGenres: {type: String, required: false, default: 'fiction', values: ['fiction', 'non-fiction', 'both']},    
    booksWishList: {type: String, required: false}, 
    resetToken: {type: String, required: false},
    resetTokenExpiration: {type: Number, required: false}
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
