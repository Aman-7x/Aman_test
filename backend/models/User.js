// backend/model/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // You can add more fields here (e.g., profile picture, role)
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
