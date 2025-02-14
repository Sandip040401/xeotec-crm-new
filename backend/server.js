const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./common/config/socket");

const server = http.createServer(app);

// Initialize WebSocket
initializeSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
