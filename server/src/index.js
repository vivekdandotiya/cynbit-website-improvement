require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Initialize Database (MongoDB Atlas or transparent Demo In-Memory mode)
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  🚀 Cynbit Technologies API Server Running`);
    console.log(`  🌐 Port: ${PORT}`);
    console.log(`  🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  🩺 Health: http://localhost:${PORT}/api/health`);
    console.log(`  📋 Services: http://localhost:${PORT}/api/services`);
    console.log(`=======================================================`);
  });

  // Graceful shutdown handling
  const handleShutdown = (signal) => {
    console.log(`\n[Server] Received ${signal}. Closing HTTP server gracefully...`);
    server.close(() => {
      console.log('[Server] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer().catch(err => {
  console.error('[Server Startup Error]', err);
  process.exit(1);
});
