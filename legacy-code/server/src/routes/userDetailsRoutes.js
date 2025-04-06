import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { updateAvatar } from "../services/userDetailsService.js";

const router = express.Router();

router.patch('/avatar', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const { avatar } = req.body;
        const result = await updateAvatar(userId, avatar);
        res.status(201).send({ data: result });
    } catch (err) {
        next(err)
    }
})


export default router;
