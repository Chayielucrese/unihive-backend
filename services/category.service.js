import categoryModel from "../models/category.model.js";

export const createCategory = async (value) => {
  return await categoryModel.create(value);
};
export const getOneCategory = async (filter) => {
  return await categoryModel.findOne(filter);
};
export const getAllCategory = async () => {
  return await categoryModel.find();
};
export const findCategoryById = async (id) => {
  return await categoryModel.findById(id);
};
export const updateCategory = async (id, value) => {
  return await categoryModel.findByIdAndUpdate(id, value);
};
export const deleteCategoryById = async (id) => {
  return await categoryModel.findByIdAndDelete(id);
};
