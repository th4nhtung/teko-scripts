// ==UserScript==
// @name         Beautify Web Kubectl
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix footer and reorder sessions
// @author       _-ShiroNeko-_
// @match        https://console.dgl-dev.teko.vn/*
// @match        https://console.digilife.local/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teko.vn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let interval = 50;
    let loading = setInterval(function(){
        let footers_div = document.getElementsByClassName("footer");
        let sessions_div = document.getElementsByClassName("list-group list-group-flush");
        if (footers_div.length > 0 && sessions_div.length > 0) {
            // fix footer position not at end of page
            footers_div[0].style.setProperty("bottom", "auto");

            // reorder list sessions by session name
            let sessions = sessions_div[0].children;
            let session_mapping = [];
            Array.from(sessions).forEach((session, idx) => session_mapping.push({"session_name": session.children[0].children[0].children[0].innerText, "order": 0}));
            session_mapping.sort(function(session_a, session_b) {
                if (session_a.session_name < session_b.session_name) return -1;
                if (session_a.session_name > session_b.session_name) return 1;
                return 0;
            });
            session_mapping.forEach((session, idx) => session.order = idx);

            let find_session_order = function(session_name) {
                for (let session of session_mapping) {
                    if (session.session_name == session_name) {
                        return session.order;
                    }
                }
            };

            for (let idx = 0; idx < sessions.length; ++idx) {
                sessions[idx].style.setProperty("order", find_session_order(sessions[idx].children[0].children[0].children[0].innerText));
            }

            // clear interval
            clearInterval(loading);
        }
        interval += 50;
    }, interval);
})();