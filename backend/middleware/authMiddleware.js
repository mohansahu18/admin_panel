import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            console.log(req.header("authorization"));
            console.log(typeof req.header("authorization"))
            token = req.header("authorization").split(' ')[1];
            console.log(JWT_SECRET, "JWT_SECRET..........");
            const decoded = await jwt.verify(token, JWT_SECRET);
            req.user = decoded
            next();
        } catch (error) {
            res.status(401).json({
                message: 'Not authorized, token failed',
                error: true
            });
        }
    }

    if (!token) {
        res.status(401).json({
            message: 'Not authorized, no token',
            error: true
        });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({
            message: 'Not authorized as an admin',
            error: true
        });
    }
};