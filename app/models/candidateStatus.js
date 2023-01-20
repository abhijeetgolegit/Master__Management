const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(
  mongoose,
);

const candidateStatusSchema = mongoose.Schema({
  candidate_status_id: {
    type: Number,
    trim: true,
  },
  candidate_status: {
    type: String,
    trim: true,
    unique: true,
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

candidateStatusSchema.plugin(autoIncrement, {
  inc_field: "candidate_status_id",
  start_seq: "5000",
  collection_name: "candidates-id",
});

const candidateStatus = mongoose.model(
  "candidates_statu",
  candidateStatusSchema,
);

module.exports = candidateStatus;
