///////////////////////////////////////////////////
//  ACTION LISTENERS
///////////////////////////////////////////////////
function startButtonActionListeners() {
  // Activate other action listeners
  document.getElementById("submitName").addEventListener("click", createNickname);
  document.getElementById("joinSess").addEventListener("click", joinSession);
  document.getElementById("createSess").addEventListener("click", createSession);
  document.getElementById("submitID").addEventListener("click", submitSessionID);
  document.getElementById("back3").addEventListener("click", goBackToP2);
  document.getElementById("playBt").addEventListener("click", playRequest);
  document.getElementById("pauseBt").addEventListener("click", pauseRequest);
  document.getElementById("restartBt").addEventListener("click", restartRequest);
  document.getElementById("cpToClip").addEventListener("click", copyToClipboard);
  document.getElementById("setURLBt").addEventListener("click", setVideoURL);
  document.getElementById("gotoURLBt").addEventListener("click", gotoVideoURL);
  document.getElementById("leaveBt").addEventListener("click", leaveCurrentSession);
}

function startMsgListeners() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "update_nicknameFG") {
        document.getElementById("nameStorage").innerHTML = request.data.subject;
      }
      if (request.msg === "update_pageFG") {
        document.getElementById("pageStorage").innerHTML = request.data.subject;
        goToCurrentPage(request.data.subject);
      }
      if (request.msg === "update_sessionidFG") {
        document.getElementById("sessionStorage").innerHTML = request.data.subject;
      }
      if (request.msg === "update_URLFG") {
        document.getElementById("urlStorage").innerHTML = request.data.subject;
        if (myVideoURL.length >= 10){
          document.getElementById("urlFound").style.display = "block";
        //  document.getElementById("urlFound").innerHTML = typeof(myVideoURL);
        }
      }
      if (request.msg === "update_userlistFG") {
        document.getElementById("userListStorage").innerHTML = request.data.subject;
      }
      if (request.msg === "nicknameError") {
        goToCurrentPage("page1");
        disableErrors();
        disableLoadMsg();
        loadError("nickname");
      }
      if (request.msg === "nicknamePass") {
        goToCurrentPage("page2");
      }
      if (request.msg === "sessionError") {
        goToCurrentPage("page3");
        disableErrors();
        disableLoadMsg();
        loadError("session");
      }
      if (request.msg === "sessionPass") {
        goToCurrentPage("page4");
      }

    });
}
