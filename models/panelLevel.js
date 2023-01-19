const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(
  mongoose,
);

const panelLevelSchema = mongoose.Schema({
  // _id: false,
  panel_level_id: {
    type: Number,
    trim: true,
    lowercase: true,
  },
  panel_level: {
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

panelLevelSchema.plugin(autoIncrement, {
  inc_field: "panel_level_id",
  start_seq: "1001",
  collection_name: "panel-level-id",
});

const panelLevel = mongoose.model(
  "panel_levels",
  panelLevelSchema,
);

module.exports = panelLevel;
