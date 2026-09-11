/* consent.js — cookie consent banner + gated Google Tag Manager loader
   Shows a banner on first visit; GTM (and anything added inside the GTM
   container later) only loads after the visitor clicks Accept. The choice
   is remembered in localStorage so the banner doesn't reappear. */
(function () {
  'use strict';

  var GTM_ID = 'GTM-WJ5SX8ZM';
  var STORAGE_KEY = 'cg_consent'; // 'accepted' | 'declined'

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  function loadGTM() {
    if (window._gtmLoaded) return;
    window._gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = document.getElementsByTagName('script')[0];
    var j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    f.parentNode.insertBefore(j, f);
  }

  /* Path back to the site root, derived from this script's own src so the
     banner's privacy-policy link works no matter how deep the page is. */
  function rootPath() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      var idx = src.indexOf('js/consent.js');
      if (idx !== -1) return src.slice(0, idx);
    }
    return '';
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<p class="consent-banner-text">We use cookies to understand how CamGrader is used and improve the site. ' +
      'See our <a href="' + rootPath() + 'privacy" class="consent-banner-link">Privacy Policy</a>.</p>' +
      '<div class="consent-banner-actions">' +
        '<button type="button" class="consent-btn consent-btn-decline">Decline</button>' +
        '<button type="button" class="consent-btn consent-btn-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.consent-btn-accept').addEventListener('click', function () {
      setConsent('accepted');
      loadGTM();
      banner.parentNode.removeChild(banner);
    });
    banner.querySelector('.consent-btn-decline').addEventListener('click', function () {
      setConsent('declined');
      banner.parentNode.removeChild(banner);
    });
  }

  function init() {
    var consent = getConsent();
    if (consent === 'accepted') {
      loadGTM();
    } else if (consent === 'declined') {
      /* respect the visitor's choice — do nothing */
    } else {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
