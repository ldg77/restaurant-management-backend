import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["main", "drinks", "salads", "desserts", "starters"],
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});
export default mongoose.model("Category", categorySchema);
