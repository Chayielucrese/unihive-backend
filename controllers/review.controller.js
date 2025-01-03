import { STATUS_CODES } from "../config/app.config.js";
import { getUserById } from "../services/user.service.js";
import {
  addReview,
  getAllReviews,
  findServiceReviews,
  deleteReviewById,
  updateReview,
  findReviewById,
} from "../services/review.service.js";
import { findServiceById } from "../services/service.service.js";

export const createReview = async (req, res) => {
  try {
    const reviewer = await getUserById(req.params.user_id);

    if (!reviewer)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "User does not exist" });

    if (!req.body.service || !(await findServiceById(req.body.service)))
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Service does not exist" });

    if (Object.keys(req.body).length === 0)
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "To Review, you must either comment or rate this service",
      });

    if (req.body.rating && ![1, 2, 3, 4, 5].includes(Number(req.body.rating)))
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Rating cannot be less than 1 or greater then 5" });

    const added_review = await addReview(req.body, {
      service: req.params.service_id,
    });
    return res
      .status(STATUS_CODES.OK)
      .json({ message: "Review Submited Successfully", data: added_review });
  } catch (error) {
    console.log(error, "error");

    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "An internal server error occured", error: error });
  }
};
export const viewAllReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    if (!reviews)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Not Review Found" });
    else {
      return res
        .status(STATUS_CODES.OK)
        .json({ message: "Reviews Fetch Successfully", data: reviews });
    }
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "An Internal Server Error Occured", error: error });
  }
};

export const getReviewsByService = async (req, res) => {
  try {
    const service = await findServiceById(req.params.service_id);
    console.log(service, "hello");

    if (!service)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Service Not Found" });

    const get_all_reviews = await findServiceReviews({
      service: req.params.service_id,
    });
    return res.status(STATUS_CODES.OK).json({
      message: "Reviews Fetched Successfully",
      data: get_all_reviews,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "An Internal Server Error Occurred", error: error });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const deleted_review = await deleteReviewById({ _id: req.params.id });
    if (!deleted_review)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Review does not exist" });

    return res.status(STATUS_CODES.OK).json({
      message: "Review deleted successfully !",
      data: deleted_review,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateReviewById = async (req, res) => {
  try {
    const review = await findReviewById(req.params.id);
    if (!review)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "review not found !" });
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Please fill at least a field to update." });
    }
    if (req.body.rating && ![1, 2, 3, 4, 5].includes(Number(req.body.rating)))
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Rating cannot be less than 1 or greater then 5" });

    const review_updated = await updateReview(review._id, req.body);
    return res.status(STATUS_CODES.OK).json({
      message: "review updated successfully !",
      data: review_updated,
    });
  } catch (error) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
