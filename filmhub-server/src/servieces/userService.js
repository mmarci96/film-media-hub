import UserModel from "../db/userModel";
import UserDetailsModel from "../db/userDetailsModel";
import createBadRequestError from "../errors/badRequestError";

const getFavoritesByUserId = async (userId) => {
    if (!userId) {
        createBadRequestError(400, 'missing credential')
    }

    const user = await UserModel.findById(userId).populate('userDetails')
    if (!user) {
        createBadRequestError(404, 'user')
    }

    return user;
}

const addToFavorite = async (userId, mediaId) => {
    if (!userId || !mediaId) {
        createBadRequestError(400, "missing request data..")
    }

    const user = await UserModel.findById(userId);
    const update = await UserDetailsModel.findByIdAndUpdate(
        user.userDetails,
        { $push: { favorites: mediaId } }
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
        { $pop: { favorites: mediaId } }
    )
    return update;
}

export { getFavoritesByUserId, addToFavorite, removeFavorite }


