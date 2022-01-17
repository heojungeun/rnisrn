const socket = io();

const welcome = document.getElementById("welcome");
const enterform = document.getElementById("enterRoom");
const nameForm = document.getElementById("name");
const room = document.getElementById("room");

room.hidden = true;

let roomName;
let nickName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    }); 
    input.value = "";
}

function handleNameSubmit(event){
    event.preventDefault();
    const input = nameForm.querySelector("input");
    const value = input.value;
    nickName = value;
    socket.emit("nickname", value);
    input.value = "";
}

function showRoom(msg) {
    welcome.hidden = true;
    room.hidden = false;
    const h3title = room.querySelector('h3');
    h3title.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    msgForm.addEventListener("submit",handleMessageSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = enterform.querySelector("input");
    if(nickName === undefined){
        alert("nickName을 입력해주세요.");
    }else{
        socket.emit("enter_room", 
            input.value,
            nickName,
            showRoom
        );
        roomName = input.value;
        input.value = "";
    }
}

enterform.addEventListener("submit", handleRoomSubmit);
nameForm.addEventListener("submit",handleNameSubmit);

socket.on("welcome", (user, newCount) => {
    const h3title = room.querySelector('h3');
    h3title.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} joined!`);
})

socket.on("bye", (user, newCount) => {
    const h3title = room.querySelector('h3');
    h3title.innerText = `Room ${roomName} (${newCount})`;
    addMessage(`${user} left`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector('ul');
    roomList.innerText = "";
    if(rooms.length === 0){
        return;
    }
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    })
});