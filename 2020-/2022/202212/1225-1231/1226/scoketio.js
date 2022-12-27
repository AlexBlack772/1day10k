import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
   // options
});

io.on("connection", (socket) => {
   // ...
});

httpServer.listen(3000);

import { Server } from "socket.io";

const io = new Server({
   // options
});

io.on("connection", (socket) => {
   // ...
});

io.listen(3000);

//server.adapter([value])とは、socket.ioのデフォルトのadapterを変更するためのメソッドです。
//デフォルトでは、socket.ioはメモリ上にデータを保存するため、複数のサーバーを構築する場合、データを共有する必要があります。
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const io = new Server();

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

// redis@3
io.listen(3000);

// redis@4
Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
   io.listen(3000);
});

//server.attach(httpServer[, options])とは、socket.ioのサーバーをhttpサーバーに接続するためのメソッドです。
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server();

io.attach(httpServer);

io.on("connection", (socket) => {
   // ...
});

httpServer.listen(3000);

//server.attach(port[, options])とは、socket.ioのサーバーを指定したポートに接続するためのメソッドです。
import { Server } from "socket.io";

const io = new Server();

io.attach(3000);

io.on("connection", (socket) => {
   // ...
});

//server.attachApp(app[, options])とは、socket.ioのサーバーをexpressアプリケーションに接続するためのメソッドです。
import { App } from "uWebSockets.js";
import { Server } from "socket.io";

const app = new App();
const io = new Server();

io.attachApp(app);

io.on("connection", (socket) => {
   // ...
});

app.listen(3000, (token) => {
   if (!token) {
      console.warn("port already in use");
   }
});

//server.bind(engine)とは、socket.ioのサーバーを指定したエンジンに接続するためのメソッドです。
import { Server } from "socket.io";
import { Server as Engine } from "engine.io";

const engine = new Engine();
const io = new Server();

io.bind(engine);

engine.listen(3000);

//server.disconnectSockets([close])とは、socket.ioのサーバーに接続している全てのクライアントを切断するためのメソッドです。
// make all Socket instances disconnect
io.disconnectSockets();

// make all Socket instances in the "room1" room disconnect (and close the low-level connection)
io.in("room1").disconnectSockets(true);

//server.fetchSockets()とは、socket.ioのサーバーに接続している全てのクライアントを取得するためのメソッドです。
// get all Socket instances
// return all Socket instances of the main namespace
const sockets = await io.fetchSockets();

// return all Socket instances in the "room1" room of the main namespace
const sockets = await io.in("room1").fetchSockets();

io.on("connection", (socket) => {
   const userId = computeUserId(socket);

   socket.join(userId);

   socket.on("disconnect", async () => {
      const sockets = await io.in(userId).fetchSockets();
      if (socket.length === 0) {
         // no more active connections for the given user
      }
   });
});

const dynamicNsp = io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {
   const newNamespace = socket.nsp; // newNamespace.name === "/dynamic-101"

   // broadcast to all clients in the given sub-namespace
   newNamespace.emit("hello");
});

// client-side
const socket = io("/dynamic-101");

// broadcast to all clients in each sub-namespace
dynamicNsp.emit("hello");

// use a middleware for each sub-namespace
dynamicNsp.use((socket, next) => { /* ... */ });

//server.of([name])とは、socket.ioのサーバーに接続している全てのクライアントを取得するためのメソッドです。

//server.on(eventName, listener)とは、socket.ioのサーバーに接続している全てのクライアントを取得するためのメソッドです。
