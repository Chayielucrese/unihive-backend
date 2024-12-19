import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "complete", "disabled"],
    default: "pending",
  },
  role: {
    type: String,
    enum: ["student", "admin", "seller"],
    default: "student",
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
  },
  tel: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Users", userSchema);
