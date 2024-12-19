import userModel from "../models/user.model.js";

export const createUser = async (value) => {
  return await userModel.create(value);
};
export const getOneUser = async (filter) => {
  return await userModel.findOne(filter);
};
