// document.addEventListener("click",function(){
//   console.log("hello from click listener");
//   const selectedText = window.getSelection().toString().trim();
//   var oRange = selectedText.getRangeAt(0);
//   var oRect = oRange.getBoundingClientRect();
//   console.log(oRect[bottom] + " " + oRect[right]);
//   // if(selectedText != ''){
//   //   chrome.runtime.sendMessage({action:'highlight',bottom:oRect[bottom],right:oRect[right]})
//   // }
// })

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  console.log("chrome listener is online");
  if(request.type === "popup"){
    console.log("hello from content script")
    const selectedText = window.getSelection();
    var oRange = selectedText.getRangeAt(0);
    var oRect = oRange.getBoundingClientRect();
    console.log(oRect);
    sendResponse({bottom:oRect.bottom,right:oRect.right});
  }
});
