import userModel from "../models/userModel.js";

//add to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        
        // Find the user and get the cartData
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Ensure cartData exists
        
        // Add the item to the cart or increment it if already exists
        cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;
        
        // Update the user model with the modified cartData
        userData.cartData = cartData;  // Ensure the cartData is set in the user document
        await userData.save();  // Save the updated user document

        res.json({ success: true, message: "Item added to cart" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something went wrong!!" });
    }
}


//remove from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        
        // Find the user and get the cartData
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};  // Ensure cartData exists
        
        // If item exists in cartData and quantity is greater than 0
        if (cartData[itemId] > 0) {
            cartData[itemId]--;
            
            // If quantity reaches zero, remove the item from cartData
            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }

            // Update the user model with the modified cartData
            userData.cartData = cartData;  // Ensure the cartData is set in the user document
            await userData.save();  // Save the updated user document
            
            res.json({ success: true, message: "Item removed from cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something went wrong!!" });
    }
}


//fetch user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!!" });
    }
}

export { addToCart, removeFromCart, getCart };