import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import createBadRequestError from "../errors/badRequestError.js";
import dotenv from 'dotenv';
import UserDetailsModel from "../db/userDetails.model.js";
import UserModel from "../db/user.model.js";
dotenv.config();
const { JWT_SECRET_KEY } = process.env || '';


const createUser = async ({ username, email, password }) => {
    if (!username || !email || !password) {
        throw createBadRequestError(400, "credentials missing");
    }

    const existingMail = await UserModel.findOne({ email });
    if (existingMail) {
        throw createBadRequestError(400, "creating user, user with email exists.");
    }

    const existingName = await UserModel.findOne({ username });
    if (existingName) {
        throw createBadRequestError(400, "creating user, user with username exists.");
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    const userDetails = new UserDetailsModel({ favorites: [] })
    const details = await userDetails.save();
    const newUser = new UserModel({
        username, email,
        password: hashedPassword, userDetails: details._id
    });

    await newUser.save();
    return newUser;
}

const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw createBadRequestError(400, "credentials missing");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createBadRequestError(404, "user not found");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        throw createBadRequestError(401, "invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
    return token;
}

export { createUser, loginUser };
