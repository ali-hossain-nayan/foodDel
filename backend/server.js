import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRouter.js";
//db->model->controller->route->server-endpoints
//app config

const app = express();
const port = 4001;

//middleware
app.use(express.json());//whenever request from frontend to backend it will pass using this json
app.use(cors());//we can access backend with any frontend

//db connection
connectDB();


//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/images", express.static("uploads"));



app.get("/", (req, res) => {
    res.send("API is Working..");
})


//running the server
app.listen(port, () => {
    console.log(`Server Started On http://localhost:${port}`);
})

