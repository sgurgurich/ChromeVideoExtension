// background.js
// Stefan Gurgurich
// Zach Adam

var myNickname;
var myCurrentPage;
var mySessionID;

function checkForUpdates(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "anyNickname"}, function(response) {
        myNickname = response.farewell;
      });
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "whatPage"}, function(response) {
        myNickname = response.farewell;
      });
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "whatSession"}, function(response) {
        myNickname = response.farewell;
      });
    });
}



document.addEventListener('DOMContentLoaded', () => {

  myNickname = "";
  myCurrentPage = "page1";
  mySessionID = "";

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting == "anyNickname")
        sendResponse({farewell: myNickname});
    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting == "whatPage")
        sendResponse({farewell: myCurrentPage});
    });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting == "whatSession")
        sendResponse({farewell: mySessionID});
    });

   var intervalID = setInterval(checkForUpdates, 500);

});
