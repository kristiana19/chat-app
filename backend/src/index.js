import experss from "express";
import authRouts from "./routes/auth.route.js";

const app = experss();

app.use("/api/auth", authRouts);

app.listen(5001, () => {
    console.log("server is running on port 5001");
})