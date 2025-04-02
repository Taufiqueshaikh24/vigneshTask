import mongoose from "mongoose";

const ShortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true, required: true },
  shortUrl: { type: String, unique: true, required: true },
  qrCode: { type: String }, // Base64 QR code string
  visits: { type: Number, default: 0 },
},{timestamps:true});

const shortUrl =  mongoose.models.ShortUrl || mongoose.model("ShortUrl", ShortUrlSchema);

export default shortUrl