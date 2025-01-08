import foodModel from "../models/foodModel.js";
import fs from "fs";
import foodRouter from "../routes/foodRoute.js";

//add food item
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;


    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        await food.save();
        res.json({ success: true, message: "Food Added Successfully." })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!!" })
    }
}


//All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!!" })
    }
}


//Remove food item
const removeFood = async (req, res) => {
    try {
        //find the food id wanted to delete
        const foodId = await foodModel.findById(req.body.id);
        //delete the food item from uploads folder using fs
        fs.unlink(`uploads/${foodId.image}`, () => { })
        //delete from mongoDB also 
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!!" })
    }


}

export { addFood, listFood, removeFood };