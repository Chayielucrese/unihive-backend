import { STATUS_CODES } from "../config/app.config.js";
import {
  getOneService,
  createService,
  fetchAllServices,
  findServiceById,
  updateService,
  deleteServiceById,
} from "../services/service.service.js";

export const addService = async (req, res) => {
  try {
    if (!req.body || !Object.values(req.body).every((value) => value)) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Fill all required fields" });
    }
    const service_exist = await getOneService({ name: req.body.name });
    if (service_exist) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Service Already Exists" });
    }
    const new_service = await createService(req.body);
    return res.status(STATUS_CODES.OK).json({
      message: "Service Created Successfully",
      data: new_service,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while creating the service", error });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await fetchAllServices();
    return res
      .status(STATUS_CODES.OK)
      .json({ message: "Services Fetched Successfully", data: services });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while fetching services", error });
  }
};

export const updateServiceById = async (req, res) => {
  try {
    const service = await findServiceById({ _id: req.params.id });
    if (!service)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "service not found !" });
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Please fill at least a field to update." });
    }
    const service_updated = await updateService(service._id, req.body);
    return res.status(STATUS_CODES.OK).json({
      message: "service updated successfully !",
      data: service_updated,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  const service = await findServiceById(req.params.id);
  if (!service)
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Service does not exist" });
  const deleted_service = await deleteServiceById(service._id);
  return res
    .status(STATUS_CODES.OK)
    .json({ message: "Service deleted successfully, ", data: deleted_service });
};

export const viewServiceById = async (req, res) => {
  const view_service = await findServiceById(req.params.id);
  if (!view_service)
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: "Service Not Found" });
  return res
    .status(STATUS_CODES.OK)
    .json({ message: "Service Fetched Successfully", data: view_service });
};
