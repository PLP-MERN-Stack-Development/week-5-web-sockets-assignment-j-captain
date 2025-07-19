const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Choose the correct URI based on environment
    const mongoURI = process.env.MONGO_URI || 
      (process.env.NODE_ENV === 'production' 
        ? process.env.MONGO_URI_PROD 
        : process.env.MONGO_URI_DEV);

    if (!mongoURI) {
      throw new Error(`
        MongoDB URI is missing. Set one of these in .env:
        - MONGO_URI (universal)
        - MONGO_URI_DEV (development)
        - MONGO_URI_PROD (production)
      `);
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log();
    console.log('✅ Success!! Connected to MongoDB');
    console.log(`🔗 Using: ${mongoURI.includes('localhost') ? 'Local DB' : 'Production DB'}`);
  } catch (error) {
    console.log();
    console.error(`❌ Sorry!! MongoDB connection Error: ${error.message}`);
    console.log();
    process.exit(1);
  }
};

module.exports = connectDB;