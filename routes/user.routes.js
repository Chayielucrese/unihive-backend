import * as userController from "../controllers/user.controller.js";
import express from "express";
import { checkAdmin } from "../middlewares/roleCheck.middleware.js";
import { checkAuthenticated } from "../middlewares/checkAuth.middleware.js";

const router = express.Router();
router.use(checkAuthenticated);
router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser);
router.patch("/:id/disable", userController.disableUser);
router.patch("/:id/enable-account", checkAdmin, userController.activateUser);
router.patch("/:id/update-role", userController.updateUserRole);
export default router;
