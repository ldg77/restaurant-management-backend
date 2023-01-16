import mongoose from "mongoose";
const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    bookedFrom: {
      type: Date,
    },
    bookedTill: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);

Table.watch().on("change", (data) => {
  console.log(data.updateDescription);
});

export default Table;
