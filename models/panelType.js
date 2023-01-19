const mongoose = require("mongoose");

const panelTypeSchema = mongoose.Schema({
  panel_type_id: {
    type: Number,
    trim: true,
    unique: true,
    required: true,
  },
  panel_type: {
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

const panelType = mongoose.model(
  "panel-type",
  panelTypeSchema,
);

module.exports = panelType;
