import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: true,
});


// CONNECTION SUCCESS
socket.on("connect", () => {
  console.log("SOCKET CONNECTED:", socket.id);
});


// CONNECTION ERROR
socket.on("connect_error", (error) => {
  console.log("SOCKET ERROR:", error.message);
});


export default socket;