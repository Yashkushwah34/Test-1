import express from "express";
import cors from "cors";
import helmet from "helmet";
import { failResponse } from "./helperFunctions/responseCreator.js";
import authenticationRouter from "./routes/authentication.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/api/v1/authentication", authenticationRouter);
app.use("/api/v1/user", userRouter);

app.use("*", (req, res) => {
  return failResponse(res, 404, "Route not found");
});

export default app;
