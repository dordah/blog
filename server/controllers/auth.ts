import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { IUser } from "../models/User";
import { FAILED_GENERATE_JWT, UNAUTHORIZED } from "../consts";

dotenv.config();

const secret = process.env.SECRET!;

export const generateToken = async (userDoc: IUser): Promise<string> => {
  const payload = { username: userDoc.username, id: userDoc._id };
  const options = {};
  try {
    const token = await jwt.sign(payload, secret, options);
    return token;
  } catch (err) {
    throw new Error(FAILED_GENERATE_JWT);
  }
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    const decoded = await jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new Error(UNAUTHORIZED.message);
  }
};
