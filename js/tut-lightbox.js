/**
 * tut-lightbox.js
 * Shared click-to-enlarge behavior for tutorial screenshots (.tut-shot images).
 * Expects one .tut-lightbox container per page, with a .tut-lightbox-close
 * button and an <img> inside it - see any support/.../index.html tutorial
 * page for the markup this expects.
 */
(function () {
  function init() {
    var lightbox = document.querySelector('.tut-lightbox');
    if (!lightbox) return;
    var lightboxImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.tut-lightbox-close');

    function open(src, alt) {
      lightboxImg.setAttribute('src', src);
      lightboxImg.setAttribute('alt', alt || '');
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('is-open');
      lightboxImg.removeAttribute('src');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      var shot = e.target.closest ? e.target.closest('.tut-shot') : null;
      if (shot) {
        open(shot.getAttribute('src'), shot.getAttribute('alt'));
        return;
      }
      if (e.target === closeBtn || e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
