import express from 'express';
import { authenticateToken } from "../middleware/authToken.js";
import { deleteFavoriteMedia, getFavoritesByUserId, saveFavoriteMedia } from '../services/favoriteService.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const favorites = await getFavoritesByUserId(userId);

        res.status(200).send({ data: favorites });
    } catch (err) {
        next(err)
    }
})

router.post('/', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const { mediaId, mediaType } = req.body;

        const result = await saveFavoriteMedia({
            userId,
            mediaId,
            mediaType
        });

        res.status(201).send({ data: result });
    } catch (err) {
        next(err);
    }
});

router.delete('/', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const { mediaId, mediaType } = req.body;
        const result = await deleteFavoriteMedia({ userId, mediaType, mediaId })

        res.status(203).send({ data: result })
    } catch (err) {
        next(err)
    }
})

router.delete('/:favoriteId', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const { favoriteId } = req.params;

        const result = await deleteFavoriteMedia({
            userId,
            favoriteId
        });

        res.status(200).send({
            data: result,
            message: 'Favorite successfully deleted'
        });
    } catch (err) {
        next(err);
    }
});

export default router;

