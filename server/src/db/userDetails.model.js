import mongoose, { Schema } from 'mongoose';
const userDetailsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    avatar: { type: String, default: 'none' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const UserDetailsModel = mongoose.model('UserDetails', userDetailsSchema);
export default UserDetailsModel;
