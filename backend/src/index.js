import experss from "express";
import authRouts from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

const app = experss();
dotenv.config();

const PORT = process.env.PORT;

app.use("/api/auth", authRouts);

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});