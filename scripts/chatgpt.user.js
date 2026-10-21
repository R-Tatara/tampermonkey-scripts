// ==UserScript==
// @name         ChatGPT: Hide Upgrade Buttons & Free Label
// @namespace    https://github.com/R-Tatara
// @version      1.0.0
// @description  chatgpt.com の「アップグレード」ボタンと「無料」表示を非表示にする
// @author       R-Tatara
// @match        https://chatgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @updateURL    https://raw.githubusercontent.com/R-Tatara/tampermonkey-scripts/main/scripts/chatgpt.user.js
// @downloadURL  https://raw.githubusercontent.com/R-Tatara/tampermonkey-scripts/main/scripts/chatgpt.user.js
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // 1. 既知のクラス名で確実に隠す
  GM_addStyle(`
    button.text-text-header-upgrade,
    [data-hide-upgrade="true"] {
      display: none !important;
    }
  `);

  // 2. アップグレードボタン（テキスト判定）
  const UPGRADE_PATTERN = /アップグレード|Upgrade/i;
  const MAX_TEXT_LENGTH = 30;

  // 3. 「無料」ラベル（テキストが完全一致する末端の span のみ）
  const FREE_LABEL_TEXT = '無料';

  function hideUpgradeButtons() {
    for (const el of document.querySelectorAll('button, a')) {
      if (el.dataset.hideUpgrade === 'true') continue;
      const text = el.textContent.trim();
      if (text.length <= MAX_TEXT_LENGTH && UPGRADE_PATTERN.test(text)) {
        el.dataset.hideUpgrade = 'true';
      }
    }
  }

  function hideFreeLabels() {
    for (const el of document.querySelectorAll('span')) {
      if (el.dataset.hideUpgrade === 'true') continue;
      if (el.children.length > 0) continue; // 末端の要素のみ対象
      if (el.textContent.trim() === FREE_LABEL_TEXT) {
        el.dataset.hideUpgrade = 'true';
      }
    }
  }

  function hideAll() {
    hideUpgradeButtons();
    hideFreeLabels();
  }

  // 4. DOMの変化を監視（連続した変化はまとめて処理）
  let scheduled = false;
  function scheduleHide() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      hideAll();
    });
  }

  const observer = new MutationObserver(scheduleHide);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // 初回実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideAll);
  } else {
    hideAll();
  }

  console.log('[Hide Upgrade Buttons & Free Label] Script loaded.');
})();