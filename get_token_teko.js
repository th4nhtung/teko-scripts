// ==UserScript==
// @name         Get Token TEKO
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get Bearer token on Frontend
// @author       _-ShiroNeko-_
// @match        https://sale-portal.dgl-test1.teko.vn/*
// @match        https://sale-portal.dgl-dev.teko.vn/*
// @match        https://sale-portal.dgl-staging.teko.vn/*
// @match        https://sp3.vnpay.vn/*
// @match        https://hr-orgchart.dgl-test1.teko.vn/*
// @match        https://hr-orgchart.dgl-dev.teko.vn/*
// @match        https://hr-orgchart.dgl-staging.teko.vn/*
// @match        https://hr-orgchart.vnpay.vn/*
// @match        https://partner-pilot.vnpaytest.vn/*
// @match        https://quanlyshop.vnpay.vn/
// @match        https://ticket-management.dgl-dev.teko.vn/*
// @match        https://ticket-management.dev.teko.vn/*
// @match        https://ticket-management.dgl-staging.teko.vn/*
// @match        https://ticket.vnpay.vn/*
// @match        https://id-admin.dgl-test1.teko.vn/*
// @match        https://id-admin.dgl-dev.teko.vn/*
// @match        https://id-admin.dgl-staging.teko.vn/*
// @match        https://id-admin-dgl.vnpay.vn/*
// @match        https://dgl-timesheet.dgl-test1.teko.vn/*
// @match        https://dgl-timesheet.dgl-dev.teko.vn/*
// @match        https://dgl-timesheet.dgl-staging.teko.vn/*
// @match        https://dgl-timesheet.vnpay.vn/*
// @match        https://ticket-management.dev.teko.vn/*
// @match        https://ticket-management.stag.teko.vn/*
// @match        https://ticket-management.teko.vn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teko.vn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let interval = 1000;
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
        interval += 1000;
    }, interval);
})();