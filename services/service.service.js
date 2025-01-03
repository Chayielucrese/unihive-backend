import serviceModel from "../models/service.model.js";

export const createService = async (value) => {
  return await serviceModel.create(value);
};
export const getOneService = async (filter) => {
  return await serviceModel.findOne(filter);
};
export const fetchAllServices = async () => {
  return await serviceModel.find().populate("categories");
};
export const findServiceById = async (id) => {
  return await serviceModel.findById(id);
};
export const updateService = async (id, value) => {
  return await serviceModel.findByIdAndUpdate(id, value);
};
export const deleteServiceById = async (id) => {
  return await serviceModel.findByIdAndDelete(id);
};
