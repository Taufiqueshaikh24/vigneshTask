// const mongoose = require("mongoose");

// const fileSchema = new mongoose.Schema({
//   filename: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Reference to the User who uploaded the file
//     required: true,
//   },
//   metadata: {
//     password: {
//       type: String, // Password for accessing the file
//       required: true,
//     },
//     color: {
//       type: String, // Color associated with the file (for security purposes)
//       required: true,
//     },
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   fileId: {
//     type: mongoose.Schema.Types.ObjectId, // Reference to the GridFS file
//     required: true,
//   },
// },{timestamps:true});

// module.exports = mongoose.model("File", fileSchema);







// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    gridFsId: { type: mongoose.Schema.Types.ObjectId, required: true },
    password: { type: String,  sparse:true }, // ✅ Store password only when sharing
    color: { type: String, sparse:true},
  },
  { timestamps: true }
);

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;