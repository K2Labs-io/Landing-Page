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
        /* Close all */
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.classList.remove('open');
        });
        /* Open clicked (if it was closed) */
        if (!isOpen) item.classList.add('open');
      });
    });

    /* Back to top */
    var backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Back to top');
    backBtn.innerHTML = '&#8679;';
    document.body.appendChild(backBtn);

    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY || document.documentElement.scrollTop || 0;
      backBtn.classList.toggle('visible', scrolled > 200);
    }, { passive: true });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
