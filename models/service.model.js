import mongoose from "mongoose";
const schema = mongoose.Schema;

const locationSchema = new schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const availabilitySchema = new schema(
  {
    day: {
      type: String,
      require: true,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    },
    startTime: { type: Date, require: true },
    EndDate: { type: Date, require: true },
  },
  { _id: false }
);

const serviceSchema = new schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    default_location: locationSchema,
    availability: [availabilitySchema],
    price: { type: Number, required: true },
    image: { type: String },
    mobility: { type: Boolean, default: false },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
      },
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Services", serviceSchema);
