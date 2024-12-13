// backend/controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Create a new user (signup)
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user.' });
    }
};

// Login user (authentication)
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // If login is successful, send back the user info without a token
        res.status(200).json({ message: 'Login successful.', user });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in.' });
    }
};

// Update user profile (example)
export const updateUser = async (req, res) => {
    const { name, email } = req.body;
    const userId = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully.', updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user.' });
    }
};

// Delete user profile (example)
export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user.' });
    }
};
