/* consent.js — cookie consent banner + gated Google Tag Manager loader
   Shows a banner on first visit; GTM (and anything added inside the GTM
   container later) only loads after the visitor clicks Accept. The choice
   is remembered in localStorage so the banner doesn't reappear on later
   visits. A "Cookie Preferences" link in the footer (present on every page)
   reopens the banner so a visitor can change their mind at any time —
   GDPR requires withdrawing consent to be as easy as giving it. */
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

  /* isChange: true when reopened from the "Cookie Preferences" link (an
     existing choice is being revisited), false on a first-visit prompt.
     On a change, the page reloads after the new choice is saved so GTM
     either starts fresh or is guaranteed not to be running — GTM can't be
     cleanly "unloaded" from a live page once its script has executed. */
  function showBanner(isChange) {
    var existing = document.querySelector('.consent-banner');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

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
      if (isChange) {
        location.reload();
      } else {
        loadGTM();
        banner.parentNode.removeChild(banner);
      }
    });
    banner.querySelector('.consent-btn-decline').addEventListener('click', function () {
      setConsent('declined');
      if (isChange) {
        location.reload();
      } else {
        banner.parentNode.removeChild(banner);
      }
    });
  }

  /* Wires up every "Cookie Preferences" footer link on the page (there's
     normally just one) to reopen the banner regardless of the stored choice. */
  function wirePreferencesLinks() {
    var links = document.querySelectorAll('.js-cookie-preferences');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        e.preventDefault();
        showBanner(true);
      });
    }
  }

  function init() {
    var consent = getConsent();
    if (consent === 'accepted') {
      loadGTM();
    } else if (consent === 'declined') {
      /* respect the visitor's choice — do nothing */
    } else {
      showBanner(false);
    }
    wirePreferencesLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
