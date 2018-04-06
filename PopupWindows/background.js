// background.js
// Stefan Gurgurich
// Zach Adam
// Trim Ballanca
// John Cutsavage

var myNickname;
var myUserID;
var myCurrentPage;
var mySessionID;

var ws;

function checkForUpdates() {

  console.log(myNickname);
  console.log(myCurrentPage);
  console.log(mySessionID);
}

function testLog(log) {
  console.log(log);
}

function initWebSockets() {

  if ("WebSocket" in window) {
    ws = new WebSocket("ws://vps.bellisimospizza.com:8080");
    ws.onopen = function() {
      ws.send("hello trim");
    };
  }

  // Listen for messages
  ws.addEventListener('message', function(event) {
    console.log('Message from server ', event.data);
  });

}


document.addEventListener('DOMContentLoaded', () => {

  myNickname = " ";
  myUserID   = " ";
  myCurrentPage = "page1";
  mySessionID = " ";

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

    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "update_nickname" && myNickname == " ") {
        myNickname = request.data.subject;
      }
      if (request.msg === "update_page") {
        myCurrentPage = request.data.subject;
      }
      if (request.msg === "update_sessionid") {
        mySessionID = request.data.subject;
      }
    });

  // TODO: For testing only
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "verifyNickname") {

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
    });


  initWebSockets();



  var intervalID = setInterval(checkForUpdates, 2000);

});
