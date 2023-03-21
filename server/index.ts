import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { User, IUser } from "./models/User";
import { Post, IPost } from "./models/Post";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import multer from "multer";
import fs from "fs";

const uploadMiddleware = multer({ dest: "uploads/" });

dotenv.config();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET!;
const databaseUrl = process.env.DATABASE_URL!;
const port = process.env.PORT!;

const app: Express = express();

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(`${databaseUrl}/?retryWrites=true&w=majority`);

app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userDoc: IUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDoc: IUser | null = await User.findOne({ username });
  if (!userDoc) {
    res.status(400).json("User not found");
    return;
  }
  const auth = bcrypt.compareSync(password, userDoc.password);

  if (auth) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        res.status(400).json({ error: "Failed to generate JWT" });
      } else {
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      }
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.get("/profile", (req: Request, res: Response) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      res.status(400).json("Unauthorized");
      return;
    }
    res.json(info);
  });
});

app.post("/logout", (req: Request, res: Response) => {
  res.cookie("token", "").json("ok");
});

app.get("/post", async (req: Request, res: Response) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.post(
  "/post",
  uploadMiddleware.single("file"),
  async (req: Request, res: Response) => {
    const originalname = req.file?.originalname ?? "";
    const fileExt = originalname.split(".").pop();
    const newPath = `${req.file?.path}.${fileExt}`;
    fs.renameSync(req.file?.path || "", newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;

      const { title, summary, content } = req.body;
      try {
        const postDoc: IPost = await Post.create({
          title,
          author: (info as JwtPayload).id,
          summary,
          content,
          cover: newPath,
        });
        res.status(201).json(postDoc);
      } catch (e) {
        res.status(400).json(e);
      }
    });
  }
);

app.put(
  "/post",
  uploadMiddleware.single("file"),
  async (req: Request, res: Response) => {
    let newPath: null | string = null;
    if (req.file) {
      const originalname = req.file?.originalname ?? "";
      const fileExt = originalname.split(".").pop();
      newPath = `${req.file?.path}.${fileExt}`;
      fs.renameSync(req.file?.path || "", newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;

      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);

      const isAuthor =
        JSON.stringify(postDoc?.author) ===
        JSON.stringify((info as JwtPayload).id);
      if (!isAuthor) {
        res.status(400).json("Unauthorized author");
      }

      if (postDoc) {
        await Post.updateOne(
          { _id: postDoc._id },
          {
            $set: {
              title,
              summary,
              content,
              cover: newPath ? newPath : postDoc.cover,
            },
          }
        );
      }

      res.json(postDoc);
    });
  }
);

app.get("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
