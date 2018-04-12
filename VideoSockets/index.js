const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });



//variables
var successful = {"success" : true};
var MessageTypeEnum = Object.freeze({"play":1, "pause":2, "leave":3, "join":4, "update":5, "newconnection":6});
var CLIENTS = {};
var SESSIONS = {};

wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
        ws.on('message', (theMessage) => {
        message = JSON.parse(theMessage);
        console.log(message);
        console.log(message.type);
        switch (message.type){
            case "newconnection":
                ws.send("you're a new connection");
                createNewConnection(ws,message.sessionID,message.userID);
                broadcastUpdateGUI(message.sessionID);
                break;
            case "update":
                break;
            default:
                ws.send("how did you get here..?");
        }
        //log the received message and send it back to the client
    });
});


function createNewConnection(ws,sessionID,userID) {
        //store the userID and sessionID
        CLIENTS[userID] = ws;
        if(sessionID in SESSIONS) {
            SESSIONS[sessionID] = SESSIONS[sessionID].push(ws);
        }
        else {
            SESSIONS[sessionID] = [ws];
        }
}
function broadcastUpdateGUI(sessionID) {
    var clients = SESSIONS[sessionID];
    for (var i=0; i<clients.length; i++) {
        clients[i].send("updateAlert");
    }
}

//start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
