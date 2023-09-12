// ==UserScript==
// @name CalendarNoScroll
// @description Disables the scroll feature for Month view on Google Calendar.
// @version 1.1.1
// @icon https://repository-images.githubusercontent.com/690376338/77d3ac11-d2ce-4cd4-9203-c2d3941815b3
// @updateURL https://github.com/Oshanotter/CalendarNoScroll/raw/main/CalendarNoScroll.js
// @namespace Oshanotter
// @author Max Forst
// @include https://calendar.google.com/*
// @run-at document-end
// ==/UserScript==

function main_CalendarNoScroll(){

  function theMainFunction(){



    function removeScroll(){
      // remove the attributes that allow for scrolling
      var calGrid = document.querySelector("#YPCqFe > div")

      var jsaction = calGrid.getAttribute("jsaction");

      var parts = jsaction.split(";");

      var newParts = parts.filter(part => part !== "jxCHud:XsjTP" && part !== "heR6Cf:KmWemb");

      var newJsaction = newParts.join(";");

      calGrid.setAttribute("jsaction", newJsaction);
    }
    removeScroll()


    function replaceScroll(){
      // put the attributes back that allow for scrolling
      var calGrid = document.querySelector("#YPCqFe > div")

      var jsaction = calGrid.getAttribute("jsaction");

      var parts = jsaction.split(";");

      var newParts = [...parts, "jxCHud:XsjTP", "heR6Cf:KmWemb"];

      var newJsaction = newParts.join(";");

      calGrid.setAttribute("jsaction", newJsaction);
    }


    function arrowClick(){
      // the function that will be run when the buttons are clicked

      replaceScroll()

      // set timeout needs to be here to work for some reason. It can be set to 0 seconds though
      setTimeout(() => {
        removeScroll()
      }, 0);

    }


    // find the buttons and add 'click' event listeners to them
    var prevMonth = document.querySelector("button.VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.mN1ivc.A7iFUc.m2yD4b.JJyfjc")

    var nextMonth = document.querySelector("button.VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.mN1ivc.xEq6pc.m2yD4b.JJyfjc")

    prevMonth.addEventListener("click", arrowClick);

    nextMonth.addEventListener("click", arrowClick);



  }
  theMainFunction()




// store url on load
let currentPage = location.href;

// listen for changes in the url
setInterval(function()
{

    if (currentPage != location.href)
    {
      // page has changed, set new page as 'current' and run the main function again
      currentPage = location.href;

        theMainFunction()

    }
}, 100);
}


function retry(){
  // tries to execute the main function. If it recieves an error, it tries again until it succeeds
  try{
  main_CalendarNoScroll()
  } catch {
          console.log("An error occured, trying again...");
          //alert("error")
          setTimeout(retry, 100);
          }
}


// call the retry() function only after the window is loaded. This will call the main function for the script
window.onload = retry()

