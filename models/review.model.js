import mongoose from "mongoose";
const schema = mongoose.Schema;
const reviewSchema = new schema(
  {
    comment: { type: String, require: true },
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reviews", reviewSchema);
