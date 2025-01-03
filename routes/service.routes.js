import * as serviceController from "../controllers/service.controller.js";
import express from "express";

const router = express.Router();
router
  .route("/")
  .post(serviceController.addService)
  .get(serviceController.getAllServices);
router
  .route("/:id")
  .put(serviceController.updateServiceById)
  .delete(serviceController.deleteService)
  .get(serviceController.viewServiceById);
export default router;
