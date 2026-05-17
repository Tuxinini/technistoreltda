'use strict';

/* ── 1. HEADER SCROLL GLASSMORPHISM ── */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── 2. SCROLL REVEAL (IntersectionObserver) ── */
(function () {
  var selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  var elements = document.querySelectorAll(selector);
  if (!elements.length || !window.IntersectionObserver) {
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(function (el) { observer.observe(el); });
})();

/* ── 3. ANIMATED COUNTERS ── */
(function () {
  var counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length || !window.IntersectionObserver) return;

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var separator = el.getAttribute('data-separator') || '';
    var duration = 2000;
    var startTime = null;

    function tick(now) {
      if (!startTime) startTime = now;
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var value = Math.round(easeOutQuart(progress) * target);
      var display = value.toString();
      if (separator && value >= 1000) {
        display = value.toLocaleString('es-CO').replace(/,/g, separator);
      }
      el.textContent = prefix + display;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var observed = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !observed) {
        observed = true;
        counters.forEach(function (el) { animateCounter(el); });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  var statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
})();

/* ── 4. HAMBURGER MENU ── */
(function () {
  var btn = document.getElementById('nav-hamburger');
  var menu = document.getElementById('nav-mobile-menu');
  if (!btn || !menu) return;

  function closeMobileMenuFn() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }

  window.closeMobileMenu = closeMobileMenuFn;

  btn.addEventListener('click', function () {
    var isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeMobileMenuFn();
    } else {
      btn.classList.add('open');
      menu.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
    }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-container')) closeMobileMenuFn();
  });
})();

/* ── 5. MARQUEE CLIENTES: PAUSAR EN HOVER ── */
(function () {
  var track = document.querySelector('.ts-marquee-track');
  if (!track) return;
  track.addEventListener('mouseenter', function () {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', function () {
    track.style.animationPlayState = 'running';
  });
})();

/* ── 6. OFFER CARDS: ANIMACIÓN DE ENTRADA ── */
(function () {
  var cards = document.querySelectorAll('.ts-offer-card');
  cards.forEach(function (card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease ' + (i * 120) + 'ms, transform 0.5s ease ' + (i * 120) + 'ms';
    setTimeout(function () {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 120);
  });
})();

/* ── 7. AÑO EN FOOTER ── */
(function () {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
