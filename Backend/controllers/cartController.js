import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

//Add items to cart
const addToCart = async(req, res) =>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});//req.body.userId is set in auth middleware
        // console.log(userData);
        
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}


//Remove itmes
const removeFromCart = async (req, res) =>{
    try {
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
            // Remove the item if quantity reaches 0
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }
        else{
            return res.json({success:false,message:"No such item to delete"});
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Item removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}

//fetch user Cart data
const getCart = async(req, res) =>{

}

export {addToCart, removeFromCart, getCart
};