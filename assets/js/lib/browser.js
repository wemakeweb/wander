'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function isLocalStorageSupported() {
    if (typeof window === 'undefined') {
        return false;
    }

    var testKey = 'test',
        storage = window.sessionStorage;
    try {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return localStorageName in win && win[localStorageName];
    } catch (error) {
        return false;
    }
}

function getMobileOperatingSystem() {
    if (typeof window === 'undefined') {
        return 'unknown';
    }

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
        return iOS;
    } else if (userAgent.match(/Android/i)) {
        return Android;
    } else {
        return unknown;
    }
}

var iOS = 'iOS';
var Android = 'Android';
var unknown = 'unknown';

exports['default'] = {
    isLocalStorageSupported: isLocalStorageSupported,
    getMobileOperatingSystem: getMobileOperatingSystem,
    iOS: iOS,
    Android: Android,
    unknown: unknown
};
module.exports = exports['default'];