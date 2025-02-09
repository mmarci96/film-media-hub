import express from "express"
import { authenticateToken } from "../middleware/authToken.js";
import { addToFavorite, deleteUser, getFavoritesByUserId, getUserById, removeFavorite, updateUser } from "../services/userService.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await getUsers();
        return res.status(200).send({ data: users })
    } catch (err) {
        next(err)
    }
})

router.patch('/', authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const { ...updateData } = req.body;
        const updatedUser = await updateUser({ id: userId, ...updateData })
        res.status(201).send({ data: updatedUser })
    } catch (err) {
        next(err)
    }
})

router.delete("/", authenticateToken, async (req, res, next) => {
    try {
        const { userId } = req;
        const deleteStatus = await deleteUser(userId);
        res.status(204).send({ message: "Deleted successfully!", data: deleteStatus })
    } catch (error) {
        next(error)
    }
})

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


router.get('/:id', authenticateToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.status(200).send({ data: user })
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
