// const mongoose = require("mongoose");

// const sharedLinkSchema = new mongoose.Schema({
//   fileId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "File", // Reference to the File being shared
//     required: true,
//   },
//   shareLink: {
//     type: String,
//     required: true, // The unique link generated for file access
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   expirationDate: {
//     type: Date, // Link expiration time
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true, // Password required to access the file
//   },
// });

// module.exports = mongoose.model("SharedLink", sharedLinkSchema);







const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File", // Reference to the file being shared
      required: true,
    },
    url: {
      type: String, // The generated shareable link
      required: true,
      unique: true,
    },
    accessCount: {
      type: Number, // Track how many times the file was accessed
      default: 0,
    },
    expiresAt: {
      type: Date, // Expiration date for the link (optional)
    },
  },
  { timestamps: true }
);

const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);
export default Link