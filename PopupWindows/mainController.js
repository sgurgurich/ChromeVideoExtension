// mainController.js
// Stefan Gurgurich
// Zach Adam
// Trim Ballanca
// John Cutsavage

var myNickname;
var mySessionID;
var myCurrentPage;


function createNickname() {
  // Get my nickname and ADD it to database
  // Prompt me about joining or creating a session
  myNickname = document.getElementById("nameInput").value;


  if (myNickname.length >= 3) {
    //document.getElementById("usergreeting").innerHTML = "Hey " + myNickname;
    //document.getElementById("page1").style.display = "none";
    //document.getElementById("page2").style.display = "block";
    myCurrentPage = "page2";
    sendDataToBackground();

	// TODO: TEMPORARY
	chrome.runtime.sendMessage({
      msg: "verifyNickname"
    });

	document.getElementById("usergreeting").innerHTML = "Hey " + myNickname;
	loadPage2();



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
  // Request a session ID, add it to database
  // Add my nickname to session
  // Bring me to session page
  document.getElementById("page2").style.display = "none";
  document.getElementById("page4").style.display = "block";
  myCurrentPage = "page4";
  generateSessionID();
  loadCurrentSession();
  sendDataToBackground();
}

function submitSessionID() {
  // Look up database and add this mynickname to session
  // Connect to that session

  //First, check to see if the session ID entered is even valid
  mySessionID = document.getElementById("sessInput").value;

  if (mySessionID.length == 8) {
    // TODO: Add if-statement to check database for this IDs
    if (querySessionID() == true) {
      document.getElementById("page3").style.display = "none";
      document.getElementById("page4").style.display = "block";
      loadCurrentSession();
      sendDataToBackground();
    } else {
      document.getElementById("sessIDError").style.display = "none";
      document.getElementById("sessNotFound").style.display = "block";
    }
  } else {
    //Display page3 again but with the INVALID ID error
    document.getElementById("sessIDError").style.display = "block";
  }
}


// DATABASE/SERVER FUNCTIONS
function querySessionID() {
  // Check the database to see if the session ID is valid
  return (true);
}

function loadCurrentSession() {
  document.getElementById("currSession").innerHTML = "Session ID: " + mySessionID;
  loadParty();
}

function loadParty() {
  document.getElementById("user1").innerHTML = myNickname;

  // TODO: We will get these from the Database
  document.getElementById("user2").innerHTML = "";
  document.getElementById("user3").innerHTML = "";
  document.getElementById("user4").innerHTML = "";
  document.getElementById("user5").innerHTML = "";
}

//TODO: Maybe the server should do this?
function generateSessionID() {
  var firstChar   =  (Math.floor(Math.random() * 10)).toString();
  var secondChar  =  (Math.floor(Math.random() * 10)).toString();
  var thirdChar   =  (Math.floor(Math.random() * 10)).toString();
  var fourthChar  =  (Math.floor(Math.random() * 10)).toString();
  var fifthChar   =  (Math.floor(Math.random() * 10)).toString();
  var sixthChar   =  (Math.floor(Math.random() * 10)).toString();
  var seventhChar =  (Math.floor(Math.random() * 10)).toString();
  var eighthChar  =  (Math.floor(Math.random() * 10)).toString();

  mySessionID = firstChar + secondChar + thirdChar + fourthChar + fifthChar + sixthChar + seventhChar + eighthChar;

}

function playVideo() {

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

function pauseVideo() {

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

function loadPage1() {
  document.getElementById("page1").style.display = "block";
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "none";
  document.getElementById("page4").style.display = "none";
  myCurrentPage = "page1";
}

function loadPage2() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
  document.getElementById("page3").style.display = "none";
  document.getElementById("page4").style.display = "none";
  myCurrentPage = "page2";
  loadValuesFromBG();
}

function loadPage3() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "block";
  document.getElementById("page4").style.display = "none";
  myCurrentPage = "page3";
  loadValuesFromBG();
}

function loadPage4() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "none";
  document.getElementById("page4").style.display = "block";
  myCurrentPage = "page4";
  loadValuesFromBG();
}

function loadNicknameElements(name) {
  document.getElementById("usergreeting").innerHTML = "Hey " + name;
  document.getElementById("user1").innerHTML = name;
}


function loadSessionIdElements(sessId) {
  document.getElementById("currSession").innerHTML = "Session ID: " + sessId;
}

function goToCurrentPage(page) {
  switch (page) {
    case "page1":
      loadPage1();
      break;
    case "page2":
      loadPage2();
      break;
    case "page3":
      loadPage3();
      break;
    case "page4":
      loadPage4();
      break;
    default:
      document.getElementById("page1").style.display = "block";
      document.getElementById("page2").style.display = "none";
      document.getElementById("page3").style.display = "block";
      document.getElementById("page4").style.display = "none";
  }
  // Set the default page states
}

function disableErrors() {
  document.getElementById("nameError").style.display = "none";
  document.getElementById("sessIDError").style.display = "none";
  document.getElementById("sessNotFound").style.display = "none";
}

function loadError(error){
	switch(error){
		case "nickname":
			document.getElementById("nameError").style.display = "block";
			break;
		default:
			break;
	}
}

function startButtonActionListeners() {
  // Activate other action listeners
  document.getElementById("submitName").addEventListener("click", createNickname);
  document.getElementById("joinSess").addEventListener("click", joinSession);
  document.getElementById("createSess").addEventListener("click", createSession);
  document.getElementById("submitID").addEventListener("click", submitSessionID);

  document.getElementById("back2").addEventListener("click", goBackToP1);
  document.getElementById("back3").addEventListener("click", goBackToP2);
  document.getElementById("playBt").addEventListener("click", playVideo);
  document.getElementById("pauseBt").addEventListener("click", pauseVideo);

  document.getElementById("leaveBt").addEventListener("click", leaveCurrentSession);
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

  loadValuesFromBG();
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

function loadValuesFromBG() {
  chrome.runtime.sendMessage({
    msg: "request_nicknameFG"
  });

  chrome.runtime.sendMessage({
    msg: "request_pageFG"
  });

  chrome.runtime.sendMessage({
    msg: "request_sessionidFG"
  });
}

function sendDataToBackground() {
  // Send values to background
  chrome.runtime.sendMessage({
    msg: "update_nickname",
    data: {
      subject: myNickname
    }
  });

  chrome.runtime.sendMessage({
    msg: "update_page",
    data: {
      subject: myCurrentPage
    }
  });

  chrome.runtime.sendMessage({
    msg: "update_sessionid",
    data: {
      subject: mySessionID
    }
  });

}


// Action Listner
// This is triggered when the page or extension loads for the first time]
// It is basically a constructor for the webpage
document.addEventListener('DOMContentLoaded', () => {

  myCurrentPage = "page1";

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "update_nicknameFG") {
        loadNicknameElements(request.data.subject);
      }
      if (request.msg === "update_pageFG") {
        goToCurrentPage(request.data.subject);
      }
      if (request.msg === "update_sessionidFG") {
        loadSessionIdElements(request.data.subject);
      }
	  if (request.msg === "nicknameError") {
		goToCurrentPage("page1");
		loadError("nickname");
	  }
    });

  loadValuesFromBG();
  startButtonActionListeners();
  disableErrors();
});
