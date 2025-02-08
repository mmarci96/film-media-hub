import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret_key = process.env.JWT_SECRET_KEY || '';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) || '';

    try {
        const jwtPayload = jwt.verify(token, secret_key);
        req.userId = jwtPayload['userId'];
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized', log: error });
    }
};
