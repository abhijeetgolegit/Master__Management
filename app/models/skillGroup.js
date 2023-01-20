const mongoose = require("mongoose");

const autoIncrement = require("mongoose-sequence")(
  mongoose,
);

const skillGroupSchema = mongoose.Schema({
  candidate_role_id: {
    type: Number,
    trim: true,
    unique: true,
  },
  candidate_roles: {
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

skillGroupSchema.plugin(autoIncrement, {
  inc_field: "candidate_role_id",
  start_seq: "2000",
  collection_name: "candidate-role-id",
});

const SkillGroup = mongoose.model(
  "candidate_roles",
  skillGroupSchema,
);

module.exports = SkillGroup;
