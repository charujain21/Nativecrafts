import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    mongoose.connection.on('error', (err) => console.error(`Database Error: ${err.message}`));

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection successful");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;