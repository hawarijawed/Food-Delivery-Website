import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

//Add items to cart
const addToCart = async(req, res) =>{
    try {

        let userId = req.user.id;
        let userData = await userModel.findById({_id:userId});//req.body.userId is set in auth middleware
        // console.log(userData);
        
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message:"Added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}


//Remove itmes
const removeFromCart = async (req, res) =>{
    try {
        // let userData = await userModel.findById({_id:req.body.userId});
        // let cartData = await userData.cartData;
        // if(cartData[req.body.itemId]>0){
        //     cartData[req.body.itemId] -= 1;
        //     // Remove the item if quantity reaches 0
        //     if (cartData[req.body.itemId] === 0) {
        //         delete cartData[req.body.itemId];
        //     }
        // }
        // else{
        //     return res.json({success:false,message:"No such item to delete"});
        // }
        // await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        // res.json({success:true, message:"Item removed"});
        // Access the user ID from req.user
        const userId = req.user.id;
        
        // Find the user data by userId
        let userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Access cart data from user
        let cartData = userData.cartData;

        // Check if the item exists in the cart
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // Remove the item from the cart if its quantity reaches 0
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            // Update the user data with the updated cart
            await userModel.findByIdAndUpdate(userId, { cartData });

            return res.json({ success: true, message: "Item removed" });
        } else {
            return res.json({ success: false, message: "No such item in the cart to remove" });
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}

//fetch user Cart data
const getCart = async(req, res) =>{
   try {
        // Access the userId from req.user (set by authMiddleware)
        const userId = req.user.id;

        // Find the user data by userId
        let userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Access cart data from the user
        let cartData = userData.cartData;

        // Respond with the cart data
        res.json({ success: true, data:cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || error });
    }
}

export {addToCart, removeFromCart, getCart
};