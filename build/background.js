/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./background.js":
/*!***********************!*\
  !*** ./background.js ***!
  \***********************/
/***/ (() => {

eval("// chrome.commands.onCommand.addListener(function (command) {\n//   async function lookup(){\n//     console.log(\"within lookup function\")\n//     const [tab] = await chrome.tabs.query({active:true,lastFocusedWindow:true});\n//     const response = await chrome.tabs.sendMessage(tab.id,{type:\"popup\"});\n//     console.log(response);\n//     let left = parseInt(response.right);\n//     let top = parseInt(response.bottom);\n//     console.log(left);\n//     console.log(top);\n//     chrome.windows.create({\n//       url: \"popup.html\",\n//       type:\"popup\",\n//       width:100,\n//       height:200,\n//       left:left,\n//       top:top+100\n//     });\n//   }\n//   if(command === \"lookUp\"){\n//     console.log(\"HELLO. hotkey executed\");\n//     lookup();\n//   }\n// });\n//\n// chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){\n//   if(request.action === 'highlight'){\n//     bottom = request.bottom;\n//     right = request.right;\n//     console.log(\"from onmessage listener\")\n//   }\n// })\n\n\n//# sourceURL=webpack://hello-extension/./background.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./background.js"]();
/******/ 	
/******/ })()
;