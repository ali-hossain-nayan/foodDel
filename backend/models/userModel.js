import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {}
    }

    //here we use minimize false sothat cartdata will create empty
}, { minimize: false })


const userModel = mongoose.models.user || mongoose.model("user", userModelSchema);
export default userModel;