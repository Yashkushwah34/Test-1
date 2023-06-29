import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    total_cholestrol: {
      type: Number,
      required: [true, "Please provide total cholestrol"],
    },
    hdl_cholestrol: {
      type: Number,
      required: [true, "Please provide HDL cholestrol"],
    },
    vldl: {
      type: Number,
      required: [true, "Please provide VLDL"],
    },
    ldl_cholestrol: {
      type: Number,
      required: [true, "Please provide LDL cholestrol"],
    },
    non_hdl_cholestrol: {
      type: Number,
      required: [true, "Please provide Non-HDL cholestrol"],
    },
    triglycerides: {
      type: Number,
      required: [true, "Please provide Triglycerides"],
    },
    total_cholestrol_hdl_ratio: {
      type: Number,
      required: [true, "Please provide Total Cholestrol HDL Ratio"],
    },
    tg_hdl_ratio: {
      type: Number,
      required: [true, "Please provide TG HDL Ratio"],
    },
    save_as_draft: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    document: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Report = mongoose.model("report", reportSchema);

export default Report;
