// ==UserScript==
// @name         Get Token TEKO
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Get Bearer token on Frontend
// @author       _-ShiroNeko-_
// @match        https://*.teko.vn/*
// @match        https://*.vnpay.vn/*
// @match        https://*.vnpaytest.vn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teko.vn
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let interval = 1000;
    let fail_count = 0;

    unsafeWindow.checkWebsiteHasToken = function(){
        if (unsafeWindow.REACT_APP_IAM_CLIENT_ID != null) {
            return unsafeWindow.REACT_APP_IAM_CLIENT_ID;
        } else if (unsafeWindow.REACT_APP_CLIENT_ID != null) {
            return unsafeWindow.REACT_APP_CLIENT_ID;
        } else if (unsafeWindow.REACT_APP_IAM != null && unsafeWindow.REACT_APP_IAM.DEFAULT_CLIENT_ID != null) {
            return unsafeWindow.REACT_APP_IAM.DEFAULT_CLIENT_ID;
        } else if (unsafeWindow.config != null && unsafeWindow.config.iam != null && unsafeWindow.config.iam.clientId != null) {
            return unsafeWindow.config.iam.clientId;
        } else {
            return null;
        }
    };

    let loading = setInterval(function(){
        try {
            unsafeWindow.copyTokenToClipboard = function(){
                let token_content = window.localStorage[`tekoid.user.${unsafeWindow.tokenKey}`];
                let token = JSON.parse(token_content).accessToken;
                navigator.clipboard.writeText(token);
            };

            let token_key = unsafeWindow.checkWebsiteHasToken();
            if (token_key == null) {
                throw new Error();
            }
            else {
                unsafeWindow.tokenKey = token_key;
            }

            let a = document.createElement("a");
            let getToken = document.createTextNode("Get Token");

            a.appendChild(getToken);
            a.title = "Get Token";
            a.href = `javascript:copyTokenToClipboard();alert("Copied token to clipboard")`;

            document.getElementsByTagName("header")[0].appendChild(a);
            fail_count = -1;
        }
        catch {
            fail_count += 1;
        }
        finally {
            if (fail_count >= 10 || fail_count == -1) {
                clearInterval(loading);
            }
        }
    }, interval);
})();
