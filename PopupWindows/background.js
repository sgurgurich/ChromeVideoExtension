// background.js
// Stefan Gurgurich
// Zach Adam
// Trim Ballanca
// John Cutsavage

var myNickname;
var myCurrentPage;
var mySessionID;

function checkForUpdates() {

  console.log(myNickname);
  console.log(myCurrentPage);
  console.log(mySessionID);
}

function testLog(log) {
  console.log(log);
}

document.addEventListener('DOMContentLoaded', () => {

  myNickname = " ";
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

			if( $.get( "http://vps.bellisimospizza.com/tasks/" + myNickname, function() {
				console.log( "success" );

			  }))
			{
				myCurrentPage = "page1";
				myNickname = " ";				
				chrome.runtime.sendMessage({
					msg: "nicknameError"
				});
			}
			else{

				chrome.runtime.sendMessage({
					msg: "nicknameValid"
				});
			}
        }
      });




  var intervalID = setInterval(checkForUpdates, 2000);

});
