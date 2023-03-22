import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import postRouter from "./routes/post";
import usersRouter from "./routes/users";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL!;
const port = process.env.PORT!;

const app: Express = express();

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/post", postRouter);
app.use("/", usersRouter);

mongoose.connect(`${databaseUrl}/?retryWrites=true&w=majority`);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
