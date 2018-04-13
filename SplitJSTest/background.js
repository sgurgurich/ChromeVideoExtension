// background.js
// Stefan Gurgurich
// Zach Adam
// Trim Ballanca
// John Cutsavage


var myNickname;
var myUserID;
var myCurrentPage;
var mySessionID;
var myUserList = [];
var myUserString;
var myVideoURL;
var ws;


function checkForUpdates() {
  //console.log(myNickname);
  //  console.log(myCurrentPage);
  //  console.log(mySessionID);
  //  console.log(myVideoURL);

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
      case "play":
        sendPlayOrPause("play");
        break;
      case "pause":
        sendPlayOrPause("pause");
        break;
      default:
        break;
    }
  });
}

function playVideo(){
  var tab;
  var url;

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    tab = tabs[0];
    url = tab.url;
  });

  var injectionCode = ['var script = document.createElement(\'script\');',
    'script.src = \'https://code.jquery.com/jquery-1.11.0.min.js\';',
    'script.type = \'text/javascript\';',
    'document.getElementsByTagName(\'head\')[0].appendChild(script); ',
    'document.getElementsByTagName(\'video\')[0].play();'
  ].join('\n');

  chrome.tabs.executeScript(tab, {
    code: injectionCode
  });

}

function pauseVideo(){
  var tab;
  var url;

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    tab = tabs[0];
    url = tab.url;
  });

  var injectionCode = ['var script = document.createElement(\'script\');',
    'script.src = \'https://code.jquery.com/jquery-1.11.0.min.js\';',
    'script.type = \'text/javascript\';',
    'document.getElementsByTagName(\'head\')[0].appendChild(script); ',
    'document.getElementsByTagName(\'video\')[0].pause();'
  ].join('\n');

  chrome.tabs.executeScript(tab, {
    code: injectionCode
  });
}

function sendPlayOrPause(player) {
  if (player == "play") {
    playVideo();

  }
  if (player == "pause") {
    pauseVideo();
  }

}

function formatUserArr(temp) {
  var output = "";

  output = output + "<ul>";

  for (var i = 0; i < temp.length; i++) {
    output = output + "<li>" + temp[i] + "</li>";
  }

  output = output + "</ul>";
  return output;
}

function updateAllInfo() {

  getAllFromDB();

  chrome.runtime.sendMessage({
    msg: "update_URLFG",
    data: {
      subject: myVideoURL
    }
  });

  myUserString = formatUserArr(myUserList);

  chrome.runtime.sendMessage({
    msg: "update_userlistFG",
    data: {
      subject: myUserString
    }
  });
}

function sendPlayRequest() {
  ws.send(JSON.stringify({
    "type": "play",
    "sessionID": mySessionID
  }));
}

function sendPauseRequest() {
  ws.send(JSON.stringify({
    "type": "pause",
    "sessionID": mySessionID
  }));
}

function sendUpdateRequest() {
  ws.send(JSON.stringify({
    "type": "update",
    "sessionID": mySessionID
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
      } else {
        myCurrentPage = "page3";
        chrome.runtime.sendMessage({
          msg: "sessionError"
        });
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

function getAllFromDB() {
  $.get("http://vps.bellisimospizza.com/session/" + mySessionID, function(data) {
    myUserList = data.userList;
    myVideoURL = data.videoUrl;
  });
}

function updateURL() {

  $.post("http://vps.bellisimospizza.com/url/" + mySessionID, {
    url: myVideoURL
  });

  console.log(mySessionID);

  ws.send(JSON.stringify({
    type: "update",
    sessionID: mySessionID
  }));
}

function goToURL() {
  if (myVideoURL != null) {
    chrome.tabs.create({
      url: myVideoURL
    });
    // /setTimeout(pauseVideo, 6000);
  }
}

function addMeToSession() {
  $.post("http://vps.bellisimospizza.com/session/" + mySessionID, {
    nickname: myNickname
  }, function(data) {
    if (data.found) {
      openSessionConnection();
      for (var i = 0; i < 5; i++) {
        myUserList[i] = data.userList[i];
      }
      myCurrentPage = "page4";
      chrome.runtime.sendMessage({
        msg: "sessionPass"
      });
    } else {
      myCurrentPage = "page3";
      chrome.runtime.sendMessage({
        msg: "sessionError"
      });
    }
  });


}

function exitSession(){

  ws.send(JSON.stringify({
    "sessionID": mySessionID,
    "userID": myNickname,
    "type": "leave"
  }));

  ws.close();

}
document.addEventListener('DOMContentLoaded', () => {

  myNickname = " ";
  myUserID = " ";
  myCurrentPage = "page1";
  mySessionID = " ";
  myVideoURL = null;

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
      if (request.msg == "request_userlistFG") {
        myUserString = formatUserArr(myUserList);
        chrome.runtime.sendMessage({
          msg: "update_userlistFG",
          data: {
            subject: myUserString
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
      if (request.msg === "playVid") {
        sendPlayRequest();
      }
      if (request.msg === "pauseVid") {
        sendPauseRequest();
      }
      if (request.msg === "leave_session") {
        exitSession();
      }
    });


  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "verifyNickname") {
        addNickname();
      }
    });



  //var intervalID = setInterval(checkForUpdates, 2000);

});
