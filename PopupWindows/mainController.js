// mainController.js
// Stefan Gurgurich
// Zach Adam

var myNickname;

function readVars(){
	myNickname = getCookie("myNickname");
	document.getElementById("usergreeting").innerHTML = "Hey " + myNickname;
}

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
	var nextUrl = "startorjoinPopup.html";
	myNickname = document.getElementById("nameInput").value;
	document.cookie = "myNickname=" + myNickname;
	window.location.href = nextUrl;
}

function getNickname(){
	return myNickname;
}