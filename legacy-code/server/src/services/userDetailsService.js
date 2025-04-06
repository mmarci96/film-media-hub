import UserDetailsModel from "../db/userDetails.model.js"
import createBadRequestError from "../errors/badRequestError.js"

export const saveUserTheme = async (userId, theme) => {
    if (!userId) {
        createBadRequestError(401, "User ID is required");
    }

    const result = await UserDetailsModel.findOneAndUpdate(
        { userId },
        { theme },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }
    );
    if (!result) {
        createBadRequestError(400, 'usertheme')
    }

    return result;
};

export const updateAvatar = async (userId, avatar) => {
    const update = await UserDetailsModel.findOneAndUpdate(
        { userId },
        { avatar },
        {
            new: true,
            upsert: true,
        }
    )
    if (!update) createBadRequestError(400, "failed to save")

    return update
}
