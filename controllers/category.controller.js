import { STATUS_CODES } from "../config/app.config.js";
import {
  createCategory,
  getOneCategory,
  getAllCategory,
  findCategoryById,
  updateCategory,
  deleteCategoryById,
} from "../services/category.service.js";

export const addServiceCategory = async (req, res) => {
  try {
    const category_exist = await getOneCategory({ name: req.body.name });
    if (category_exist) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "This Category Already Exist" });
    }
    const new_category = await createCategory(req.body);
    return res.status(STATUS_CODES.OK).json({
      message: "Category Created Successfully",
      data: new_category,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while adding the category", error });
  }
};
export const getAllServiceCategories = async (req, res) => {
  try {
    const get_all_category = await getAllCategory();
    return res.status(STATUS_CODES.OK).json({
      message: "Categories Fetch successfully",
      data: get_all_category,
    });
  } catch (error) {
    console.log(error, "helloooo");
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while adding the category", error });
  }
};
export const updateServiceCategory = async (req, res) => {
  try {
    const category = await findCategoryById({ _id: req.params.id });
    if (!category)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "category not found !" });
    const category_updated = await updateCategory(category._id, req.body);
    return res.status(STATUS_CODES.OK).json({
      message: "category updated successfully !",
      data: category_updated,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
export const deleteServiceCategory = async (req, res) => {
  try {
    const deleted_category = await deleteCategoryById({ _id: req.params.id });
    if (!deleted_category)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Categoty not found" });

    return res.status(STATUS_CODES.OK).json({
      message: "Category deleted successfully !",
      data: deleted_category,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
