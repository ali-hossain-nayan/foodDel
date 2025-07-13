import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  const image_filename = req.file?.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added Successfully." });
  } catch (error) {
    console.error("Add Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("List Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// Remove a food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required." });
    }

    const foodItem = await foodModel.findById(id);
    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }

    // Delete image file if it exists
    const imagePath = `uploads/${foodItem.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete from DB
    await foodModel.findByIdAndDelete(id);

    return res.json({ success: true, message: "Food removed successfully." });
  } catch (error) {
    console.error("Remove Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export { addFood, listFood, removeFood };
