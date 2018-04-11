const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const successful = {"success" : true};
var MessageTypeEnum = Object.freeze({"play":1, "pause":2, "leave":3, "join":4, "":5})

//we expect a message with connection open
//incoming message contains sessionID
wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received sessionID and send a "success" message to the client
        console.log('received: %s', message);
        ws.send(successful);
    });
});


ws.on('message', (message) => {
    //message contains one type of message
    switch (message.type) {
        case MessageTypeEnum.play:
        case MessageTypeEnum.pause:
            //call broaast pause
            break;
        case MessageTypeEnum.leave:
            //call leave session
            break;
        case MessageTypeEnum.join:
            //call join session
            break;
        default:
            //we shouldn't have gotten here
            ws.send("Can't read message type");
    }
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
});

function broadcast(sessionID, mode) {
  console.log(myNickname);
  console.log(myCurrentPage);
  console.log(mySessionID);
}

//start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
