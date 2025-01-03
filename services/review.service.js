import reviewModel from "../models/review.model.js";

export const addReview = async (value) => {
  return await reviewModel.create(value);
};

export const findReviewById = async (id) => {
  return await reviewModel.findById(id);
};
export const getAllReviews = async () => {
  return await reviewModel.find();
};
export const findServiceReviews = async (filter) => {
  return await reviewModel.find(filter);
};
export const deleteReviewById = async (id) => {
  return await reviewModel.findByIdAndDelete(id);
};
export const updateReview = async (id, value) => {
  return await reviewModel.findByIdAndUpdate(id, value);
};
