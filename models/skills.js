const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  skill_id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  skill_name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  skill_group_id: {
    type: String,
    trim: true,
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

const Skills = mongoose.model("skills", skillSchema);

module.exports = Skills;
