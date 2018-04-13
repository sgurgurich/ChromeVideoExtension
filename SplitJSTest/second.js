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
  // Look up database and add this mynickname to session
  // Connect to that session

  //First, check to see if the session ID entered is even valid
  mySessionID = document.getElementById("sessInput").value;

  if (mySessionID.length == 8) {
    // TODO: Add if-statement to check database for this IDs

    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "block";
    myCurrentPage = "page4"

    sendDataToBackground();

    chrome.runtime.sendMessage({
      msg: "joinSession",
    });

    loadParty();

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

function populateVideoUrl() {

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
