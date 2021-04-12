const mongoose = require("mongoose");

const taskSchema
 = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    projectId: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    taskCompleted: {
      type: Boolean,
      default: false,
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
module.exports = mongoose.model("tasks", taskSchema);
