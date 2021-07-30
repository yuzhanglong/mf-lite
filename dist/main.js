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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* provided dependency */ var intl = __webpack_require__(/*! ./src/packages/intl/intl-entry */ \"./src/packages/intl/intl-entry.ts\")[\"default\"];\nconsole.log('hello world!');\nintl('hello world!', {});\n\n\n//# sourceURL=webpack://react-i18n-test/./src/index.ts?");

/***/ }),

/***/ "./src/packages/intl/intl-entry.ts":
/*!*****************************************!*\
  !*** ./src/packages/intl/intl-entry.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n/**\n * File: intl-entry.ts\n * Description: 注册全局 intl 方法\n * Created: 2021-07-29 16:26:47\n * Author: yuzhanglong\n * Email: yuzl1123@163.com\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst intl = 'hello world!!!!!!';\n// @ts-ignore\nwindow.intl = intl;\nexports.default = intl;\n\n\n//# sourceURL=webpack://react-i18n-test/./src/packages/intl/intl-entry.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;