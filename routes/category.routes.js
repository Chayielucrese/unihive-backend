import * as categoryController from "../controllers/category.controller.js";
import express from "express";

const router = express.Router();

router
  .route("/")
  .post(categoryController.addServiceCategory)
  .get(categoryController.getAllServiceCategories);
router
  .route("/:id")
  .put(categoryController.updateServiceCategory)
  .delete(categoryController.deleteServiceCategory);
export default router;
