import jwt from "jsonwebtoken";
import dotenv from "dotenv-flow";
dotenv.config({ path: "local.env" });
import { CONFIG } from "../config/config.js";
import { config, STATUS_CODES } from "../config/app.config.js";

export const checkAdmin = (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];
  jwt.verify(token?.trim(), process.env.JWT_TOKEN_KEY, (err, result) => {
    if (err)
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: err.message });
    req.user = result;
    const role = req.user.role;
    if (role !== "admin")
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ message: "Don't have required permissions !" });
    next();
  });
};
