import jwt from "jsonwebtoken";
import dotenv from "dotenv-flow";
import { STATUS_CODES } from "../config/app.config.js";
dotenv.config({ path: "local.env" });

export const checkAuthenticated = (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization === null
  ) {
    return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ message: "Unauthorized, token does not exist" });
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "") {
    return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ message: "Token does not exist" });
  } else {
    jwt.verify(token.trim(), process.env.JWT_TOKEN_KEY, (err, result) => {
      if (err) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: "Token expired " + err });
      } else if (result) {
        console.log(result, "result");

        req.user = result;
        console.log(req.user, " req.userId ");
        req.userId = req.user.id;
        next();
      }
    });
  }
};
