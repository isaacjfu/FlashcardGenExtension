var modalStyle = `
    width: 400px;
    height: 300px;
    background-color: white;
    color: black;
    position: fixed;
    display: block;
    border: 2px solid black;
    z-index: 9999;
    overflow-y:auto;
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

// const translate = require('google-translate-api');
import * as translate from 'google-translate-api';

document.addEventListener("keydown",function(event){
  if(event.ctrlKey && event.shiftKey && event.key === "L"){
    const selectedText = window.getSelection();
    const text = selectedText.toString();
    var oRange = selectedText.getRangeAt(0);
    var oRect = oRange.getBoundingClientRect();
    createPopUp(oRect.right,oRect.bottom,text);
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
    console.log(data);
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

async function generateTranslation(text){
  const wikiHTML = await getWiktionaryPageInfo(text);
  const parsedWiki = parseWikiHTML(wikiHTML);
  return parsedWiki;
}
async function googleTranslate(text){
  translate(text,{to:'en'}).then(res =>{
    return res;
  }).catch(err=>{
    console.log(error)
  })
}

function createModalElement(left,top,definition){
  var modalTop = top.toString() + 'px';
  var modalLeft = left.toString() + 'px';
  var modal = document.createElement("div");
  modal.style.cssText = modalStyle;
  modal.style.top = modalTop;
  modal.style.left=  left.toString()+ 'px';
  var modalText = createModalTextElement(definition);
  var closeButton = createCloseButtonElement(modal);

  modal.appendChild(modalText);
  modal.appendChild(closeButton);
  return modal;
}

function createModalTextElement(definition){
  var modalText = document.createElement("div");
  modalText.innerHTML = definition;
  modalText.style.cssText = modalTextStyle;
  return modalText;
}

function createCloseButtonElement(modal){
  var closeButton = document.createElement("button");
  function closeModal(){
    modal.style.display = "none";
  }
  closeButton.addEventListener("click",closeModal);
  closeButton.textContent = "X";
  closeButton.style.cssText = buttonStyle;
  return closeButton;
}

async function createPopUp(left,top,text){
  const definition = await generateTranslation(text);
  console.log(definition);
  var container = document.createElement("div");
  var modal = createModalElement(left,top,definition)
  container.appendChild(modal);
  document.body.insertBefore(container,document.body.firstChild);
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
