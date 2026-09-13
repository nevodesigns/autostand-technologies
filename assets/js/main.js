/* ==========================================================================
   AutoStand Technologies — site behaviour
   No dependencies. Everything degrades gracefully without JS: the page is
   fully readable and navigable with this file removed.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------- Mobile navigation */
  function initMenu() {
    var btn = document.getElementById('menuBtn');
    var nav = document.querySelector('.nav');
    if (!btn || !nav) return;

    function close() {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) close();
    });
  }

  /* ------------------------------------------- Header state + read progress */
  function initHeader() {
    var head = document.getElementById('siteHead');
    var bar = document.getElementById('progress');
    if (!head) return;

    var ticking = false;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      head.classList.toggle('is-stuck', y > 8);

      if (bar) {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        var pct = max > 0 ? (y / max) * 100 : 0;
        bar.style.width = pct.toFixed(2) + '%';
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* ------------------------------------------------ Current section in nav */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav a[href^="#"]')
    );
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var targets = [];

    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) {
        map[id] = a;
        targets.push(el);
      }
    });

    var visible = {};

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
      });

      var best = null;
      var bestRatio = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > bestRatio) {
          bestRatio = visible[id];
          best = id;
        }
      });

      links.forEach(function (a) { a.classList.remove('is-current'); });
      if (best && map[best]) map[best].classList.add('is-current');
    }, {
      rootMargin: '-25% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    targets.forEach(function (t) { io.observe(t); });
  }

  /* ------------------------------------------------------ Reveal on scroll */
  function initReveal() {
    var blocks = document.querySelectorAll(
      '.sec-head, .split, .deflist, .flow-scroll, .stages, .table-scroll, ' +
      '.segments, .roadmap, .people, .contact, .figures, .hero__copy, .hero__fig'
    );

    if (!blocks.length) return;

    if (reduced || !('IntersectionObserver' in window)) return;

    Array.prototype.forEach.call(blocks, function (el) {
      el.setAttribute('data-reveal', '');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    Array.prototype.forEach.call(blocks, function (el) { io.observe(el); });

    // Anything already in view on load should not wait for a scroll event.
    window.requestAnimationFrame(function () {
      Array.prototype.forEach.call(blocks, function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('is-in');
      });
    });
  }

  /* ------------------------------------------------------------------ Boot */
  function boot() {
    initMenu();
    initHeader();
    initScrollSpy();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
