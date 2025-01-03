import * as reviewController from "../controllers/review.controller.js";
import express from "express";

const router = express.Router();

router.route("/:user_id").post(reviewController.createReview);
router.route("/").get(reviewController.viewAllReviews);
router.route("/:service_id").get(reviewController.getReviewsByService);
router
  .route("/:id")
  .delete(reviewController.deleteReview)
  .put(reviewController.updateReviewById);
export default router;
