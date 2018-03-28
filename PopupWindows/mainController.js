// mainController.js
// Stefan Gurgurich
// Zach Adam
// Trim Ballanca
// John Cutsavage

var myNickname;
var mySessionID;
//var currentPage;


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
	}
	else{
    //Display page1 again but with the INVALID NAME error
		document.getElementById("nameError").style.display = "block";
	}

  //currentPage = "page2";

	//chrome.storage.sync.set({'pageID': currentPage}, function() {
	//					console.log('Value is set to ' + currentPage);
	//				});

}

function joinSession(){
  document.getElementById("page2").style.display = "none";
	document.getElementById("page3").style.display = "block";
}

function createSession(){
	// Request a session ID, add it to database
	// Add my nickname to session
	// Bring me to session page
  document.getElementById("page2").style.display = "none";
	document.getElementById("page4").style.display = "block";
}

function submitSessionID(){
	// Look up database and add this mynickname to session
	// Connect to that session

  //First, check to see if the session ID entered is even valid
  mySessionID = document.getElementById("sessInput").value;
  if (mySessionID.length == 8){
		// TODO: Add if-statement to check database for this IDs
		if (querySessionID==true){
			document.getElementById("page3").style.display = "none";
			document.getElementById("page4").style.display = "block";
		}
    else{
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
	return true;
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


//  chrome.storage.sync.get(['pageID'], function(result) {
//		                         currentPage = result.key;
	//                       });

	//currentPage = bgWindow.document.getElementById("pageID");


  document.getElementById(currentPage).style.display = "block";


	// Activate other action listeners
	document.getElementById("submitName").addEventListener("click", createNickname);
	document.getElementById("joinSess").addEventListener("click", joinSession);
	document.getElementById("createSess").addEventListener("click", createSession);
	document.getElementById("submitID").addEventListener("click", submitSessionID);
});

document.addEventListener("beforeunload", function(e){
    //bgWindow.getElementById("pageID").value = currentPage;

	//	chrome.storage.sync.set({'pageID': currentPage}, function() {
		//          console.log('Value is set to ' + currentPage);
	//	        });


 });
