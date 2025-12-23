import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./Routes/auth.Route.js";
import chatRouter from "./Routes/chat.Route.js";
import messageRouter from "./Routes/message.Route.js";
import ConnectDb from "./Configs/DB.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5400;
const MONGO_URL = process.env.MongoDb_URI;
ConnectDb();
// Middleware
app.use(express.json());
app.use(cors());

// // DB Connection
// mongoose.connect(MONGO_URL)
//     .then(() => console.log("Connected to DB"))
//     .catch((err) => console.log("DB Connection Error:", err));

// Routes
app.get('/', (req, res) => {
    res.send("Backend is running properly");
});


app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

app.listen(PORT, () => { 
    console.log(`the app is running on server : ${PORT}`);
});