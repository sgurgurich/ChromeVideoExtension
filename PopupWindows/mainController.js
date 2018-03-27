// mainController.js
// Stefan Gurgurich
// Zach Adam

var myNickname;
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
	//document.cookie = "myNickname=" + myNickname;
	//var bgNickname = bgWindow.document.createTextNode(myNickname);
	//bgNickname.createAttribute("id=storedNickname");
	document.getElementById("usergreeting").innerHTML = "Hey " + myNickname;
	document.getElementById("page1").style.display = "none";
	document.getElementById("page2").style.display = "block";

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
	document.getElementById("page3").style.display = "none";
	document.getElementById("page4").style.display = "block";
}

// Action Listner
// This is triggered when the page or extension loads for the first time]
// It is basically a constructor for the webpage

document.addEventListener('DOMContentLoaded', () => {
	//bgWindow = chrome.extension.getBackgroundPage();
//  currentPage = "page1";

	// Set the default page states
	document.getElementById("page1").style.display = "block";
	document.getElementById("page2").style.display = "none";
	document.getElementById("page3").style.display = "none";
	document.getElementById("page4").style.display = "none";


	//currentPage = bgWindow.document.getElementById("pageID");

//  if (currentPage != null){
//	document.getElementById(currentPage).style.display = "block";
//}

	// Activate other action listeners
	document.getElementById("submitName").addEventListener("click", createNickname);
	document.getElementById("joinSess").addEventListener("click", joinSession);
	document.getElementById("createSess").addEventListener("click", createSession);
	document.getElementById("submitID").addEventListener("click", submitSessionID);
});

//document.addEventListener("beforeunload", function(e){
//    var bgNickname = bgWindow.document.createTextNode("page3");
//  	bgNickname.createAttribute("id=pageID");
 //});
