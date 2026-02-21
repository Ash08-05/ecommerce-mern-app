import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    cartData: { type: Object, default: {} }
}, { minimize: false }) /* prevent mongoose to remove empty object/cart */

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;