import { Request, Response } from "express";
import fs from "fs";
import { Post, IPost } from "../models/Post";
import { verifyToken } from "./auth";
import { JwtPayload } from "jsonwebtoken";
import {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
  POST_NOT_FOUND,
  UNAUTHORIZED,
  MAX_POSTS_MAIN,
} from "../consts";

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts: IPost[] = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(MAX_POSTS_MAIN);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(SERVER_ERROR.status).json({ error: SERVER_ERROR.message });
  }
};

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const originalname = req.file?.originalname ?? "";
  const fileExt = originalname.split(".").pop();
  const newPath = `${req.file?.path}.${fileExt}`;
  fs.renameSync(req.file?.path || "", newPath);

  try {
    const { title, summary, content } = req.body;
    const decoded = await verifyToken(req.cookies.token);
    const postDoc = await Post.create({
      title,
      author: (decoded as JwtPayload).id,
      summary,
      content,
      cover: newPath,
    });
    res.status(CREATED.status).json(postDoc);
  } catch (error) {
    res.status(BAD_REQUEST.status).json(BAD_REQUEST.message);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id, title, summary, content } = req.body;
  const { file } = req;

  try {
    const info = await verifyToken(req.cookies.token);

    const postDoc: IPost | null = await Post.findById(id);
    if (!postDoc) {
      return res
        .status(POST_NOT_FOUND.status)
        .json({ error: POST_NOT_FOUND.message });
    }

    if (postDoc.author.toString() !== info.id) {
      return res
        .status(UNAUTHORIZED.status)
        .json({ error: UNAUTHORIZED.message });
    }

    let newPath: string | null = postDoc.cover;
    if (file) {
      const { originalname } = file;
      const fileExt = originalname.split(".").pop();
      newPath = `${file.path}.${fileExt}`;
      fs.renameSync(file.path, newPath);
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath,
    });

    const updatedPost = await Post.findById(id);
    if (!updatedPost) {
      return res
        .status(POST_NOT_FOUND.status)
        .json({ error: POST_NOT_FOUND.message });
    }

    return res.json(updatedPost);
  } catch (err) {
    console.error(err);
    return res
      .status(SERVER_ERROR.status)
      .json({ error: SERVER_ERROR.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR.status).json({ message: SERVER_ERROR.message });
  }
};
