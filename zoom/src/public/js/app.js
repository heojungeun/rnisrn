const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
// frontsocket 서버와의 연결
const frontsocket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

frontsocket.addEventListener("open", () => {
    console.log("Connected to Server");
})

frontsocket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

frontsocket.addEventListener("close", () => {
    console.log("Closed from server");
});

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    frontsocket.send(makeMessage("newMessage", input.value));
    const li = document.createElement("li");
    li.innerText = `You: ${input.value}`;
    messageList.append(li);
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    frontsocket.send(makeMessage("nickname",input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit)