// ==UserScript==
// @name         Get Token TEKO
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Get Bearer token on Frontend
// @author       _-ShiroNeko-_
// @match        https://*.teko.vn/*
// @match        https://*.vnpay.vn/*
// @match        https://*.vnpaytest.vn/*
// @exclude      https://jira.teko.vn/*
// @exclude      https://confluence.teko.vn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teko.vn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let interval = 2000;
    let fail_count = 0;
    let loading = setInterval(function(){
        if (document.getElementsByTagName("header").length > 0) {
            let token_content_key = null;
            if (window.REACT_APP_IAM_CLIENT_ID != null) {
                token_content_key = window.REACT_APP_IAM_CLIENT_ID;
            } else if (window.REACT_APP_CLIENT_ID != null) {
                token_content_key = window.REACT_APP_CLIENT_ID;
            } else if (window.REACT_APP_IAM != null && window.REACT_APP_IAM.DEFAULT_CLIENT_ID != null) {
                token_content_key = window.REACT_APP_IAM.DEFAULT_CLIENT_ID;
            } else if (window.config != null && window.config.iam != null && window.config.iam.clientId != null) {
                token_content_key = window.config.iam.clientId;
            } else {
                token_content_key = "";
            }
            let token_content = window.localStorage[`tekoid.user.${token_content_key}`];
            let token = JSON.parse(token_content).accessToken;
            let a = document.createElement("a");
            let getToken = document.createTextNode("Get Token");
            a.appendChild(getToken);
            a.title = "Get Token";
            a.href = `javascript:navigator.clipboard.writeText("${token}");alert("Copied token to clipboard")`;
            document.getElementsByTagName("header")[0].appendChild(a);
            clearInterval(loading);
        }
        else {
            fail_count += 1;
            if (fail_count > 10) {
                clearInterval(loading);
            }
        }
    }, interval);
})();
