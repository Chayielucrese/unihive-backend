import tokenSchema from "../models/token.model.js";

export const getAllTokens = async () => {
  return await tokenSchema.find();
};

export const createToken = async (token) => {
  return await tokenSchema.create(token);
};

export const getOneToken = async (token) => {
  return await tokenSchema.findOne(token);
};

export const getUserToken = async (token) => {
  return await tokenSchema.findOne(token).sort({ _id: -1 });
};

export const deleteToken = async (id) => {
  return await tokenSchema.findByIdAndDelete(id);
};
