chrome.commands.onCommand.addListener(function (command) {
  if(command === "lookUp"){
    chrome.windows.create({
      url: "popup.html",
      type:"popup",
      width:200,
      height:300
    });
    console.log("HELLO. hotkey executed")
  }
});
