import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = 8800;

//middlewares
app.use(express.json());
app.use(cors());


//db connection
connectDB();

//API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
/*
app.use("/images", express.static('uploads'));
is used to serve static files (like images) from your local uploads folder
to access the image:- http://localhost:port/images/image_name
*/

app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.get("/", (req, res) =>{
    res.send("Hello from server!!!");
});

app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})