const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

let myDataChannel;

const call = document.getElementById('call');

call.hidden = true;

async function getCameras(){
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        const curCamera = myStream.getVideoTracks()[0];
        cameras.forEach(camera => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if(curCamera.label === camera.label){
                option.selected = true;
            }
            camerasSelect.appendChild(option);
        });
    }catch(e){
        console.log(e);
    }
}

async function getMedia(deviceId){
    const initialConstraints ={
        audio: true,
        video: {facingMode: "user"},
    };
    const cameraConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } },
    };
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId? cameraConstraints : initialConstraints
        );
        myFace.srcObject = myStream;
        if(!deviceId){
            await getCameras();
        }
    }catch (e){
        console.log(e);
    }
}

function handleMuteClick(){
    myStream.getAudioTracks().forEach(track => {
       track.enabled = !track.enabled; 
    });
    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
    }else{
        muteBtn.innerText = "Mute";
        muted = false;
    }
}
function handleCameraClick(){
    myStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled; 
     });
    if(!cameraOff){
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }else{
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    }
}

async function handleCameraChange(){
    await getMedia(camerasSelect.value);
    if(myPeerConnection){
        const videoTrack = myStream.getVideoTracks()[0];
        const videoSender = myPeerConnection
                                .getSenders()
                                .find(sender => sender.track.kind === "video");
        videoSender.replaceTrack(videoTrack);
        console.log(videoSender);
    }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// Welcome Form
const welcome = document.getElementById('welcome');
welcomeForm = welcome.querySelector('form');

async function initCall() {
    welcome.hidden = true;
    call.hidden = false;
    await getMedia();
    makeConnection();
}

async function handleWelcomeSubmit(event){
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    await initCall();
    socket.emit("join_room", input.value);
    roomName = input.value;
    input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket Code

socket.on("welcome", async () => {
    // offer 생성
    myDataChannel = myPeerConnection.createDataChannel("chat");
    myDataChannel.addEventListener("message", (event) => console.log(event.data));
    console.log("made data channel");
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("sent the offer");
    socket.emit("offer", offer, roomName);
})

socket.on("offer", async(offer) => {
    // offer 받는 쪽
    myPeerConnection.addEventListener("datachannel", (event) => {
        myDataChannel = event.channel;
        myDataChannel.addEventListener("message", (event) => console.log(event.data));
    });
    console.log("receive the offer");
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, roomName);
    console.log("sent the answer");
})

socket.on("answer", answer => {
    console.log("receive the answer");
    myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", ice => {
    console.log("received candidate");
    myPeerConnection.addIceCandidate(ice);
})

// RTC Code

function makeConnection(){
    myPeerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: [ // 공용 주소를 알기 위한 stun 서버 (구글 제공)
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:19302",
                    "stun:stun4.l.google.com:19302",
                ],
            },
        ],
    });
    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("track", handleTrack);
    myStream
        .getTracks()
        .forEach(track => {myPeerConnection.addTrack(track, myStream)});
}

function handleIce(data){
    console.log("sent candidate");
    socket.emit("ice", data.candidate, roomName);
}

function handleTrack(data){
    const peerFace = document.getElementById("peerFace");
    peerFace.srcObject = data.streams[0];
}

// chatting part
// =====================================================================
// const welcome = document.getElementById("welcome");
// const enterform = document.getElementById("enterRoom");
// const nameForm = document.getElementById("name");
// const room = document.getElementById("room");

// room.hidden = true;

// let roomName;
// let nickName;

// function addMessage(message){
//     const ul = room.querySelector("ul");
//     const li = document.createElement("li");
//     li.innerText = message;
//     ul.appendChild(li);
// }

// function handleMessageSubmit(event){
//     event.preventDefault();
//     const input = room.querySelector("#msg input");
//     const value = input.value;
//     socket.emit("new_message", input.value, roomName, () => {
//         addMessage(`You: ${value}`);
//     }); 
//     input.value = "";
// }

// function handleNameSubmit(event){
//     event.preventDefault();
//     const input = nameForm.querySelector("input");
//     const value = input.value;
//     nickName = value;
//     socket.emit("nickname", value);
//     input.value = "";
// }

// function showRoom(msg) {
//     welcome.hidden = true;
//     room.hidden = false;
//     const h3title = room.querySelector('h3');
//     h3title.innerText = `Room ${roomName}`;
//     const msgForm = room.querySelector("#msg");
//     msgForm.addEventListener("submit",handleMessageSubmit);
// }

// function handleRoomSubmit(event) {
//     event.preventDefault();
//     const input = enterform.querySelector("input");
//     if(nickName === undefined){
//         alert("nickName을 입력해주세요.");
//     }else{
//         socket.emit("enter_room", 
//             input.value,
//             nickName,
//             showRoom
//         );
//         roomName = input.value;
//         input.value = "";
//     }
// }

// enterform.addEventListener("submit", handleRoomSubmit);
// nameForm.addEventListener("submit",handleNameSubmit);

// socket.on("welcome", (user, newCount) => {
//     const h3title = room.querySelector('h3');
//     h3title.innerText = `Room ${roomName} (${newCount})`;
//     addMessage(`${user} joined!`);
// })

// socket.on("bye", (user, newCount) => {
//     const h3title = room.querySelector('h3');
//     h3title.innerText = `Room ${roomName} (${newCount})`;
//     addMessage(`${user} left`);
// });

// socket.on("new_message", addMessage);

// socket.on("room_change", (rooms) => {
//     const roomList = welcome.querySelector('ul');
//     roomList.innerText = "";
//     if(rooms.length === 0){
//         return;
//     }
//     rooms.forEach(room => {
//         const li = document.createElement("li");
//         li.innerText = room;
//         roomList.append(li);
//     })
// });