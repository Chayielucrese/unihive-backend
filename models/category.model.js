import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: [3, "Name must be atleat 3 letters long"],
    },
    state: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Categories", categorySchema);
