import mongoose from "mongoose";
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["admin", "staff", "guest"],
    required: true,
    unique: true,
  },
});

export default mongoose.model("Group", groupSchema);
