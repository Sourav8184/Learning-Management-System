import cookieParser from "cookie-parser";
config();
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Routes
import userRoutes from "./routes/userRoute.js";
import courseRoutes from "./routes/courseRoute.js";

// Custom error handling middleware
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Third-Party
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

// Homepage route
app.get("/", (req, res) => {
  res.json({ ok: "Server is OK" });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);

// Default catch all route - 404
app.all("*", (_req, res) => {
  res.status(404).send("OOPS!!! 404 Page Not Found");
});

app.use(errorMiddleware);

export default app;
