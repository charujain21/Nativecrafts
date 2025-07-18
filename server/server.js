import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import 'dotenv/config';
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
// Import Mongoose models to ensure they are registered
import './models/User.js';
import './models/Product.js';
import './models/Order.js';
import './models/Address.js';
import { stripeWebhooks } from "./controllers/orderController.js";
// Add any other models you have here

// import dotenv from "dotenv";
// dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary()

//allow multiple origins
const allowedOrigins = ['http://localhost:5173', 'https://nativecrafts-3esi.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true})); //in that allow version that allow to pass here

app.get('/', (req, res) => res.send('API is Working'));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, ()=> {
    console.log(`server running on http://localhost:${port}`)
});
