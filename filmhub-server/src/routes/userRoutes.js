import express from "express"
import { authenticateToken } from "../middleware/authToken.js";
import { addToFavorite, getFavoritesByUserId, removeFavorite } from "../services/userService.js";

const router = express.Router();

router.get('/favorites', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const favorites = await getFavoritesByUserId(userId);
        console.log(userId, favorites)
        res.status(200).send({ data: favorites })
    } catch (err) {
        next(err)
    }
})

router.patch('/favorites', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const { mediaId } = req.body;
        const result = await addToFavorite(userId, parseInt(mediaId))

        res.status(201).send({ data: result })
    } catch (err) {
        next(err)
    }
})

router.delete('/favorites', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const { mediaId } = req.body;
        const result = await removeFavorite(userId, parseInt(mediaId))
        res.status(203).send({ data: result })
    } catch (err) {
        next(err)
    }
})


export default router
