import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { Messages } from '../common/TypesAndConstants';

// Create a new user
export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: Messages.createUserError, error });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: Messages.getUsersError, error });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: Messages.userNotFound });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: Messages.getUserByIdError, error });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: Messages.userNotFound });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: Messages.updateUserError, error });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: Messages.userNotFound });
        }
        res.json({ message: Messages.createUserSuccess });
    } catch (error) {
        res.status(500).json({ message: Messages.deleteUserError, error });
    }
};
