const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost/blogDB", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    (err) => {
      if (err) throw err.message;
      process.exit(1);
    };
  }
};

module.exports = connectDb;
