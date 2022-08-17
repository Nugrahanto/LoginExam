import express from "express";
import { getUsers, Register, Login, Logout, getUsersById, updateUser, forgotPassword, resetPassword } from "../controllers/UsersController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.patch('/users/:id', updateUser);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword', resetPassword);

export default router;