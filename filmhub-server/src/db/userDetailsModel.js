import mongoose, { Schema } from 'mongoose';
const userDetailsSchema = new Schema({
    favorites: { type: [String], default: [] },
    createdA: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const UserDetailsModel = mongoose.model('UserDetails', userDetailsSchema);
export default UserDetailsModel;
