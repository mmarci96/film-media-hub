import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const { MONGO_URI, PORT = 8080, HOST = '0.0.0.0' } = process.env;

const allowedOrigins = ['http://localhost:5173', 'http://localhost:80'];

const options = {
    origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send({ messege: "ok" });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);

app.use(errorHandler);

const main = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, HOST, () => {
            console.log(`App is listening on http://${HOST}:${PORT}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

main()
