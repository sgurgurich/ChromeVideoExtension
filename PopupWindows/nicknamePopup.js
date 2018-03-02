// nicknamePopup.js
// Stefan Gurgurich
// Zach Adam


class NicknamePopup{
	
	var myNickname;
	
	constructor(){
		
	}
	

    function setNickname(nickname){
	    //var nextUrl = "startorjoinPopup.html"
	    myNickname = nickname;
	
	    // For testing only
	    //document.getElementById("test").innerHTML = "Hello " + myNickname;
	
	    // Once you have entered a valid name, move on to next page
	    //window.location.href = nextUrl;
	
    }
	
	function getNickname(){
		return myNickname;
	}
	
}
