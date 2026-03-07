import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/testDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));