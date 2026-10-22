// ==UserScript==
// @name         Gemini: Hide Upgrade Button
// @namespace    https://github.com/R-Tatara
// @version      2026-10-24
// @description  Hide the "Upgrade" button in the top-right corner of Gemini
// @author       R-Tatara
// @match        https://gemini.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gemini.google.com
// @updateURL    https://raw.githubusercontent.com/R-Tatara/tampermonkey-scripts/main/scripts/gemini.user.js
// @downloadURL  https://raw.githubusercontent.com/R-Tatara/tampermonkey-scripts/main/scripts/gemini.user.js
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  GM_addStyle(`
    [data-test-id="g1-dynamic-advanced-upsell-button"],
    [data-test-id="bard-g1-dynamic-upsell-menu-button"],
    g1-dynamic-upsell-button,
    .buttons-container.adv-upsell,
    gem-button[fonticonname="download"],
    gem-button:has(span[_ngcontent-ng-c3223631938]:not(:empty)) {
      display: none !important;
    }
  `);

  console.log('[Hide Upgrade & Download Buttons] Style applied successfully.');
})();
