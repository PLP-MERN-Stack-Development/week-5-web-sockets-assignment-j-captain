const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use Render's environment variable or fall back to local
    const mongoURI = process.env.MONGODB_URI || 
                     process.env.MONGO_URI_PROD || 
                     process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB connection string not configured');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;