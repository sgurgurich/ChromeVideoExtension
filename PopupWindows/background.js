// background.js
// Stefan Gurgurich
// Zach Adam
// Trim Ballanca
// John Cutsavage
///////////////////////////////////////////////////
// SET THIS BIT TO TRUE FOR LOCAL DEVELOPMENT
var local_dev = false;
///////////////////////////////////////////////////

var myNickname;
var myUserID;
var myCurrentPage;
var mySessionID;
var myUserList = ["", "", "", "", ""];
var myVideoURL;

var ws;

function checkForUpdates() {
  console.log(myNickname);
  console.log(myCurrentPage);
  console.log(mySessionID);
  console.log(myVideoURL);
  console.log(myUserList);
}

function testLog(log) {
  console.log(log);
}

function openSessionConnection() {
  if ("WebSocket" in window) {
    ws = new WebSocket("ws://vps.bellisimospizza.com:8080");
    ws.onopen = function() {
      ws.send(JSON.stringify({
        "sessionID": mySessionID,
        "userID": myNickname,
        "type": "newconnection"
      }));
    };
  }
  // Listen for messages
  ws.addEventListener('message', function(event) {
    console.log('Message from server ', event.data);
    switch (event.data) {
      case "updateAlert":
        updateAllInfo();
        break;
      default:
        break;
    }
  });
}

function updateAllInfo(){

  getAllFromDB();

  chrome.runtime.sendMessage({
    msg: "update_URLFG",
    data: {
      subject: myVideoURL
    }
  });

  chrome.runtime.sendMessage({
    msg: "update_userlistFG",
    data: {
      subject: myUserList
    }
  });
}

function sendPlayRequest() {
  ws.send(JSON.stringify({
    "play": true
  }));
}

function sendPauseRequest() {
  ws.send(JSON.stringify({
    "pause": true
  }));
}

function sendUpdateRequest() {
  ws.send(JSON.stringify({
    "update": true
  }));
}

function addNickname() {
  $.get("http://vps.bellisimospizza.com/user/" + myNickname, function(response) {
    console.log( "success" );
    if (response.found == true) {
      myCurrentPage = "page1";
      myNickname = " ";
      chrome.runtime.sendMessage({
        msg: "nicknameError"
      });
    } else {
      console.log( "trying write" );
      $.post("http://vps.bellisimospizza.com/user/" + myNickname, function(data) {
        myUserID = data._id;
      });
      myCurrentPage = "page2";
      chrome.runtime.sendMessage({
        msg: "nicknamePass"
      });
    }
  });
}

function generateSession() {
  // Query Database for session ID
  $.get("http://vps.bellisimospizza.com/session/", function(response) {
    console.log( "success" );
    mySessionID = response.sessionId;
    $.post("http://vps.bellisimospizza.com/session/" + mySessionID, {
      nickname: myNickname
    }, function(data) {
      if (data.found) {
        for (var i = 0; i < 5; i++) {
          myUserList[i] = data.userList[i];
        }
        console.log("SUCK A DICK BOIS");
      } else {
        // TODO: send Error message to front end
      }
    });
  });



  openSessionConnection();

  // Send session info and session id to main
  chrome.runtime.sendMessage({
    msg: "update_sessionIDFG",
    data: {
      subject: mySessionID
    }
  });
}

function getAllFromDB(){
  $.get("http://vps.bellisimospizza.com/session/" + mySessionID,  function(data) {
    myUserList = data.userList;
    myVideoURL = data.videoUrl;
  });
}

function updateURL(){

  // TODO: POST Url stuff

  ws.send(JSON.stringify({
      type: "update",
      sessionID: mySessionID
    }));
}

function goToURL(){
  if (myVideoURL != null){
      chrome.tabs.create({ url: myVideoURL });
  }

}

function addMeToSession(){

  openSessionConnection();
  
  $.post("http://vps.bellisimospizza.com/session/" + mySessionID, {
    nickname: myNickname
  }, function(data) {
    if (data.found) {
      for (var i = 0; i < 5; i++) {
        myUserList[i] = data.userList[i];
      }
    } else {
      // TODO: send Error message to front end
    }
  });
}

function checkIfSessionExists(){
  $.get("http://vps.bellisimospizza.com/session/" + mySessionID,  function(data) {
    if (data.found){
      addMeToSession();
    }else{
      //TODO: SEND ERROR TO FRONT END
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {

  myNickname = " ";
  myUserID = " ";
  myCurrentPage = "page1";
  mySessionID = " ";
  myVideoURL = " ";

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg == "request_nicknameFG") {
        chrome.runtime.sendMessage({
          msg: "update_nicknameFG",
          data: {
            subject: myNickname
          }
        });
      }
      if (request.msg == "request_pageFG") {
        chrome.runtime.sendMessage({
          msg: "update_pageFG",
          data: {
            subject: myCurrentPage
          }
        });
      }
      if (request.msg == "request_sessionidFG") {
        chrome.runtime.sendMessage({
          msg: "update_sessionidFG",
          data: {
            subject: mySessionID
          }
        });
      }
      if (request.msg == "request_URLFG") {
        chrome.runtime.sendMessage({
          msg: "update_URLFG",
          data: {
            subject: myVideoURL
          }
        });
      }
      if (request.msg == "generate_session") {
        generateSession();
      }

    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "update_nickname" && myNickname == " ") {
        myNickname = request.data.subject;
      }
      if (request.msg === "update_page") {
        myCurrentPage = request.data.subject;
      }
      if (request.msg === "update_sessionid" && mySessionID == " ") {
        mySessionID = request.data.subject;
      }
      if (request.msg === "update_URL") {
        myVideoURL = request.data.subject;
        updateURL();
      }
      if (request.msg === "goto_URL") {
        goToURL();
      }
      if (request.msg === "joinSession") {
        addMeToSession();
      }
    });

  if (!local_dev) {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.msg === "verifyNickname") {
          addNickname();
        }
      });
  } else {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.msg === "verifyNickname") {
          myCurrentPage = "page2";
          chrome.runtime.sendMessage({
            msg: "nicknamePass"
          });
        }
      });
  }

  var intervalID = setInterval(checkForUpdates, 2000);

});
