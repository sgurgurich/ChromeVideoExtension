// background.js
// Stefan Gurgurich
// Zach Adam

var myNickname;
var currentPage;
var sessionID;

document.addEventListener('DOMContentLoaded', () => {

    myNickname = document.createTextNode("DEFAULT_NICKNAME");
    myNickname.createAttribute("id=nickname");

    currentPage = document.createTextNode("page1");
    currentPage.createAttribute("id=pageID");

    sessionID = document.createTextNode("00000000");
    sessionID.createAttribute("id=sessionID");

});
