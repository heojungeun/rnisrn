import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import { Socket } from "dgram";

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

//app.listen(3000, handleListen); 
const server = http.createServer(app);
const wss = new WebSocketServer({server}); 

const sockets = [];

// socket 연결된 브라우저 
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "AAA";
    console.log("Connected to Browser");
    socket.on("close", () => console.log("DisConnected from the browser"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch(message.type){
            case "newMessage":
                sockets.forEach(aSocket => {
                    aSocket.send(`${socket.nickname}: ${message.payload.toString("utf-8")}`);
                });
            case "nickname":
                socket["nickname"] = message.payload;
            
        }
        
    })
});

server.listen(3000, handleListen); 
