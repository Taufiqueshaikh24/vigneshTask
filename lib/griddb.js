const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const mongoURI = "mongodb://localhost:27017/yourdbname"; // Update with your DB name
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

module.exports = { conn, gfs };
