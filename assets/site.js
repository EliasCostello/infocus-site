// Store buttons + device detection, shared by every page.
(function () {
  var links = window.INFOCUS_LINKS || {};

  // iPadOS 13+ reports itself as a Mac, so a Mac with a touch screen is an iPad.
  function platform() {
    var ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
    if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return 'ios';
    if (/Android/i.test(ua)) return 'android';
    return 'other';
  }

  // Wire every [data-store] button: a live link opens the store, an empty one
  // becomes a disabled "Coming soon" button.
  function wireButtons() {
    var btns = document.querySelectorAll('[data-store]');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var url = links[b.getAttribute('data-store')];
      var sub = b.querySelector('.store-sub');
      if (url) {
        b.setAttribute('href', url);
        b.removeAttribute('aria-disabled');
        b.classList.remove('is-soon');
      } else {
        b.removeAttribute('href');
        b.setAttribute('aria-disabled', 'true');
        b.classList.add('is-soon');
        if (sub) sub.textContent = 'Coming soon';
      }
    }
    // Put the visitor's own store first.
    var p = platform();
    var row = document.querySelectorAll('.store-row');
    for (var j = 0; j < row.length; j++) {
      var first = row[j].querySelector(p === 'android' ? '[data-store="googlePlay"]' : '[data-store="appStore"]');
      if (first && p !== 'other') row[j].insertBefore(first, row[j].firstChild);
    }
  }

  // /download: send the phone straight to its store, else show the choices.
  function smartRedirect() {
    var p = platform();
    var target = p === 'ios' ? links.appStore : p === 'android' ? links.googlePlay : '';
    var msg = document.getElementById('download-status');
    if (target) {
      if (msg) msg.textContent = 'Taking you to the ' + (p === 'ios' ? 'App Store' : 'Google Play Store') + '…';
      window.location.replace(target);
      return;
    }
    if (!msg) return;
    if (p === 'ios') msg.textContent = 'InFocus for iPhone is coming soon.';
    else if (p === 'android') msg.textContent = 'InFocus for Android is coming soon.';
    else if (links.appStore || links.googlePlay) msg.textContent = 'Open this page on your phone, or pick your store below.';
    else msg.textContent = 'InFocus is coming soon to iPhone and Android.';
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    wireButtons();
    if (document.body.hasAttribute('data-download')) smartRedirect();
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
