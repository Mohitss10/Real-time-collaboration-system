// const app = require("./src/app");

// const http = require("http");

// const path = require("path");

// const { Server } = require("socket.io");


// // CREATE HTTP SERVER
// const server = http.createServer(app);


// //SOCKET SERVER
// // const io = new Server(server, {
// //   cors: {
// //     origin: "https://nexuss-real-time-collaboration-system.onrender.com",
// //     methods: ["GET", "POST"],
// //   },
// // });


// const isProduction = process.env.NODE_ENV === "production";

// const io = new Server(server, {
//   cors: {
//     origin: isProduction
//       ? "https://nexuss-real-time-collaboration-system.onrender.com"
//       : "http://localhost:5173", // Vite dev server
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });




// // ONLINE USERS STORE
// const onlineUsers = new Map();


// // SOCKET CONNECTION
// io.on("connection", (socket) => {

//   console.log(
//     "USER CONNECTED:",
//     socket.id
//   );


//   // =========================
//   // USER ONLINE
//   // =========================
//   socket.on("user_online", (userId) => {

//     onlineUsers.set(userId, socket.id);

//     io.emit(
//       "online_users",
//       Array.from(onlineUsers.keys())
//     );

//     console.log(
//       "ONLINE USERS:",
//       Array.from(onlineUsers.keys())
//     );
//   });


//   // =========================
//   // JOIN PROJECT ROOM
//   // =========================
//   socket.on("join_project", (projectId) => {

//     socket.join(projectId);

//     console.log(
//       `USER JOINED ROOM: ${projectId}`
//     );
//   });


//   // =========================
//   // SEND MESSAGE
//   // =========================
//   socket.on("send_message", (message) => {

//     io.to(message.projectId).emit(
//       "receive_message",
//       message
//     );

//     console.log(
//       "MESSAGE SENT:",
//       message.text
//     );
//   });


//   // =========================
//   // TYPING INDICATOR
//   // =========================
//   socket.on("typing", (data) => {

//     socket
//       .to(data.projectId)
//       .emit(
//         "user_typing",
//         data.name
//       );
//   });


//   // =========================
//   // DISCONNECT
//   // =========================
//   socket.on("disconnect", () => {

//     console.log(
//       "USER DISCONNECTED:",
//       socket.id
//     );

//     // REMOVE OFFLINE USER
//     for (let [key, value] of onlineUsers.entries()) {

//       if (value === socket.id) {

//         onlineUsers.delete(key);
//       }
//     }

//     io.emit(
//       "online_users",
//       Array.from(onlineUsers.keys())
//     );
//   });

// });


// // START SERVER
// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {

//   console.log(
//     `Server Running on Port ${PORT}`
//   );
// });



const app = require("./src/app");

const http = require("http");

const path = require("path");

const { Server } = require("socket.io");


// CREATE HTTP SERVER
const server = http.createServer(app);


//SOCKET SERVER
const io = new Server(server, {
  cors: {
    origin: "https://nexuss-real-time-collaboration-system.onrender.com",
    methods: ["GET", "POST"],
  },
});


const isProduction = process.env.NODE_ENV === "production";

const io = new Server(server, {
  cors: {
    origin: isProduction
      ? "https://nexuss-real-time-collaboration-system.onrender.com"
      : "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"],
    credentials: true,
  },
});




// ONLINE USERS STORE
const onlineUsers = new Map();


// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log(
    "USER CONNECTED:",
    socket.id
  );


  // =========================
  // USER ONLINE
  // =========================
  socket.on("user_online", (userId) => {

    onlineUsers.set(userId, socket.id);

    io.emit(
      "online_users",
      Array.from(onlineUsers.keys())
    );

    console.log(
      "ONLINE USERS:",
      Array.from(onlineUsers.keys())
    );
  });


  // =========================
  // JOIN PROJECT ROOM
  // =========================
  socket.on("join_project", (projectId) => {

    socket.join(projectId);

    console.log(
      `USER JOINED ROOM: ${projectId}`
    );
  });


  // =========================
  // SEND MESSAGE
  // =========================
  socket.on("send_message", (message) => {

    io.to(message.projectId).emit(
      "receive_message",
      message
    );

    console.log(
      "MESSAGE SENT:",
      message.text
    );
  });


  // =========================
  // TYPING INDICATOR
  // =========================
  socket.on("typing", (data) => {

    socket
      .to(data.projectId)
      .emit(
        "user_typing",
        data.name
      );
  });


  // =========================
  // DISCONNECT
  // =========================
  socket.on("disconnect", () => {

    console.log(
      "USER DISCONNECTED:",
      socket.id
    );

    // REMOVE OFFLINE USER
    for (let [key, value] of onlineUsers.entries()) {

      if (value === socket.id) {

        onlineUsers.delete(key);
      }
    }

    io.emit(
      "online_users",
      Array.from(onlineUsers.keys())
    );
  });

});


// START SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server Running on Port ${PORT}`
  );
});