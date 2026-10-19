const { createApp } = require("./app");

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const app = createApp();

const server = app.listen(PORT, HOST, () => {
  console.log(`===============================================`);
  console.log(`  ShopKart Backend Service Started Successfully`);
  console.log(`  Listening on: http://${HOST}:${PORT}`);
  console.log(`  Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(`  Health Check: http://${HOST}:${PORT}/api/health`);
  console.log(`  Products API: http://${HOST}:${PORT}/api/products`);
  console.log(`===============================================`);
});

// Graceful shutdown handling for container orchestrators (Kubernetes / Docker)
function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Initiating graceful shutdown...`);
  server.close(() => {
    console.log("HTTP server closed. Exiting process.");
    process.exit(0);
  });

  // Force close if connections don't drain within 10 seconds
  setTimeout(() => {
    console.error("Forcefully shutting down due to pending connections timeout.");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
