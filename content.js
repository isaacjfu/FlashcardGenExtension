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
  // const wikiHTML = await getWiktionaryPageInfo(text);
  // const parsedWiki = parseWikiHTML(wikiHTML);
  const translation = googleTranslate(text);
  return translation;
}
async function googleTranslate(text){
  try{
    let token = await generate(text);
    const apiUrl = 'https://translate.google.com/m';
    const params = new URLSearchParams({
      tl: 'en',
      sl: 'auto',
      q: text,
      origin: '*',
      [token.name]: token.value
    });
    const url = `${apiUrl}?${params}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error retrieving page information:', error);
    return null;
  }
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

/**
 * Last update: 2/11/2018
 * https://translate.google.com/translate/releases/twsfe_w_20160620_RC00/r/js/desktop_module_main.js
 *
 * Everything between 'BEGIN' and 'END' was copied from the script above.
 */

// const { request } = require("undici");

/* eslint-disable */
// BEGIN
function zr(a) {
    let b;
    if (null !== yr) b = yr;
    else {
        b = wr(String.fromCharCode(84));
        let c = wr(String.fromCharCode(75));
        b = [ b(), b() ];
        b[1] = c();
        b = (yr = window[b.join(c())] || "") || "";
    }
    let d = wr(String.fromCharCode(116));
    let c = wr(String.fromCharCode(107));
    d = [ d(), d() ];
    d[1] = c();
    c = "&" + d.join("") + "=";
    d = b.split(".");
    b = Number(d[0]) || 0;
    // eslint-disable-next-line no-var
    for (var e = [], f = 0, g = 0; g < a.length; g++) {
        let l = a.charCodeAt(g);
        128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : ((l & 64512) == 55296 && g + 1 < a.length && (a.charCodeAt(g + 1) & 64512) == 56320 ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023), e[f++] = l >> 18 | 240, e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224, e[f++] = l >> 6 & 63 | 128), e[f++] = l & 63 | 128);
    }
    a = b;
    for (let f = 0; f < e.length; f++) a += e[f], a = xr(a, "+-a^+6");
    a = xr(a, "+-3^+b+-f");
    a ^= Number(d[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return c + (a.toString() + "." + (a ^ b));
}

let yr = null;
let wr = function(a) {
    return function() {
        return a;
    };
};
let xr = function(a, b) {
    for (let c = 0; c < b.length - 2; c += 3) {
        let d = b.charAt(c + 2);
        d = d >= "a" ? d.charCodeAt(0) - 87 : Number(d);
        d = b.charAt(c + 1) == "+" ? a >>> d : a << d;
        a = b.charAt(c) == "+" ? a + d & 4294967295 : a ^ d;
    }
    return a;
};
// END
/* eslint-enable */

const config = new Map();

const window = {
    TKK: config.get("TKK") || "0"
};

// eslint-disable-next-line require-jsdoc
async function updateTKK() {
    let now = Math.floor(Date.now() / 3600000);

    if (Number(window.TKK.split(".")[0]) !== now) {
        const response = await fetch("https://translate.google.com");
        const body = await response.body.text();

        // code will extract something like tkk:'1232135.131231321312', we need only value
        const code = body.match(/tkk:'\d+.\d+'/g);

        if (code.length > 0) {
            // extracting value tkk:'1232135.131231321312', this will extract only token: 1232135.131231321312
            const xt = code[0].split(":")[1].replace(/'/g, "");

            window.TKK = xt;
            config.set("TKK", xt);
        }
    }
}

// eslint-disable-next-line require-jsdoc
async function generate(text) {
    try {
        await updateTKK();

        let tk = zr(text);
        tk = tk.replace("&tk=", "");
        return { name: "tk", value: tk };
    }
    catch (error) {
        return error;
    }
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
