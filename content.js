var modalStyle = `
    width: 200px;
    height: 100px;
    background-color: white;
    color: black;
    position: fixed;
    display: block;
    border: 2px solid black;
    z-index: 9999;
`
var modalTextStyle = `

`

var buttonStyle = `
    top: 10px;
    right: 10px;
    color: black;
    position:absolute;
`

var wikiApiURL = "https://en.wiktionary.org/w/api.php?action=query&prop=extracts&format=json&titles=";


document.addEventListener("keydown",function(event){
  if(event.ctrlKey && event.shiftKey && event.key === "L"){
    const selectedText = window.getSelection();
    const text = selectedText.toString();
    var oRange = selectedText.getRangeAt(0);
    var oRect = oRange.getBoundingClientRect();
    createModal(oRect.right,oRect.bottom,text);
  }
  if(event.ctrlKey && event.shiftKey && event.key === "T"){
    const selectedText = window.getSelection();
    const text = selectedText.toString();
    var response = getWiktionaryPageInfo(text);
    console.log(response);
  }
})

async function getWiktionaryPageInfo(title) {
  try {
    const apiUrl = 'https://en.wiktionary.org/w/api.php';
    const params = new URLSearchParams({
      action: 'parse',
      page: title,
      format: 'json',
      origin:'*'
    });
    const url = `${apiUrl}?${params}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log("ABC");
    console.log(data.parse.text["*"]);
    const content = data.parse.text["*"];
    return content;

  } catch (error) {
    console.error('Error retrieving page information:', error);
    return null;
  }
}

function parseWikiHTML(wikiHTML){
  return wikiHTML;
}
// // Example usage
// const title = 'computer';
// getWiktionaryPageInfo(title)
//   .then(pageInfo => {
//     if (pageInfo) {
//       console.log(`Page Information for '${title}':`);
//       console.log(pageInfo);
//     } else {
//       console.log(`Page '${title}' does not exist on Wiktionary.`);
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

async function createModal(left,top,text){
  const wikiHTML = await getWiktionaryPageInfo(text);
  console.log(wikiHTML);
  const parsedWiki = parseWikiHTML(wikiHTML);

  var container = document.createElement("div");

  var modalTop = top.toString() + 'px';
  var modalLeft = left.toString() + 'px';
  var modal = document.createElement("div")
  var closeButton = document.createElement("button")
  var modalText = document.createElement("div")
  modalText.innerHTML = parsedWiki;
  modalText.style.cssText = modalTextStyle;

  function closeModal(){
    modal.style.display ="none";
  }
  closeButton.addEventListener("click",closeModal);
  closeButton.textContent = "X";
  closeButton.style.cssText = buttonStyle;

  modal.style.cssText = modalStyle;
  modal.style.top = modalTop;
  modal.style.left = modalLeft;
  // modal.textContent = "Highlighted Text is " + text;

  modal.appendChild(modalText);
  modal.appendChild(closeButton);
  container.appendChild(modal);
  document.body.insertBefore(container,document.body.firstChild);

  console.log("bye")
}

// chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
//   console.log("chrome listener is online");
//   if(request.type === "popup"){
//     console.log("hello from content script")
//     const selectedText = window.getSelection();
//     var oRange = selectedText.getRangeAt(0);
//     var oRect = oRange.getBoundingClientRect();
//     console.log(oRect);
//     sendResponse({bottom:oRect.bottom,right:oRect.right});
//   }
// });
