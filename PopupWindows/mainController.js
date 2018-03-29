// mainController.js
// Stefan Gurgurich
// Zach Adam
// Trim Ballanca
// John Cutsavage

var myNickname;
var mySessionID;
var myCurrentPage;

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


function getCookie(cname){
	var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
	return "";
}

function createNickname(){
	// Get my nickname and ADD it to database
	// Prompt me about joining or creating a session
	myNickname = document.getElementById("nameInput").value;

  if (myNickname.length >= 3){
		//document.cookie = "myNickname=" + myNickname;
		//var bgNickname = bgWindow.document.createTextNode(myNickname);
		//bgNickname.createAttribute("id=storedNickname");
		document.getElementById("usergreeting").innerHTML = "Hey " + myNickname;
		document.getElementById("page1").style.display = "none";
		document.getElementById("page2").style.display = "block";
		myCurrentPage = "page2";
	}
	else{
    //Display page1 again but with the INVALID NAME error
		document.getElementById("nameError").style.display = "block";
	}

	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
		console.log(response.farewell);
	});

}

function joinSession(){
  document.getElementById("page2").style.display = "none";
	document.getElementById("page3").style.display = "block";
	myCurrentPage = "page3";
}

function createSession(){
	// Request a session ID, add it to database
	// Add my nickname to session
	// Bring me to session page
  document.getElementById("page2").style.display = "none";
	document.getElementById("page4").style.display = "block";
	myCurrentPage = "page4";
  generateSessionID();
	loadCurrentSession();


}

function submitSessionID(){
	// Look up database and add this mynickname to session
	// Connect to that session

  //First, check to see if the session ID entered is even valid
  mySessionID = document.getElementById("sessInput").value;

  if (mySessionID.length == 8){
		// TODO: Add if-statement to check database for this IDs
		if (querySessionID()==true){
			document.getElementById("page3").style.display = "none";
			document.getElementById("page4").style.display = "block";
			loadCurrentSession();
		}
    else{
			document.getElementById("sessIDError").style.display = "none";
      document.getElementById("sessNotFound").style.display = "block";
		}
	}
	else {
		//Display page3 again but with the INVALID ID error
		document.getElementById("sessIDError").style.display = "block";
	}
}


// DATABASE/SERVER FUNCTIONS
function querySessionID(){
  // Check the database to see if the session ID is valid
	return(true);
}

function loadCurrentSession(){
  document.getElementById("currSession").innerHTML = "Session ID: " + mySessionID;
  loadParty();
}

function loadParty(){
		document.getElementById("user1").innerHTML = myNickname;

		// TODO: We will get these from the Database
		document.getElementById("user2").innerHTML = "";
		document.getElementById("user3").innerHTML = "";
		document.getElementById("user4").innerHTML = "";
		document.getElementById("user5").innerHTML = "";
}

//TODO: Maybe the server should do this?
function generateSessionID(){
  var firstChar = (Math.floor(Math.random() * 10)).toString();
  var secondChar = (Math.floor(Math.random() * 10)).toString();
  var thirdChar = (Math.floor(Math.random() * 10)).toString();
  var fourthChar = (Math.floor(Math.random() * 10)).toString();
  var fifthChar = (Math.floor(Math.random() * 10)).toString();
  var sixthChar = (Math.floor(Math.random() * 10)).toString();
  var seventhChar = (Math.floor(Math.random() * 10)).toString();
  var eighthChar = (Math.floor(Math.random() * 10)).toString();

  mySessionID = firstChar + secondChar + thirdChar + fourthChar + fifthChar + sixthChar + seventhChar + eighthChar;

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
											'document.getElementsByTagName(\'video\')[0].play();'].join('\n');

  chrome.tabs.executeScript(tab, {code:injectionCode});

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
											'document.getElementsByTagName(\'video\')[0].pause();'].join('\n');

  chrome.tabs.executeScript(tab, {code:injectionCode});
}

function goToPage(page){


}


// Action Listner
// This is triggered when the page or extension loads for the first time]
// It is basically a constructor for the webpage

  document.addEventListener('DOMContentLoaded', () => {
  //	bgWindow = chrome.extension.getBackgroundPage();
  currentPage = "page1";

	// Set the default page states
	document.getElementById("page1").style.display = "block";
  document.getElementById("nameError").style.display = "none";

	document.getElementById("page2").style.display = "none";

	document.getElementById("page3").style.display = "none";
  document.getElementById("sessIDError").style.display = "none";
  document.getElementById("sessNotFound").style.display = "none";
	document.getElementById("page4").style.display = "none";

  document.getElementById(currentPage).style.display = "block";

	// Activate other action listeners
	document.getElementById("submitName").addEventListener("click", createNickname);
	document.getElementById("joinSess").addEventListener("click", joinSession);
	document.getElementById("createSess").addEventListener("click", createSession);
	document.getElementById("submitID").addEventListener("click", submitSessionID);

	document.getElementById("playBt").addEventListener("click", playVideo);
	document.getElementById("pauseBt").addEventListener("click", pauseVideo);

  // CONTENT PAGE REQUESTING BACKGROUND DATA
	chrome.runtime.sendMessage({greeting: "anyNickname"}, function(response) {
		myNickname = response.farewell;
    console.log(response.farewell);
  });

	chrome.runtime.sendMessage({greeting: "whatPage"}, function(response) {
		myCurrentPage = response.farewell;
		console.log(response.farewell);
	});

	chrome.runtime.sendMessage({greeting: "whatSession"}, function(response) {
		mySessionID = response.farewell;
		console.log(response.farewell);
	});

  // LISTENERS FOR REQUESTS FROM BACKGROUND
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




});

document.addEventListener("beforeunload", function(e){

});
