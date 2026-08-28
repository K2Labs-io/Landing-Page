/* nav.js — sticky scroll shadow + mobile hamburger */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var nav        = document.querySelector('.nav');
    var hamburger  = document.querySelector('.nav-hamburger');
    var mobileMenu = document.querySelector('.nav-mobile');

    /* Scroll shadow */
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 8);
      }, { passive: true });
    }

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
        /* Close all */
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.classList.remove('open');
        });
        /* Open clicked (if it was closed) */
        if (!isOpen) item.classList.add('open');
      });
    });
  });
})();
