import userModel from "../models/user.model.js";

export const createUser = async (value) => {
  return await userModel.create(value);
};
export const getOneUser = async (filter) => {
  return await userModel.findOne(filter);
};
export const getUserById = async (id) => {
  return await userModel.findById(id);
};
export const getAllUsers = async () => {
  return await userModel.find();
};

export const getUsersAndCount = async () => {
  return await userModel.countDocuments();
};

export const getSpecificUsers = async (filter) => {
  return await userModel.find(filter);
};

export const updateUserById = async (id, value) => {
  await userModel.findByIdAndUpdate(id, value);
  return await getUserById(id);
};
export const updateUserRole = async (id, value) => {
  await userModel.findByIdAndUpdate(id, value);
  return await getUserById(id);
};

export const hardDeleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
