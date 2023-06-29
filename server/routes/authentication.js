import express from "express";
import { loginUser, signupUser } from "../controller/authentication.js";

const authenticationRouter = express.Router();

authenticationRouter.route("/login").post(loginUser);
authenticationRouter.route("/signup").post(signupUser);

export default authenticationRouter;
