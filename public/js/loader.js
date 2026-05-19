'use strict';
/* ── LOADER — splash screen ── */
(function () {
  var loader = document.getElementById('page-loader');
  if (!loader) return;

  function hide() {
    loader.classList.add('pl-hidden');
    /* Limpia el DOM después de la transición para no bloquear accesibilidad */
    loader.addEventListener('transitionend', function () {
      loader.style.display = 'none';
    }, { once: true });
  }

  /* Si la página ya cargó (cached), oculta rápido */
  if (document.readyState === 'complete') {
    setTimeout(hide, 350);
  } else {
    window.addEventListener('load', function () {
      /* Mínimo 500ms para que la animación de la barra complete */
      setTimeout(hide, 520);
    });
  }
})();
