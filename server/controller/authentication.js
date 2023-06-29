import User from "../models/user.js";

import {
  successResponse,
  failResponse,
} from "../helperFunctions/responseCreator.js";

import { createJWT, verifyJWT } from "../helperFunctions/jwt.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      throw {
        status: 400,
        message: "Please provide email/password",
      };
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw {
        status: 400,
        message: "Invalid credentials",
      };
    }

    const correct = await user.checkPassword(password, user?.password);

    if (!correct) {
      throw {
        status: 400,
        message: "Invalid credentials",
      };
    }

    const token = createJWT(user._id);

    const obj = {
      token,
      message: "User logged in Successfully",
    };

    return successResponse(res, 200, obj);
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};

export const signupUser = async (req, res, next) => {
  try {
    const { email, name, password, number } = req.body || {};

    if (!email || !name || !password || !number) {
      throw {
        status: 400,
        message: "Please provide name/number/email/password",
      };
    }

    const user = await User.create({ email, name, password, number });

    const token = createJWT(user._id);

    const obj = {
      message: "User created successfully",
      token,
    };

    return successResponse(res, 200, obj);
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};

export const protectedUserRoutes = async (req, res, next) => {
  try {
    const { authorization } = req.headers || {};

    if (!authorization) {
      throw {
        status: 401,
        message: "Token not found",
      };
    }

    const token = authorization.split(" ")[1];

    const decode = await verifyJWT(token);

    if (!decode) {
      throw {
        status: 401,
        message: "Invalid Token",
      };
    }

    const { id } = decode;

    const user = await User.findById(id).select("-__v");

    if (!user) {
      throw {
        status: 400,
        message: "User not found",
      };
    }

    user.password = undefined;

    req.userInfo = user;

    next();
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};
