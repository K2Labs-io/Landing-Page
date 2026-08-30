/* nav.js — mobile hamburger + back-to-top */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var hamburger  = document.querySelector('.nav-hamburger');
    var mobileMenu = document.querySelector('.nav-mobile');

    /* Hamburger toggle */
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
      });

      /* Close on mobile link click */
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* FAQ accordion */
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.classList.remove('open');
        });
        if (!isOpen) item.classList.add('open');
      });
    });

    /* Back to top */
    var backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Back to top');
    backBtn.innerHTML = '&uarr;';
    document.body.appendChild(backBtn);

    function getScrollY() {
      return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

    function onScroll() {
      backBtn.classList.toggle('visible', getScrollY() > 150);
    }

    window.addEventListener('scroll',   onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
