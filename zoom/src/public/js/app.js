//import WebSocket = require("ws");
// frontsocket 서버와의 연결
const frontsocket = new WebSocket(`ws://${window.location.host}`);