const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(
  mongoose,
);

const roleSchema = mongoose.Schema({
  role_id: {
    type: Number,
    trim: true,
    // unique: true,
  },
  role_name: {
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

roleSchema.plugin(autoIncrement, {
  inc_field: "role_id",
  start_seq: "1001",
  collection_name: "role-id",
});

const role = mongoose.model("roles", roleSchema);

module.exports = role;
