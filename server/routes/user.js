import express from "express";
import { protectedUserRoutes } from "../controller/authentication.js";
import {
  addReport,
  deleteReport,
  getAllReports,
  getReport,
  getUserInfo,
  updateReport,
} from "../controller/user.js";

const userRouter = express.Router();

userRouter.route("/").get(protectedUserRoutes, getUserInfo);
userRouter
  .route("/report")
  .post(protectedUserRoutes, addReport)
  .get(protectedUserRoutes, getAllReports);
userRouter
  .route("/report/:id")
  .get(protectedUserRoutes, getReport)
  .patch(protectedUserRoutes, updateReport)
  .delete(protectedUserRoutes, deleteReport);

export default userRouter;
