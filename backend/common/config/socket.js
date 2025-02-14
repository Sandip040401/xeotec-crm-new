const socketIo = require("socket.io");

let io;
const connectedUsers = new Map(); // Store active users (userId -> socketId mapping)

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Handle base connection logic
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Register user socket
    socket.on("registerUser", (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ID: ${socket.id}`);
    });

    // Load individual socket modules
    require("../sockets/chatSocket")(io, socket, connectedUsers);
    require("../sockets/notificationSocket")(io, socket, connectedUsers);
    require("../sockets/aclSocket")(io, socket, connectedUsers);
    require("../sockets/projectSocket")(io, socket, connectedUsers);

    // Handle disconnection
    socket.on("disconnect", () => {
      connectedUsers.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
        }
      });
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
};

module.exports = { initializeSocket, getIo };
