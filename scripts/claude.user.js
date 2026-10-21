// ==UserScript==
// @name         Claude: Hide Free Plan Upgrade Notice
// @namespace    https://github.com/R-Tatara
// @version      1.0.0
// @description  Hide the "Free Plan Upgrade" display on claude.ai.
// @author       R-Tatara
// @match        https://claude.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @updateURL    https://raw.githubusercontent.com/R-Tatara/tampermonkey-scripts/main/scripts/claude.user.js
// @downloadURL  https://raw.githubusercontent.com/R-Tatara/tampermonkey-scripts/main/scripts/claude.user.js
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  GM_addStyle(`
    div[data-new-page-notice-stack="true"] {
      display: none !important;
    }
  `);

  console.log('[Hide Free Plan Notice] Style applied successfully.');
})();