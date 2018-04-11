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
var MessageTypeEnum = Object.freeze({"play":1, "pause":2, "leave":3, "join":4, "update":5});

//key: sessionID
//value: array of users currently connected
var sessions = {};



//we expect a message with connection open
//incoming message contains sessionID
wss.on('connection', (ws) => {
    //connection is up
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
            //call broadcast pause
            break;
        case MessageTypeEnum.leave:
            //call leave session
            break;
        case MessageTypeEnum.join:
            //call join session
            message.userid;
            message.sessionid;
            break;
        case MessageTypeEnum.update:
            //broadcast that there has been an update to session
            //this should initiation requerying database on GUI
            break;
        default:
            //we shouldn't have gotten here
            ws.send("Can't read message type");
    }
});

function broadcast(sessionID, mode) {
}

function join(userid, sessionid) 
{
    if(sessions[sessionid] != null)
    {
        sessions[sessionid] = sessions[sessionid].push(userid);
    }
    else
    {
        sessions[sessionid] = [userid];
    }
    return true;
}

function leave(sessionID, mode) {
}

//start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
