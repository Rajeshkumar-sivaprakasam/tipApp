const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajesh:Test123@tipapp.8grqsfi.mongodb.net/tipapp",
      // "mongodb+srv://rajesh:Test#123@tipapp.8grqsfi.mongodb.net/tipapp",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
