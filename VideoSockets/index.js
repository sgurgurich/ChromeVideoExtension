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
var CLIENTS = {};
var SESSIONS = {};

wss.on('connection', (ws) => {
        ws.on('message', (theMessage) => {
            message = JSON.parse(theMessage);
            console.log(theMessage+"\n");
            switch (message.type){
                case "newconnection":
                    createNewConnection(ws,message.sessionID,message.userID);
                    broadcastToSession("updateAlert", message.sessionID);
                    break;
                case "leave":
                    closeConnection(message.sessionID, message.userID);
                    break;
                case "play":
                    broadcastToSession("play", message.sessionID);
                    break;
                case "pause":
                    broadcastToSession("pause", message.sessionID);
                    break;
                case "restart":
                    broadcastToSession("restart", message.sessionID);
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
            SESSIONS[sessionID].push(ws);
        }
        else {
            SESSIONS[sessionID] = [ws];
        }
}

function broadcastToSession(message, sessionID) {
    
    var clients = SESSIONS[sessionID];
    for (var i=0; i<clients.length; i++) {
        clients[i].send(message);
    }
}
function closeConnection(sessionID, userID) {
    var ws = CLIENTS[userID];
    var clients = SESSIONS[sessionID];
    if(clients != null) {
        clients.pop(ws);
    }
    if(ws != null){
        ws.close();
    }
    broadcastToSession("updateAlert", sessionID);
}

//start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
