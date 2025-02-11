import express from 'express'
import { createUser, loginUser } from '../services/authService.js'

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser({ email, password })
        res.status(200).send({ message: "Successful login", token: token })
    } catch (err) {
        next(err);
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        const { email, username, password, theme } = req.body;
        const result = await createUser({ username, email, password, theme });
        res.status(201).send({ messsage: "Resitered user", email: result?.email })
    } catch (err) {
        next(err)
    }
})

export default router;
