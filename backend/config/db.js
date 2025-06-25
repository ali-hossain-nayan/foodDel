import mongoose from "mongoose";
// Named export instead of default
export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://food-del-AliNayan:01690205129@cluster0.qyrkg.mongodb.net/food-del")
        .then(() => {
            console.log("DB Connected Successfully");
        });
};
