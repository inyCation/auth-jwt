import express from "express";
import { config } from "dotenv";
import usersRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();

config({
  path: ".env",
});

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({
  extended: true
}));

app.use(
    cors({
      origin: 'https://auth-jwt-pi.vercel.app/',
      methods:  ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
      credentials: true,
    })
  );

app.use("/user", usersRoutes);
