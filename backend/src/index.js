import experss from "express";
import authRouts from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = experss();
dotenv.config();

const PORT = process.env.PORT;

app.use(experss.json());
app.use(cookieParser());

app.use("/api/auth", authRouts);

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});