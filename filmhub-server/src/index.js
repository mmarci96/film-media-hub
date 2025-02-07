import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const { MONGO_URI, PORT = 8080, HOST = '0.0.0.0' } = process.env;

const allowedOrigins = ['http://localhost:5173', 'http://localhost:80'];

const options = {
    origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/health', (req, res) => {
    res.status(200).send({ messege: "ok" });
});

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
