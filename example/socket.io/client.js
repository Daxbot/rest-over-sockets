const { io } = require('socket.io-client');

const socket = io('http://localhost:3000');

const client = (require("../../lib/ROSClient.js")).socketio(socket);

socket.on("connect", ()=>{
    client.get("/widget/3444").then(response=>{
        console.log(`Response: ${JSON.stringify(response)}`);
        socket.disconnect();
    });
});

