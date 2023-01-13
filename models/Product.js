import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["main", "drinks", "salads", "desserts", "starters"],
    },
    available: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Product", productSchema);
