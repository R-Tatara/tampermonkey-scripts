// ==UserScript==
// @name         Claude: Hide Free Plan Upgrade Notice
// @namespace    https://github.com/R-Tatara
// @version      2026-10-24
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

  // Method A: Hide the whole notice stack.
  // Confirmed to work in Brave.
  GM_addStyle(`
    div[data-new-page-notice-stack="true"] {
      display: none !important;
    }
  `);

  // Method B: Hide only the banner that has an upgrade link and a close button.
  // Kept as a separate rule so that if one selector stops matching,
  // the other still applies.
  // Note: this depends on the Japanese aria-label, so it will not match in English UI.
  GM_addStyle(`
    div:has(> span > a[href^="/upgrade"]):has(> button[aria-label="アップグレードバナーを閉じる"]) {
      display: none !important;
    }
  `);

  // Method C: Hide the "Freeプラン" and "アップグレード" badge.
  // Targets the parent element containing the upgrade link and close button.
  GM_addStyle(`
    div:has(> span > a[href="/upgrade"]):has(> button[aria-label="アップグレードバナーを閉じる"]) {
      display: none !important;
    }
  `);

  console.log('[Hide Free Plan Notice] Style applied successfully.');
})();
