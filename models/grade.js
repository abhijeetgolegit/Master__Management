const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(
  mongoose,
);

const gradeSchema = mongoose.Schema({
  grade_id: {
    type: Number,
    trim: true,
    unique: true,
  },
  grade: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  created_by: {
    type: String,
    trim: true,
    lowercase: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: String,
    trim: true,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
  is_deleted: {
    type: Boolean,
  },
  deleted_by: {
    type: String,
    trim: true,
  },
  deleted_on: {
    type: Date,
    default: Date.now,
  },
});

gradeSchema.plugin(autoIncrement, {
  inc_field: "grade_id",
  start_seq: "4000",
  collection_name: "grade-id",
});

const grade = mongoose.model("grades", gradeSchema);

module.exports = grade;
