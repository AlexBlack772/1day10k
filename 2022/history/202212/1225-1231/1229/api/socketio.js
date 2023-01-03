//server.in()とは、指定したルームに入っているクライアントに対してのみイベントを送信するメソッド
// disconnect all clients in the "room-101" room
io.in("room-101").disconnectSockets();

//server.listen()とは、サーバーを起動するメソッド
const adminNamespace = io.of("/admin");

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

//server.of()とは、名前空間を作成するメソッド
ServiceWorkerRegistration.of("/admin").then((registration) => {
   // ...
}
)

//server.onconnection(socket)とは、接続されたクライアントの情報を取得するメソッド
import { Server } from "socket.io";
import { Server as Engine } from "engine.io";

const engine = new Engine();
const io = new Server();

engine.on("connection", (socket) => {
   io.onconnection(socket);
});

engine.listen(3000);

//server.path([path])とは、クライアント側で接続する際のパスを指定するメソッド
import { Server } from "socket.io";

const io = new Server();

io.path("/myownpath/");

//server.serveClient([serve])とは、クライアント側のコードを提供するかどうかを指定するメソッド
import { Server } from "socket.io";

const io = new Server();

io.serveClient(false);

io.listen(3000);

import { Server } from "socket.io";

const io = new Server();

io.serveClient(false);

io.listen(3000);

//server.serverSideEmit([flag])とは、サーバー側でクライアントにイベントを送信するかどうかを指定するメソッド

// server A
io.serverSideEmit("ping", (err, responses) => {
   console.log(responses[0]); // prints "pong"
});

// server B
io.on("ping", (cb) => {
   cb("pong");
});


//serverSideEmitとは、サーバー側でクライアントにイベントを送信するかどうかを指定するメソッド
io.serverSideEmit("ping", (err, responses) => {
   if (err) {
      // at least one Socket.IO server has not responded
      // the 'responses' array contains all the responses already received though
   } else {
      // success! the 'responses' array contains one object per other Socket.IO server in the cluster
   }
});

//server.socketsJoin(rooms)とは、指定したルームにクライアントを追加するメソッド
// make all Socket instances join the "room1" room
io.socketsJoin("room1");

// make all Socket instances in the "room1" room join the "room2" and "room3" rooms
io.in("room1").socketsJoin(["room2", "room3"]);

// this also works with a single socket ID
io.in(theSocketId).socketsJoin("room1");

//server.socketsLeave(rooms)とは、指定したルームからクライアントを削除するメソッド
// make all Socket instances leave the "room1" room
io.socketsLeave("room1");

// make all Socket instances in the "room1" room leave the "room2" and "room3" rooms
io.in("room1").socketsLeave(["room2", "room3"]);

// this also works with a single socket ID
io.in(theSocketId).socketsLeave("room1");

//server.to(room)とは、指定したルームに入っているクライアントに対してのみイベントを送信するメソッド
// the “foo” event will be broadcast to all connected clients in the “room-101” room
io.to("room-101").emit("foo", "bar");

// with an array of rooms (a client will be notified at most once)
io.to(["room-101", "room-102"]).emit("foo", "bar");

// with multiple chained calls
io.to("room-101").to("room-102").emit("foo", "bar");

//namespace.adapter.remoteJoin(socketId, room, callback)とは、指定したルームにクライアントを追加するメソッド
const adapter = io.of("/my-namespace").adapter;

adapter.remoteJoin(socketId, room, (
   err: Error | undefined,
   success: boolean
) => {
   // success is true if the socket has been added to the room
}
)

//namespace.allSockets()とは、接続されているクライアントのIDを取得するメソッド
// all sockets in the main namespace
const ids = await io.allSockets();

// all sockets in the main namespace and in the "user:1234" room
const ids = await io.in("user:1234").allSockets();

// all sockets in the "chat" namespace
const ids = await io.of("/chat").allSockets();

// all sockets in the "chat" namespace and in the "general" room
const ids = await io.of("/chat").in("general").allSockets();

//namespace.disconnectSockets([close])とは、接続されているクライアントを切断するメソッド
// make all Socket instances disconnect
io.disconnectSockets();

// make all Socket instances in the "room1" room disconnect (and discard the low-level connection)
io.in("room1").disconnectSockets(true);

// make all Socket instances in the "room1" room of the "admin" namespace disconnect
io.of("/admin").in("room1").disconnectSockets();

// this also works with a single socket ID
io.of("/admin").in(theSocketId).disconnectSockets();

//namespace.fetchSockets()とは、接続されているクライアントの情報を取得するメソッド
// make all Socket instances disconnect
io.disconnectSockets();

// make all Socket instances in the "room1" room disconnect (and discard the low-level connection)
io.in("room1").disconnectSockets(true);

// make all Socket instances in the "room1" room of the "admin" namespace disconnect
io.of("/admin").in("room1").disconnectSockets();

// this also works with a single socket ID
io.of("/admin").in(theSocketId).disconnectSockets();

//namespace.except(rooms)とは、指定したルームに入っていないクライアントに対してのみイベントを送信するメソッド
const myNamespace = io.of("/my-namespace");

// the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
myNamespace.except("room-101").emit("foo", "bar");

// with an array of rooms
myNamespace.except(["room-101", "room-102"]).emit("foo", "bar");

// with multiple chained calls
myNamespace.except("room-101").except("room-102").emit("foo", "bar");

//namespace.in(room)とは、指定したルームに入っているクライアントに対してのみイベントを送信するメソッド
const myNamespace = io.of("/my-namespace");

//namespace.fetchSockets()とは、接続されているクライアントの情報を取得するメソッド
