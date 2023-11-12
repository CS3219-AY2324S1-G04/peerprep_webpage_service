import { io } from "socket.io-client";

const SOCKET_SERVER_URL = 'http://localhost:3000';

function connect(roomId: string) {
  const socket = io(SOCKET_SERVER_URL, {
    query: {
      roomId: roomId,
    },
  })
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}

function disconnect() {
  const socket = io(SOCKET_SERVER_URL)
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    })
  })
}

function reconnect() {
  const socket = io(SOCKET_SERVER_URL)
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    })
  })
}

export default {
  connect,
  disconnect,
  reconnect,
}