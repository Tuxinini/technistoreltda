/* ========================================
   TNT Technistore Ltda - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // HERO SLIDER
  // ==========================================
  const track = document.getElementById('sliderTrack');
  const dots  = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const totalSlides = dots.length;
  let current = 0;
  let autoTimer = null;

  function goTo(index) {
    current = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  prevBtn && prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn && nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(+dot.dataset.index); startAuto(); });
  });

  // Touch swipe
  let touchStartX = 0;
  track && track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track && track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); startAuto(); }
  });

  startAuto();

  // ==========================================
  // SCROLL FADE-IN ANIMATIONS (IntersectionObserver)
  // ==========================================
  const animEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animEls.forEach(el => observer.observe(el));

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const counters = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target    = parseInt(el.dataset.target, 10);
    const prefix    = el.dataset.prefix || '';
    const separator = el.dataset.separator || '';
    const duration  = 2000;
    const start     = performance.now();

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      let display    = value.toString();

      // Insert separator for thousands (e.g. 1.200)
      if (separator && value >= 1000) {
        display = display.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      }

      el.textContent = prefix + display;

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ==========================================
  // ACCORDION
  // ==========================================
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      const body     = this.nextElementSibling;
      const isOpen   = this.classList.contains('open');
      const allBodies  = document.querySelectorAll('.accordion-body');
      const allHeaders = document.querySelectorAll('.accordion-header');

      // Close all
      allBodies.forEach(b => (b.style.maxHeight = '0'));
      allHeaders.forEach(h => h.classList.remove('open'));

      // Open clicked if it was closed
      if (!isOpen) {
        this.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion item by default
  const firstHeader = document.querySelector('.accordion-header');
  const firstBody   = document.querySelector('.accordion-body');
  if (firstHeader && firstBody) {
    firstHeader.classList.add('open');
    firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // ==========================================
  // STICKY HEADER - highlight active link on scroll
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-links a, .nav-right a');
  window.addEventListener('scroll', () => {
    // Parallax hint for hero – subtle
    const hero = document.querySelector('.hero-slider');
    if (hero) {
      const scroll = window.pageYOffset;
      const speed = 0.3;
      // Only subtle effect; actual parallax inside slides via CSS
    }
  });

});
