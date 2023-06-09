var bottom = 0;
var right = 0;

chrome.commands.onCommand.addListener(function (command) {
  async function lookup(){
    console.log("within lookup function")
    const [tab] = await chrome.tabs.query({active:true,lastFocusedWindow:true});
    const response = await chrome.tabs.sendMessage(tab.id,{type:"popup"});
    console.log(response);
    let left = parseInt(response.right);
    let top = parseInt(response.bottom);
    console.log(left);
    console.log(top);
    chrome.windows.create({
      url: "popup.html",
      type:"popup",
      width:100,
      height:200,
      left:left,
      top:top+100
    });
  }
  if(command === "lookUp"){
    console.log("HELLO. hotkey executed");
    lookup();
  }
});
//
// chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
//   if(request.action === 'highlight'){
//     bottom = request.bottom;
//     right = request.right;
//     console.log("from onmessage listener")
//   }
// })
