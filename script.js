/**
 * By Char Studio — script.js
 * Handles: hamburger nav, active link highlighting, header scroll state,
 * smooth section reveal, and dynamic year in footer.
 */

/* ─────────────────────── Hamburger Menu ─────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      // Trap: close on outside click
      document.addEventListener('click', closeOnOutside, { once: true });
    }
  });

  function closeOnOutside(event) {
    if (!navMenu.contains(event.target) && event.target !== hamburger) {
      navMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // Close on nav link click (mobile)
  navMenu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });
})();

/* ─────────────────────── Sticky Header State ─────────────────────── */
(function initScrollHeader() {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var ticking = false;

  function updateHeader() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
})();

/* ─────────────────────── Active Nav Link on Scroll ─────────────────────── */
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + id
            );
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

/* ─────────────────────── Section Reveal on Scroll ─────────────────────── */
(function initReveal() {
  var style = document.createElement('style');
  style.textContent = [
    '.reveal {',
    '  opacity: 0;',
    '  transform: translateY(24px);',
    '  transition: opacity 0.55s ease, transform 0.55s ease;',
    '}',
    '.reveal.visible {',
    '  opacity: 1;',
    '  transform: translateY(0);',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  var elements = document.querySelectorAll(
    '.card, .about__text, .about__team, .section__header, .contact-card'
  );

  elements.forEach(function (el) {
    el.classList.add('reveal');
  });

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  elements.forEach(function (el) {
    revealObserver.observe(el);
  });
})();

/* ─────────────────────── Dynamic Year ─────────────────────── */
(function setYear() {
  var el = document.getElementById('year');
  if (el) {
    el.textContent = new Date().getFullYear().toString();
  }
})();
