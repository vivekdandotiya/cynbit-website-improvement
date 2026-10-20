const mongoose = require('mongoose');

let isConnected = false;
let isDemoMode = true;

/**
 * Connect to MongoDB Atlas if URI is provided, otherwise fallback gracefully to In-Memory Demo Mode.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.log('[Database] No MONGODB_URI provided. Running in Demo Persistence Mode (In-Memory).');
    isConnected = false;
    isDemoMode = true;
    return { isConnected: false, isDemoMode: true };
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    isDemoMode = false;
    console.log(`[Database] MongoDB Atlas Connected successfully: ${conn.connection.host}`);
    return { isConnected: true, isDemoMode: false, host: conn.connection.host };
  } catch (error) {
    console.warn(`[Database] MongoDB connection failed (${error.message}). Falling back to In-Memory Demo Mode.`);
    isConnected = false;
    isDemoMode = true;
    return { isConnected: false, isDemoMode: true, error: error.message };
  }
}

function getDatabaseStatus() {
  return {
    connected: isConnected,
    mode: isDemoMode ? 'Demo In-Memory Mode (No external database required)' : 'MongoDB Atlas Connected',
    isDemoMode
  };
}

module.exports = {
  connectDB,
  getDatabaseStatus
};
