// mainController.js
// Stefan Gurgurich
// Zach Adam
// Trim Ballanca
// John Cutsavage
///////////////////////////////////////////////////

var myNickname;
var mySessionID;
var myCurrentPage;
var myVideoURL;
var myUserString;

///////////////////////////////////////////////////
//  USER ACTIONS
///////////////////////////////////////////////////
function createNickname() {
  myNickname = document.getElementById("nameInput").value;
  document.getElementById("nameStorage").innerHTML = myNickname;
  if (myNickname.length >= 3) {
    sendDataToBackground();
    chrome.runtime.sendMessage({
      msg: "verifyNickname"
    });
    document.getElementById("loadingMsg").style.display = "block";
  } else {
    //Display page1 again but with the INVALID NAME error
    document.getElementById("nameError").style.display = "block";
  }
}

function joinSession() {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "block";
  myCurrentPage = "page3";
  sendDataToBackground();
}

function createSession() {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page4").style.display = "block";
  myCurrentPage = "page4";

  chrome.runtime.sendMessage({
    msg: "generate_session"
  });

  loadParty();
  sendDataToBackground();
}

function submitSessionID() {

  mySessionID = document.getElementById("sessInput").value;

  if (mySessionID.length === 8) {
    sendDataToBackground();

    chrome.runtime.sendMessage({
      msg: "joinSession",
    });

    document.getElementById("loadingMsgSess").style.display = "block";

  //  loadParty();

  } else {
    document.getElementById("sessIDError").style.display = "block";
    document.getElementById("sessNotFound").style.display = "none";
  }

}


function setVideoURL() {

  myVideoURL = document.getElementById("urlName").value;

  chrome.runtime.sendMessage({
    msg: "update_URL",
    data: {
      subject: myVideoURL
    }
  });

}

function gotoVideoURL() {

  if (myVideoURL != null) {
    chrome.runtime.sendMessage({
      msg: "goto_URL",
    });
  }
}

function copyToClipboard() {
  const el = document.createElement('textarea');
  el.value = document.getElementById("currSession").innerHTML;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function playRequest() {
  chrome.runtime.sendMessage({
    msg: "playVid",
  });
}

function pauseRequest() {
  chrome.runtime.sendMessage({
    msg: "pauseVid",
  });
}


function pauseVideo() {

}

function goBackToP1() {

  chrome.runtime.sendMessage({
    msg: "update_page",
    data: {
      subject: "page1"
    }
  });

  loadValuesFromBG();
}

function goBackToP2() {

  chrome.runtime.sendMessage({
    msg: "update_page",
    data: {
      subject: "page2"
    }
  });

  loadValuesFromBG();
}

function leaveCurrentSession() {

  chrome.runtime.sendMessage({
    msg: "update_sessionid",
    data: {
      subject: ""
    }
  });

  chrome.runtime.sendMessage({
    msg: "update_page",
    data: {
      subject: "page2"
    }
  });

  chrome.runtime.sendMessage({
    msg: "leave_session"
  });

  loadValuesFromBG();
}


function loadAllElements() {
  setLocalVars();
  loadNicknameElements();
  loadSessionIdElements();
  loadParty();
}

function setLocalVars() {
  myNickname = document.getElementById("nameStorage").innerHTML;
  mySessionID = document.getElementById("sessionStorage").innerHTML;
  myCurrentPage = document.getElementById("pageStorage").innerHTML;
  myVideoURL = document.getElementById("urlStorage").innerHTML;
  myUserString = document.getElementById("userListStorage").innerHTML;
}


document.addEventListener('DOMContentLoaded', () => {
  myCurrentPage = "page1";
  mySessionID = "TEST";
  document.getElementById("storage").style.display = "none";
  startMsgListeners();
  loadValuesFromBG();
  startButtonActionListeners();
  disableErrors();
  disableLoadMsg();
  var intervalID = setInterval(loadAllElements, 10);
});
