import { Router } from "express";
import { register, login, getProfileData, logout } from "../controllers/users";

const usersRouter = Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile", getProfileData);
usersRouter.post("/logout", logout);

export default usersRouter;
