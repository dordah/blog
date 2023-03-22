import { Request, Response } from "express";
import { IUser, User } from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "./auth";
import { BAD_REQUEST, OK, USER_NOT_FOUND, WRONG_CREDENTIALS } from "../consts";

const salt = bcrypt.genSaltSync(10);

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userDoc: IUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch {
    res.status(BAD_REQUEST.status).json({ error: BAD_REQUEST.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDoc: IUser | null = await User.findOne({ username });
  if (!userDoc) {
    res.status(USER_NOT_FOUND.status).json({ error: USER_NOT_FOUND.message });
    return;
  }
  const auth = bcrypt.compareSync(password, userDoc.password);

  if (auth) {
    try {
      const token = await generateToken(userDoc);
      return res
        .cookie("token", token)
        .status(OK.status)
        .json({ id: userDoc._id, username: userDoc.username });
    } catch (error) {
      return res.status(BAD_REQUEST.status).json({
        error: error instanceof Error ? error.message : BAD_REQUEST.message,
      });
    }
  } else {
    return res
      .status(WRONG_CREDENTIALS.status)
      .json({ error: WRONG_CREDENTIALS.message });
  }
};

export const getProfileData = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  try {
    const info = await verifyToken(token);
    res.json(info);
  } catch (err) {
    res.status(BAD_REQUEST.status).json({
      error: err instanceof Error ? err.message : BAD_REQUEST.message,
    });
  }
};

export const logout = (_: Request, res: Response) => {
  res.cookie("token", "").json(OK.message);
};
