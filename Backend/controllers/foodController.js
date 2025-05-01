import foodModel from "../models/foodModel.js";
import fs from 'fs'
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


//add food items
const addFood = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`;
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        })
        await food.save();
        res.status(201).json({success:true, message: 'Food added', food: food });
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
}


//add food list
const listFood = async (req, res) =>{
    try {
        const allFood = await foodModel.find({});
        if(allFood.length<0){
            console.log('No food found');
            return;
        }

        console.log(allFood);
        
        res.status(200).json({success:true, message: 'Food List', food: allFood });
    } catch (error) {
        res.status(500).json({success:false, error: error.message });

    }
} 

//Remove food item
const removeFood = async (req, res) =>{
    try {
        //console.log(req.body);
        
        const food_id = req.body.id;
        const food = await foodModel.findById(food_id);
        fs.unlink(`uploads/${food.image}`, ()=>{});
        
        const deletedFood =  await foodModel.findByIdAndDelete(food_id);
        if (!deletedFood) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }
        res.status(200).json({ success: true, message: 'Food item deleted', deletedFood });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }
}

export { addFood, listFood, removeFood };