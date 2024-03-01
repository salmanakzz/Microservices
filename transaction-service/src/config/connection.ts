import mongoose from "mongoose";

const connect = function (callback: (err?: any) => void) {
  const DB_URL: string = process.env.MONGODB_URL || "";

  mongoose.connect(DB_URL);

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    callback(err);
  });

  db.once("open", () => {
    callback();
  });
};

export default connect;
