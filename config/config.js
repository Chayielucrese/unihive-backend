import dotenv from "dotenv-flow";
dotenv.config();

export const CONFIG = {
  JWT_TOKEN: process.env.JWT_TOKEN_KEY,
};
