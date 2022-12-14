const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Successfully Connected");
  } catch (err) {
    console.error(err);
    process.exit(1); //exit with failure
  }
};

module.exports = connectDB;
