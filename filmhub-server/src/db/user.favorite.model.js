import mongoose, { Schema } from "mongoose";

const userFavoriteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mediaType: { type: String, required: true },
    favoriteId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
})

const UserFavoriteModel = mongoose.model("UserFavoriteModel", userFavoriteSchema);
export default UserFavoriteModel;

