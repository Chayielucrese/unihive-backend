import * as authControllers from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/adminLogin").post(authControllers.adminLogin);
router.route("/forgot-password").post(authControllers.forgotPassword);
router
  .route("/verify-account")
  .post(authControllers.sendAccountVerificationCode);

export default router;
