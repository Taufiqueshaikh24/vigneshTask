const mongoose = require("mongoose");

const sharedLinkSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File", // Reference to the File being shared
    required: true,
  },
  shareLink: {
    type: String,
    required: true, // The unique link generated for file access
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date, // Link expiration time
    required: true,
  },
  password: {
    type: String,
    required: true, // Password required to access the file
  },
});

module.exports = mongoose.model("SharedLink", sharedLinkSchema);
