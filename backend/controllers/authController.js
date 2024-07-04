import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'Please provide all fields',
                error: true,
            });
        }
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists',
                error: true
            });
        }

        try {

            const user = await User.create({ firstName, lastName, email, password });
            if (!user) {
                res.status(500).json({
                    message: 'error while creating a user',
                    error: error.message
                });

            }

            return res.status(201).json({
                message: 'User created successfully',
                error: false,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Something Went Wrong',
                error: error.message
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server error',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'User Not Register',
                error: true
            });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '24h'
        })
        user.token = token
        user.password = undefined

        return res.status(200).json({
            user,
            token,
            message: 'Login Successful',
            error: false
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server error',
            error: error.message
        });
    }
};