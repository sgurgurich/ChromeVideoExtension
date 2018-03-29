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

document.addEventListener('DOMContentLoaded', () => {

  myNickname = "";
  myCurrentPage = "page1";
  mySessionID = "";


  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "update_nickname") {
        myNickname = request.data.subject;
      }
    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "request_nicknameFG") {
        chrome.runtime.sendMessage({
          msg: "update_nicknameFG",
          data: {
            subject: myNickname
          }
        });
      }
    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "update_page") {
        myCurrentPage = request.data.subject;
      }
    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "request_pageFG") {
        chrome.runtime.sendMessage({
          msg: "update_pageFG",
          data: {
            subject: myCurrentPage
          }
        });
      }
    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "update_sessionid") {
        mySessionID = request.data.subject;
      }
    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "request_sessionidFG") {
        chrome.runtime.sendMessage({
          msg: "update_sessionidFG",
          data: {
            subject: mySessionID
          }
        });
      }
    });


  //var intervalID = setInterval(checkForUpdates, 2000);

});
