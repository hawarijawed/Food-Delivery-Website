import express from "express";

import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = 8800;

//middlewares
app.use(express.json());
app.use(cors());


//db connection
connectDB();
app.get("/", (req, res) =>{
    res.send("Hello from server!!!");
});

app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    
})