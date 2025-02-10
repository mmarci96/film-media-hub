import UserFavoriteModel from "../db/user.favorite.model.js";
import createBadRequestError from "../errors/badRequestError.js";

export const deleteFavoriteMedia = async ({ userId, mediaId, mediaType }) => {
    if (!userId || !mediaId || !mediaType) {
        createBadRequestError(400, "missing data to save favorite");
    }

    const deleted = await UserFavoriteModel.findOneAndDelete({
        userId, mediaId, mediaType
    })

    if (!deleted) {
        createBadRequestError(404, "failed to delete")
    }

    return deleted;
}

export const saveFavoriteMedia = async ({
    userId, mediaId, mediaType
}) => {
    if (!userId || !mediaId || !mediaType) {
        createBadRequestError(400, "missing data to save favorite");
    }

    const existing = await UserFavoriteModel.findOne({ userId, mediaId, mediaType });
    if (existing) {
        createBadRequestError(403, ", save the same media twice")
    }

    const saveFavorite = new UserFavoriteModel({
        userId, mediaId, mediaType
    })
    const favorite = await saveFavorite.save();
    if (!favorite) {
        createBadRequestError(400, "favorites")
    }

    return favorite;
}

export const deleteFavoriteMediaById = async ({
    userId, favoriteId
}) => {
    if (!userId || !favoriteId) {
        createBadRequestError(400, "missing data to save favorite");
    }

    const deleted = await UserFavoriteModel.findOneAndDelete({
        _id: favoriteId, userId
    })
    if (!deleted) {
        createBadRequestError(404, "favorite")
    }

    return deleted;
}

export const getFavoritesByUserId = async (userId) => {
    if (!userId) {
        createBadRequestError(400, "no id provided")
    }

    const favoriteList = await UserFavoriteModel
        .find({ userId })
        .sort({ createdAt: -1 })
        .select('_id mediaId mediaType createdAt')
    if (!favoriteList) {
        createBadRequestError(404, 'no favorites')
    }
    return favoriteList;
}
