// ==UserScript==
// @name         Google Meet Anonymous
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto Turn off Camera & Microphone on Google Meet
// @author       _-ShiroNeko-_
// @match        https://meet.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meet.google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let interval = 200;
    let loading = setInterval(function(){
        let buttons = document.querySelectorAll("[jscontroller=lCGUBd]");
        if (buttons != null && buttons.length == 2) {
            if (buttons[0].attributes["data-is-muted"].value == "false") {
                buttons[0].click();
            }
            if (buttons[1].attributes["data-is-muted"].value == "false") {
                buttons[1].click();
            }
            clearInterval(loading);
        }
        interval += 50;
    }, interval);
})();