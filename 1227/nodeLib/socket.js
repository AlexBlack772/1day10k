//server.onconnection(socket)とは、
import { Server } from "socket.io";
import { Server as Engine } from "engine.io";

const engine = new Engine();
const io = new Server();

engine.on("connection", (socket) => {
   io.onconnection(socket);
});

engine.listen(3000);

//server.path([value])とは、server.path()で現在のパスを取得することができる。
