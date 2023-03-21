import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>("user", UserSchema);

export { User, IUser };
