import UserModel from "../db/user.model.js";
import createBadRequestError from "../errors/badRequestError.js";

export const getUsers = async () => {
    const users = await UserModel.find({}).select(["username", "email", "createdAt"])
    if (!users) {
        createBadRequestError(404, "users")
    }
    return users;
}

export const updateUser = async ({ id, ...updateData }) => {
    const updateUser = await UserModel.findByIdAndUpdate(
        id, { ...updateData }, { new: true }
    )
    if (!updateUser) {
        createBadRequestError(400, "users are not updatign")
    }
    return updateUser;
}

export const deleteUser = async (id) => {
    const deleteResult = await UserModel.findByIdAndDelete(id);
    if (!deleteResult) {
        createBadRequestError(403, "delete unsuccesful")
    }
    return { message: "deleted user" }
}

export const getUserById = async (id) => {
    const user = await UserModel.findById(id).select("-password").populate('userDetails');
    if (!user) {
        createBadRequestError(404, "user")
    }
    return user;
}



