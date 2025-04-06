import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdA: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
