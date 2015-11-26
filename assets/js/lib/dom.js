'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var getWindowHeight = isomorph(function (element) {
	return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
});

var getWindowWidth = isomorph(function (element) {
	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
});

var getElementHeight = isomorph(function (element) {
	return element.getBoundingClientRect().height;
});

var getElementWidth = isomorph(function (element) {
	return element.getBoundingClientRect().width;
});

var isMobile = isomorph(function (element) {
	return 'ontouchstart' in document.documentElement;
});

var setAttrs = isomorph(function (node, attrs) {
	for (var _name in attrs) {
		node.setAttribute(_name, attrs[_name]);
	}
});

var addClass = isomorph(function (node, className) {
	var names = className.split(/ /g);

	if (node.classList) {
		names.forEach(function (name) {
			node.classList.add(name);
		});
	}
});

exports['default'] = {
	getWindowHeight: getWindowHeight,
	getWindowWidth: getWindowWidth,
	getElementHeight: getElementHeight,
	getElementWidth: getElementWidth,
	isMobile: isMobile,
	setAttrs: setAttrs,
	addClass: addClass
};

function isomorph(fn) {
	return function () {
		if (typeof window !== 'undefined') {
			return fn.apply(undefined, arguments);
		}
	};
}
module.exports = exports['default'];