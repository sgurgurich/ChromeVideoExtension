///////////////////////////////////////////////////
//  PAGE NAVIGATION
///////////////////////////////////////////////////
function loadPage1() {
  document.getElementById("page1").style.display = "block";
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "none";
  document.getElementById("page4").style.display = "none";
  myCurrentPage = "page1";
}

function loadPage2() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
  document.getElementById("page3").style.display = "none";
  document.getElementById("page4").style.display = "none";
  document.getElementById("loadingMsg").style.display = "none";
  myCurrentPage = "page2";
  loadValuesFromBG();
}

function loadPage3() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "block";
  document.getElementById("page4").style.display = "none";
  myCurrentPage = "page3";
  loadValuesFromBG();
}

function loadPage4() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "none";
  document.getElementById("page4").style.display = "block";
  myCurrentPage = "page4";
  loadValuesFromBG();
}

function goToCurrentPage(page) {
  switch (page) {
    case "page1":
      loadPage1();
      break;
    case "page2":
      loadPage2();
      break;
    case "page3":
      loadPage3();
      break;
    case "page4":
      loadPage4();
      break;
    default:
      document.getElementById("page1").style.display = "block";
      document.getElementById("page2").style.display = "none";
      document.getElementById("page3").style.display = "block";
      document.getElementById("page4").style.display = "none";
  }
  // Set the default page states
}
///////////////////////////////////////////////////
//  ERROR AND LOG ELEMENTS
///////////////////////////////////////////////////
function disableErrors() {
  document.getElementById("nameError").style.display = "none";
  document.getElementById("nameNotAvailErr").style.display = "none";
  document.getElementById("sessNotFound").style.display = "none";
  document.getElementById("sessIDError").style.display = "none";
  document.getElementById("sessNotFound").style.display = "none";
  document.getElementById("loadingMsg").style.display = "none";
}

function disableLoadMsg() {
  document.getElementById("loadingMsg").style.display = "none";
  document.getElementById("loadingMsgSess").style.display = "none";
  document.getElementById("urlFound").style.display = "none";
}

function loadError(error) {
  switch (error) {
    case "nickname":
      document.getElementById("nameNotAvailErr").style.display = "block";
      break;
    case "session":
      document.getElementById("sessNotFound").style.display = "block";
      break;
    default:
      break;
  }
}

function loadNicknameElements() {
  document.getElementById("usergreeting").innerHTML = "Hey " + myNickname;
}

function loadSessionIdElements() {
  document.getElementById("currSession").innerHTML = mySessionID;
}

function loadParty() {
  document.getElementById("userparty").innerHTML = myUserString;

}
