import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";

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

// bksocket 연결된 브라우저 
function handleConnection(bksocket){
    console.log(bksocket);
}

wss.on("connection", handleConnection)

server.listen(3000, handleListen); 