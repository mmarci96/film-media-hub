import UserFavoriteModel from "../db/user.favorite.model";
import createBadRequestError from "../errors/badRequestError";

export const saveFavoriteMedia = async ({
    userId, mediaId, mediaType
}) => {
    if (!userId || !mediaId || !mediaType) {
        return createBadRequestError(400, "missing data to save favorite");
    }

    const existing = await UserFavoriteModel.findOne({ userId, mediaId, mediaType });
    if (existing) {
        return createBadRequestError(403, ", save the same media twice")
    }

    const saveFavorite = new UserFavoriteModel({
        userId, mediaId, mediaType
    })
    const favorite = await saveFavorite.save();
    if (!favorite) {
        return createBadRequestError(400, "favorites")
    }

    return favorite;
}

export const deleteFavoriteMedia = async ({
    userId, favoriteId
}) => {
    if (!userId || !favoriteId) {
        return createBadRequestError(400, "missing data to save favorite");
    }

    const deleted = await UserFavoriteModel.findOneAndDelete({
        _id: favoriteId, userId
    })
    if (!deleted) {
        return createBadRequestError(404, "favorite")
    }

    return deleted;
}

export const getFavoritesByUserId = async (userId) => {
    if (!userId) {
        return createBadRequestError(400, "no id provided")
    }

    const favoriteList = await UserFavoriteModel
        .find({ userId })
        .sort({ createdAt: -1 })
    if (!favoriteList) {
        return createBadRequestError(404, 'no favorites')
    }
    return favoriteList;
}
