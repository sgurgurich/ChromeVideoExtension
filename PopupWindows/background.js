// background.js
// Stefan Gurgurich
// Zach Adam

var myNickname;

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
	//document.cookie = "myNickname=" + myNickname;
	document.getElementById("usergreeting").innerHTML = "Hey " + myNickname;
	document.getElementById("page1").style.display = "none";
	document.getElementById("page2").style.display = "block";
}

function getNickname(){
	return myNickname;
}


document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("page1").style.display = "block";
	document.getElementById("page2").style.display = "none";
	
	document.getElementById("submitName").addEventListener("click", createNickname);
});
