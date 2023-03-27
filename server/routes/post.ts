import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  getPostById,
  likeHandler,
} from "../controllers/post";
import multer from "multer";

const uploadMiddleware = multer({ dest: "uploads/" });

const postRouter = Router();

postRouter.post("/", uploadMiddleware.single("file"), createPost);
postRouter.get("/", getPosts);
postRouter.put("/", uploadMiddleware.single("file"), updatePost);
postRouter.get("/:id", getPostById);
postRouter.post("/:id/like", likeHandler);

export default postRouter;
