import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouter from "./routes/UserRouter.js";
import CourseRouter from "./routes/CourseRouter.js";
import VideoRouter from "./routes/VideoRouter.js";
import ConferenceRouter from "./routes/ConferenceRouter.js";
import BlogRouter from "./routes/BlogRouter.js";
import CategoryRouter from "./routes/CategoryRouter.js";
import MemeberShipRouter from "./routes/MemberShipRouter.js";
import ProgressRouter from "./routes/ProgressRouter.js";
import QuizRouter from "./routes/QuizRouter.js";
import AdminRouter from "./routes/AdminRouter.js";
import OrderRouter from "./routes/OrderRouter.js";
import PaymentRouter from "./routes/PaymentRouter.js";
import { stripeWebhook } from "./controllers/PaymentController.js";
import ApplicationRouter from "./routes/ApplicationRouter.js";
import ClubAppRouter from "./routes/ClubAppRouter.js";
import CoachAppRouter from "./routes/CoachAppRouter.js";
import ResearchRouter from "./routes/ResearchRouter.js";
import PageRouter from "./routes/PageRouter.js";

dotenv.config();

const app = express();
const allowedOrigins = ["https://www.bsesac.co.uk", "https://bsesac.co.uk"];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
    credentials: true,
  })
);
app.options("*", cors());

app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(UserRouter);
app.use(CourseRouter);
app.use(VideoRouter);
app.use(ConferenceRouter);
app.use(BlogRouter);
app.use(MemeberShipRouter);
app.use(CategoryRouter);
app.use(ProgressRouter);
app.use(QuizRouter);
app.use(OrderRouter);
app.use(PaymentRouter);
app.use(ClubAppRouter);
app.use(CoachAppRouter);
app.use(ApplicationRouter);
app.use(PageRouter);
app.use("/researches", ResearchRouter);
app.use("/admin", AdminRouter);

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
