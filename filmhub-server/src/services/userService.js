import UserModel from "../db/user.model.js";
import UserDetailsModel from "../db/userDetails.model.js";
import createBadRequestError from "../errors/badRequestError.js";

const getFavoritesByUserId = async (userId) => {
    if (!userId) {
        createBadRequestError(400, 'missing credential')
    }

    const user = await UserModel.findById(userId).populate('userDetails')
    if (!user) {
        createBadRequestError(404, 'user')
    }

    return user.userDetails.favorites;
}

const addToFavorite = async (userId, mediaId) => {
    if (!userId || !mediaId) {
        createBadRequestError(400, "missing request data..")
    }

    const user = await UserModel.findById(userId);
    const update = await UserDetailsModel.findByIdAndUpdate(
        user.userDetails,
        { $push: { favorites: mediaId } },
        { new: true }
    )

    return update;
}

const removeFavorite = async (userId, mediaId) => {
    if (!userId || !mediaId) {
        createBadRequestError(400, "missing request data..")
    }

    const user = await UserModel.findById(userId);
    const update = await UserDetailsModel.findByIdAndUpdate(
        user.userDetails,
        { $pull: { favorites: mediaId } },
        { new: true }
    )
    return update;
}

export { getFavoritesByUserId, addToFavorite, removeFavorite }


