import jwt from "jsonwebtoken";

export const createJWT = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
  return token;
};

export const verifyJWT = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};
