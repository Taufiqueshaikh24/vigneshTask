const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User who uploaded the file
    required: true,
  },
  metadata: {
    password: {
      type: String, // Password for accessing the file
      required: true,
    },
    color: {
      type: String, // Color associated with the file (for security purposes)
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the GridFS file
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model("File", fileSchema);
