// backend/routes/user-routes.js
import express from 'express';
import { createUser, loginUser, updateUser, deleteUser } from '../controllers/userController.js';

const userRouter = express.Router();

// Route to create a new user
userRouter.post('/signup', createUser);

// Route to login a user
userRouter.post('/login', loginUser);

// Route to update user details
userRouter.put('/:id', updateUser);

// Route to delete user profile
userRouter.delete('/:id', deleteUser);

export default userRouter;
