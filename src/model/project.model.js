const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    technology: {
      type: String,
      required: true,
      trim: true,
    },
    // managerId: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // clientId: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    projectCompleted: {
      type: Boolean,
      default: false,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
    toJSON: { virtuals: true },
  }
);
module.exports = mongoose.model("projects", projectSchema);
