import { JwtPayload } from "jsonwebtoken";
import mongoose, { Document, Model, Schema, model } from "mongoose";

interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  author: string | JwtPayload;
  summary: string;
  content: string;
  cover: string;
}

const PostSchema = new Schema(
  {
    title: { type: String, required: true, min: 4, unique: true },
    author: { type: Schema.Types.ObjectId, ref: "user" },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
  },
  { timestamps: true }
);

const Post: Model<IPost> = model<IPost>("post", PostSchema);

export { Post, IPost };
