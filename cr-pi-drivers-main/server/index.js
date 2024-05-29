const axios = require("axios");
const server = require("./src/server");
const PORT = 3001;
const { conn } = require('./src/db');

conn.sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
    process.exit(1); // Terminar el proceso de Node.js con un código de error
  });

// Manejo de errores para cualquier error no manejado
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1); // Terminar el proceso de Node.js con un código de error
});

// Manejo de errores para cualquier error no capturado
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Terminar el proceso de Node.js con un código de error
});
