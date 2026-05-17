# Tecnistore Homepage Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescritura total de `public/index.html` y `public/css/style.css`, nuevo `public/js/animations.js`, y limpieza de 4 carpetas innecesarias en la raíz del proyecto.

**Architecture:** HTML semántico puro + CSS con custom properties centralizadas. Las animaciones usan `IntersectionObserver` (scroll reveal, counters) y `window.scroll` (header sticky glassmorphism). `main.js` no se toca — se conservan todas sus clases CSS (`.ts-prod-card`, `.ts-prod-badge`, etc.).

**Tech Stack:** HTML5, CSS3 (custom properties, keyframes, grid, flexbox), Vanilla JS ES5-compatible, Google Fonts (Lato), Google Maps embed.

---

## Mapa de archivos

| Archivo | Acción | Notas |
|---|---|---|
| `public/index.html` | Reescritura completa | Construido sección por sección en Tasks 2–12 |
| `public/css/style.css` | Reescritura completa | CSS agregado por sección en Tasks 2–13 |
| `public/js/animations.js` | Nuevo | Header scroll, reveal, counters, marquee, hamburger |
| `public/js/main.js` | Sin cambios | Conservar clases: `.ts-prod-card`, `.ts-prod-badge`, `.ts-prod-img-wrap`, `.ts-prod-info`, `.ts-prod-brand`, `.ts-prod-name`, `.ts-prod-stars`, `.ts-star`, `.ts-prod-prices`, `.ts-prod-price`, `.ts-prod-old`, `.ts-prod-disc-tag`, `.ts-prod-cta` |
| `UsersfloreDownloadssuperpowers/` | Eliminar | Plugin externo |
| `Video/` | Eliminar | No usado en producción |
| `wp-backups/` | Eliminar | Backups obsoletos |
| `media-assets/` | Eliminar | Solo contiene un .zip |

---

## Task 1: Limpieza de carpetas raíz

**Files:**
- Delete: `UsersfloreDownloadssuperpowers/`
- Delete: `Video/`
- Delete: `wp-backups/`
- Delete: `media-assets/`

- [ ] **Paso 1: Eliminar carpetas innecesarias**

```bash
cd "c:/Users/flore/Downloads/Tecnistore SEO"
rm -rf "UsersfloreDownloadssuperpowers" "Video" "wp-backups" "media-assets"
```

- [ ] **Paso 2: Verificar que quedan solo las carpetas correctas**

```bash
ls -la
```

Esperado: solo `.claude/`, `.git/`, `.github/`, `Productos/`, `docs/`, `node_modules/`, `public/`, `tools/`, y los archivos raíz (`package.json`, `netlify.toml`, etc.).

- [ ] **Paso 3: Commit**

```bash
git add -A
git commit -m "chore: remove unnecessary root folders (superpowers plugin, video, wp-backups, media-assets)"
```

---

## Task 2: Esqueleto de `index.html` + Fundación de `style.css`

**Files:**
- Rewrite: `public/index.html`
- Rewrite: `public/css/style.css`

- [ ] **Paso 1: Crear el nuevo `public/index.html`** con el esqueleto completo (head + body vacío con placeholders para cada sección):

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tecnistore | Soluciones Tecnológicas en Bogotá</title>
  <meta name="description" content="Tecnistore — Tu tienda de tecnología en Bogotá. Celulares, portátiles, periféricos y más con garantía de fábrica. +28 años de experiencia. Envíos a todo Colombia.">
  <meta name="keywords" content="tecnología Bogotá, celulares, portátiles, periféricos, computadores, Colombia, Tecnistore">
  <link rel="canonical" href="https://tntltda.com/">
  <!-- Open Graph -->
  <meta property="og:title" content="Tecnistore | Soluciones Tecnológicas">
  <meta property="og:description" content="Tu aliado tecnológico en Bogotá. Celulares, portátiles, periféricos y más con garantía de fábrica.">
  <meta property="og:image" content="/wp-content/uploads/2021/03/Tnt.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://tntltda.com/">
  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tecnistore — TNT Technistore Ltda.",
    "telephone": "+57-322-581-7129",
    "email": "comercial1@tntltda.com",
    "url": "https://tntltda.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrera 15 # 77-05",
      "addressLocality": "Bogotá",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 4.6682,
      "longitude": -74.0578
    },
    "openingHours": "Mo-Fr 08:00-18:00",
    "priceRange": "$$"
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <!-- TOP BAR -->
  <!-- HEADER -->
  <!-- SECTION: PROMOCIONES -->
  <!-- SECTION: PRODUCTOS DESTACADOS -->
  <!-- MODAL PRODUCTO -->
  <!-- SECTION: CATEGORÍAS -->
  <!-- SECTION: GARANTÍAS -->
  <!-- SECTION: EMPRESA / STATS -->
  <!-- SECTION: CLIENTES -->
  <!-- SECTION: CONTACTO -->
  <!-- FOOTER -->
  <!-- WHATSAPP FLOTANTE -->
  <script src="/js/main.js"></script>
  <script src="/js/animations.js"></script>
</body>
</html>
```

- [ ] **Paso 2: Crear el nuevo `public/css/style.css`** con la fundación completa:

```css
/* ═══════════════════════════════════════════════
   TECNISTORE — style.css  (reescritura completa)
   ═══════════════════════════════════════════════ */

/* ── VARIABLES ── */
:root {
  --color-primary:    #00aee8;
  --color-dark:       #060d1a;
  --color-mid:        #0a1f3d;
  --color-accent:     #ff6b2b;
  --color-bg-light:   #f4f8fc;
  --color-bg-off:     #f8f9fa;
  --color-text:       #1a1a2e;
  --color-text-muted: #6b7a99;
  --color-text-light: #a0b0c8;
  --font-main:        'Lato', 'Open Sans', Arial, sans-serif;
  --radius:           12px;
  --radius-lg:        20px;
  --shadow-card:      0 8px 32px rgba(0,0,0,0.10);
  --shadow-hover:     0 16px 48px rgba(0,0,0,0.20);
  --transition:       0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --max-width:        1200px;
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-main); color: var(--color-text); overflow-x: hidden; background: #fff; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
img { max-width: 100%; height: auto; display: block; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* ── TIPOGRAFÍA ── */
h1 { font-size: clamp(32px, 5vw, 56px); font-weight: 900; line-height: 1.1; }
h2 { font-size: clamp(24px, 3.5vw, 36px); font-weight: 700; line-height: 1.2; }
h3 { font-size: 18px; font-weight: 700; }

/* ── UTILIDADES ── */
.container { max-width: var(--max-width); margin: 0 auto; padding: 0 20px; }
.section-title {
  text-align: center;
  margin-bottom: 48px;
  position: relative;
}
.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  margin: 12px auto 0;
  border-radius: 2px;
}

/* ── SCROLL REVEAL ── */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-left.visible {
  opacity: 1;
  transform: translateX(0);
}
.reveal-right {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-right.visible {
  opacity: 1;
  transform: translateX(0);
}
.reveal-scale {
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-scale.visible {
  opacity: 1;
  transform: scale(1);
}
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }
.delay-4 { transition-delay: 0.4s; }
.delay-5 { transition-delay: 0.5s; }
```

- [ ] **Paso 3: Verificar que el archivo abre sin errores en el navegador**

Abrir `public/index.html` directamente en el navegador (o usar `npx serve public`). Debe mostrar una página en blanco sin errores en la consola.

- [ ] **Paso 4: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: scaffold new index.html and style.css foundation with CSS custom properties"
```

---

## Task 3: Top Bar + Header

**Files:**
- Modify: `public/index.html` (reemplazar comentarios `<!-- TOP BAR -->` y `<!-- HEADER -->`)
- Modify: `public/css/style.css` (agregar al final)

- [ ] **Paso 1: Reemplazar `<!-- TOP BAR -->` y `<!-- HEADER -->` en `index.html`** con:

```html
<!-- ══ TOP BAR ══ -->
<div class="top-bar" role="banner">
  <div class="top-bar-inner container">
    <div class="top-bar-left">
      <span class="tb-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        <a href="tel:6016336364">(601) 633-6364</a>
      </span>
      <span class="tb-sep">|</span>
      <span class="tb-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <a href="mailto:comercial1@tntltda.com">comercial1@tntltda.com</a>
      </span>
    </div>
    <div class="top-bar-right">
      <a href="https://wa.me/573225817129" class="tb-wa" target="_blank" rel="noopener">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </div>
  </div>
</div>

<!-- ══ HEADER ══ -->
<header class="site-header" id="inicio">
  <!-- Fila búsqueda -->
  <div class="header-search-row">
    <div class="header-search-inner container">
      <a href="/" class="hs-logo" aria-label="Tecnistore inicio">
        <img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" width="140" height="50">
      </a>
      <div class="hs-search-wrap">
        <input type="search" id="search-input" placeholder="Buscar productos, marcas, categorías..." aria-label="Buscar productos">
        <button type="button" onclick="doSearch()" aria-label="Buscar">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          Buscar
        </button>
      </div>
      <button class="hs-cart-btn" onclick="openCart()" aria-label="Carrito de compras">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
        <span class="hs-cart-label">Carrito</span>
        <span class="hs-cart-badge" id="cart-count">0</span>
      </button>
    </div>
  </div>
  <!-- Nav -->
  <nav class="nav-container" aria-label="Navegación principal">
    <div class="nav-inner container">
      <div class="nav-links-left">
        <a href="#inicio">INICIO</a>
        <a href="#nosotros">NOSOTROS</a>
        <a href="/tienda/">TIENDA</a>
      </div>
      <div class="nav-logo-center">
        <a href="/"><img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" width="110" height="40" loading="eager"></a>
      </div>
      <div class="nav-links-right">
        <a href="#contacto">CONTACTO</a>
        <a href="/mi-cuenta/" class="nav-btn-login">INICIAR SESIÓN</a>
      </div>
      <!-- Hamburguesa móvil -->
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Abrir menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
    <!-- Menú móvil -->
    <div class="nav-mobile-menu" id="nav-mobile-menu" aria-hidden="true">
      <a href="#inicio" onclick="closeMobileMenu()">INICIO</a>
      <a href="#nosotros" onclick="closeMobileMenu()">NOSOTROS</a>
      <a href="/tienda/">TIENDA</a>
      <a href="#contacto" onclick="closeMobileMenu()">CONTACTO</a>
      <a href="/mi-cuenta/">INICIAR SESIÓN</a>
    </div>
  </nav>
</header>
```

- [ ] **Paso 2: Agregar al final de `style.css` el CSS del Top Bar y Header:**

```css
/* ══ TOP BAR ══ */
.top-bar {
  background: linear-gradient(90deg, #008fc2 0%, var(--color-primary) 50%, #008fc2 100%);
  color: #fff;
  font-size: 12.5px;
  font-weight: 500;
}
.top-bar-inner {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-bar-left, .top-bar-right { display: flex; align-items: center; }
.tb-item { display: flex; align-items: center; gap: 6px; padding: 0 14px; }
.tb-sep { color: rgba(255,255,255,0.35); font-size: 14px; padding: 0 4px; }
.top-bar a, .tb-wa { color: #fff; transition: opacity var(--transition); }
.top-bar a:hover, .tb-wa:hover { opacity: 0.8; }
.tb-wa { display: flex; align-items: center; gap: 6px; padding: 0 14px; font-weight: 600; }

/* ══ HEADER ══ */
.site-header {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border-bottom: 3px solid var(--color-primary);
  transition: background var(--transition), box-shadow var(--transition), border-color var(--transition);
}
.site-header.scrolled {
  background: rgba(6,13,26,0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 24px rgba(0,0,0,0.30);
  border-bottom-color: var(--color-primary);
}
.site-header.scrolled .nav-links-left a,
.site-header.scrolled .nav-links-right a,
.site-header.scrolled .nav-btn-login,
.site-header.scrolled .hs-cart-btn { color: #fff; }
.site-header.scrolled .hs-search-wrap input { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.2); }
.site-header.scrolled .hs-search-wrap input::placeholder { color: rgba(255,255,255,0.5); }

/* Fila búsqueda */
.header-search-row { padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
.header-search-inner { display: flex; align-items: center; gap: 16px; }
.hs-logo img { height: 44px; width: auto; object-fit: contain; }
.hs-search-wrap {
  flex: 1;
  display: flex;
  border: 1.5px solid #e0e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color var(--transition);
}
.hs-search-wrap:focus-within { border-color: var(--color-primary); }
.hs-search-wrap input {
  flex: 1;
  padding: 9px 14px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: var(--font-main);
  background: transparent;
}
.hs-search-wrap button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  transition: background var(--transition);
}
.hs-search-wrap button:hover { background: #0097cc; }
.hs-cart-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1.5px solid #e0e8f0;
  transition: all var(--transition);
  white-space: nowrap;
  position: relative;
}
.hs-cart-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.hs-cart-badge {
  position: absolute;
  top: -6px; right: -6px;
  background: var(--color-accent);
  color: #fff;
  font-size: 10px;
  font-weight: 900;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

/* Nav */
.nav-container { border-top: 1px solid rgba(0,0,0,0.04); }
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  position: relative;
}
.nav-logo-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.nav-logo-center img { height: 36px; width: auto; }
.nav-links-left, .nav-links-right {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.nav-links-left a, .nav-links-right a {
  color: var(--color-text);
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: color var(--transition), border-color var(--transition);
}
.nav-links-left a:hover, .nav-links-right a:hover { color: var(--color-primary); border-bottom-color: var(--color-primary); }
.nav-btn-login {
  background: var(--color-primary);
  color: #fff !important;
  padding: 6px 14px !important;
  border-radius: 6px;
  border-bottom: none !important;
  font-size: 12px;
  transition: background var(--transition) !important;
}
.nav-btn-login:hover { background: #0097cc !important; }

/* Hamburguesa */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  z-index: 10;
}
.nav-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all 0.3s ease;
}
.site-header.scrolled .nav-hamburger span { background: #fff; }
.nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; }
.nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Menú móvil */
.nav-mobile-menu {
  display: none;
  flex-direction: column;
  background: var(--color-dark);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}
.nav-mobile-menu.open { max-height: 320px; }
.nav-mobile-menu a {
  color: #fff;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background var(--transition);
}
.nav-mobile-menu a:hover { background: rgba(0,174,232,0.15); }
```

- [ ] **Paso 3: Verificar en el navegador** que el top bar cian y el header aparecen correctamente. Al hacer scroll no debe cambiar todavía (eso viene en Task 4).

- [ ] **Paso 4: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add top bar and sticky header with glassmorphism scroll class"
```

---

## Task 4: `animations.js` — Todos los comportamientos JS de animación

**Files:**
- Create: `public/js/animations.js`

- [ ] **Paso 1: Crear `public/js/animations.js`** con el contenido completo:

```js
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
  var revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
  var selector = revealClasses.join(', ');
  var elements = document.querySelectorAll(selector);
  if (!elements.length || !window.IntersectionObserver) {
    // Fallback: mostrar todo
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

  // Cerrar al hacer click fuera
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
```

- [ ] **Paso 2: Verificar en el navegador:**
  - Al hacer scroll >80px el header se oscurece con glassmorphism
  - El menú hamburguesa no es visible aún en desktop (lo controla CSS responsive de Task 13)

- [ ] **Paso 3: Commit**

```bash
git add public/js/animations.js
git commit -m "feat: add animations.js with scroll reveal, header glassmorphism, counters, hamburger and marquee"
```

---

## Task 5: Sección Promociones

**Files:**
- Modify: `public/index.html` (reemplazar `<!-- SECTION: PROMOCIONES -->`)
- Modify: `public/css/style.css` (agregar al final)

- [ ] **Paso 1: Reemplazar `<!-- SECTION: PROMOCIONES -->` en `index.html`** con:

```html
<!-- ══ SECCIÓN PROMOCIONES ══ -->
<section class="ts-offers-section" aria-label="Promociones y ofertas especiales">
  <div class="ts-offers-grid">

    <!-- Card principal: Celulares (2/3 ancho) -->
    <article class="ts-offer-card ts-offer-main" onclick="document.getElementById('ts-productos').scrollIntoView({behavior:'smooth'})" tabindex="0" role="button" aria-label="Celulares — 30% de descuento">
      <div class="ts-offer-bg" style="background:linear-gradient(160deg,#060d1a 0%,#0a3060 100%);">
        <div class="ts-offer-content">
          <span class="ts-offer-tag">Oferta Especial</span>
          <h2 class="ts-offer-title">CELULARES</h2>
          <div class="ts-offer-pct">30% OFF</div>
          <p class="ts-offer-sub">Samsung · Xiaomi · Motorola</p>
          <button class="ts-offer-btn" tabindex="-1">Ver Ofertas</button>
        </div>
        <div class="ts-offer-img">
          <img src="/wp-content/uploads/2025/02/CELULAR-SAMSUNG-A16.jpg" alt="Samsung Galaxy A16 — Oferta 30% descuento" loading="eager">
        </div>
      </div>
    </article>

    <!-- Cards secundarias (1/3 ancho, apiladas) -->
    <div class="ts-offers-secondary">

      <article class="ts-offer-card ts-offer-sec" onclick="document.getElementById('ts-productos').scrollIntoView({behavior:'smooth'})" tabindex="0" role="button" aria-label="Portátiles — 15% de descuento">
        <div class="ts-offer-bg" style="background:linear-gradient(160deg,#0a1628 0%,#102244 100%);">
          <div class="ts-offer-content">
            <span class="ts-offer-tag">Gaming &amp; Work</span>
            <h2 class="ts-offer-title">Portátiles</h2>
            <div class="ts-offer-pct">15% OFF</div>
            <button class="ts-offer-btn" tabindex="-1">Explorar</button>
          </div>
          <div class="ts-offer-img">
            <img src="/wp-content/uploads/2024/12/PORTATIL-HP-14-245-G10-AMD-RYZEN-3.jpg" alt="Portátil HP 14 AMD — Oferta 15% descuento" loading="eager">
          </div>
        </div>
      </article>

      <article class="ts-offer-card ts-offer-sec" onclick="document.getElementById('ts-productos').scrollIntoView({behavior:'smooth'})" tabindex="0" role="button" aria-label="Audio — 25% de descuento">
        <div class="ts-offer-bg" style="background:linear-gradient(160deg,#2d0a12 0%,#7a1020 100%);">
          <div class="ts-offer-content">
            <span class="ts-offer-tag">Audio Premium</span>
            <h2 class="ts-offer-title">Sonido<br>Premium</h2>
            <div class="ts-offer-pct">25% OFF</div>
            <button class="ts-offer-btn" tabindex="-1">Ver Audio</button>
          </div>
          <div class="ts-offer-img">
            <img src="/wp-content/uploads/2025/03/JBL-Flip-6-Altavoz-Portatil-a-Prueba-de-Agua.png" alt="JBL Flip 6 — Oferta 25% descuento" loading="eager">
          </div>
        </div>
      </article>

    </div>
  </div>
</section>
```

- [ ] **Paso 2: Agregar al final de `style.css` el CSS de la sección Promociones:**

```css
/* ══ SECCIÓN PROMOCIONES ══ */
.ts-offers-section { padding: 32px 20px; max-width: var(--max-width); margin: 0 auto; }
.ts-offers-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}
.ts-offers-secondary { display: flex; flex-direction: column; gap: 20px; }

.ts-offer-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition), box-shadow var(--transition);
}
.ts-offer-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}
.ts-offer-card:hover .ts-offer-img img { transform: scale(1.06); }
.ts-offer-card:focus { outline: 3px solid var(--color-primary); outline-offset: 3px; }

.ts-offer-bg {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 36px;
  position: relative;
  overflow: hidden;
}
.ts-offer-main .ts-offer-bg { min-height: 380px; }
.ts-offer-sec .ts-offer-bg { min-height: 172px; padding: 28px 28px; }

.ts-offer-content { flex: 1; z-index: 2; }
.ts-offer-tag {
  display: inline-block;
  background: rgba(0,174,232,0.25);
  color: var(--color-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
  border: 1px solid rgba(0,174,232,0.4);
}
.ts-offer-title {
  color: #fff;
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 8px;
}
.ts-offer-pct {
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 900;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 8px;
  animation: pulse-pct 2.5s ease-in-out infinite;
}
@keyframes pulse-pct {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}
.ts-offer-sub { color: rgba(255,255,255,0.7); font-size: 13px; margin-bottom: 20px; }
.ts-offer-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background var(--transition), transform var(--transition);
}
.ts-offer-btn:hover { background: #0097cc; transform: translateX(4px); }

.ts-offer-img {
  flex-shrink: 0;
  margin-left: 16px;
  z-index: 1;
}
.ts-offer-main .ts-offer-img { width: 200px; }
.ts-offer-sec .ts-offer-img { width: 110px; }
.ts-offer-img img {
  width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
  transition: transform var(--transition);
}

.ts-offer-sec .ts-offer-title { font-size: 20px; margin-bottom: 4px; }
.ts-offer-sec .ts-offer-pct { font-size: 28px; margin-bottom: 8px; animation: none; }
.ts-offer-sec .ts-offer-sub { display: none; }
```

- [ ] **Paso 3: Verificar en navegador:**
  - Grid 2/3 + 1/3 en desktop
  - Los porcentajes en naranja se ven claramente
  - Hover levanta las cards y hace zoom a la imagen

- [ ] **Paso 4: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add promotions section with 3-card grid, hover effects and animated discount badge"
```

---

## Task 6: Sección Productos Destacados + Modal

**Files:**
- Modify: `public/index.html` (reemplazar `<!-- SECTION: PRODUCTOS DESTACADOS -->` y `<!-- MODAL PRODUCTO -->`)
- Modify: `public/css/style.css` (agregar al final)

- [ ] **Paso 1: Reemplazar `<!-- SECTION: PRODUCTOS DESTACADOS -->` en `index.html`:**

```html
<!-- ══ SECCIÓN PRODUCTOS DESTACADOS ══ -->
<section class="ts-products-section" id="ts-productos">
  <div class="container">
    <h2 class="section-title reveal">Productos Destacados</h2>
    <div class="ts-products-grid reveal" id="ts-products-grid"></div>
    <div class="ts-extra-section" id="ts-extra-section">
      <div class="ts-products-grid" id="ts-products-grid-extra"></div>
    </div>
    <div class="ts-ver-mas-wrap" id="ts-ver-mas-wrap">
      <button class="ts-ver-mas-btn" id="ts-ver-mas-btn" onclick="toggleExtraProducts()">
        <span class="vm-text">Ver más productos</span>
        <svg class="vm-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>
    <div style="text-align:center; margin-top:32px;">
      <a href="/tienda/" class="ts-tienda-btn">Ver todos los productos</a>
    </div>
  </div>
</section>
```

- [ ] **Paso 2: Reemplazar `<!-- MODAL PRODUCTO -->` en `index.html`:**

```html
<!-- MODAL PRODUCTO -->
<div class="ts-modal-overlay" id="ts-modal-overlay" onclick="tsCloseModal(event)" role="dialog" aria-modal="true" aria-labelledby="ts-modal-name">
  <div class="ts-modal-box">
    <button class="ts-modal-close" onclick="tsCloseModal()" aria-label="Cerrar modal">&#x2715;</button>
    <div class="ts-modal-gallery">
      <img class="ts-modal-main-img" id="ts-modal-main-img" src="" alt="">
      <div class="ts-modal-thumbs" id="ts-modal-thumbs"></div>
    </div>
    <div class="ts-modal-info">
      <span class="ts-modal-brand" id="ts-modal-brand"></span>
      <h2 class="ts-modal-name" id="ts-modal-name"></h2>
      <span class="ts-modal-disc-badge" id="ts-modal-disc"></span>
      <div class="ts-modal-prices">
        <span class="ts-modal-price" id="ts-modal-price"></span>
        <span class="ts-modal-old" id="ts-modal-old"></span>
      </div>
      <p class="ts-specs-title">Especificaciones Técnicas</p>
      <div id="ts-modal-specs"></div>
      <div class="ts-modal-actions">
        <button class="ts-btn-cart" id="ts-btn-cart" onclick="tsAddToCart()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
          Agregar al Carrito
        </button>
        <button class="ts-btn-wsp" id="ts-btn-wsp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Consultar por WhatsApp
        </button>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Paso 3: Agregar al final de `style.css` el CSS de productos y modal:**

```css
/* ══ SECCIÓN PRODUCTOS ══ */
.ts-products-section { padding: 80px 0; background: #fff; }
.ts-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}
.ts-tienda-btn {
  display: inline-flex;
  align-items: center;
  background: var(--color-primary);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 14px 36px;
  border-radius: 8px;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  box-shadow: 0 4px 16px rgba(0,174,232,0.3);
}
.ts-tienda-btn:hover { background: #0097cc; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,174,232,0.4); }

/* Cards de producto (generadas por main.js) */
.ts-prod-card {
  background: #fff;
  border: 1.5px solid #e8eef5;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
  display: flex;
  flex-direction: column;
}
.ts-prod-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: var(--color-primary);
}
.ts-prod-card:hover .ts-prod-img-wrap img { transform: scale(1.06); }
.ts-prod-badge {
  position: absolute;
  top: 12px; left: 12px;
  background: var(--color-accent);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: 20px;
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.ts-prod-badge.blue { background: var(--color-primary); }
.ts-prod-img-wrap {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  overflow: hidden;
  padding: 16px;
}
.ts-prod-img-wrap img {
  max-height: 168px;
  width: auto;
  object-fit: contain;
  transition: transform var(--transition);
}
.ts-prod-info { padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
.ts-prod-brand { font-size: 11px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; }
.ts-prod-name { font-size: 14px; font-weight: 700; color: var(--color-text); line-height: 1.3; }
.ts-prod-stars { display: flex; gap: 2px; }
.ts-star { font-size: 13px; }
.ts-star.on { color: #f5a623; }
.ts-star.off { color: #ddd; }
.ts-prod-prices { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.ts-prod-price { font-size: 18px; font-weight: 900; color: var(--color-primary); }
.ts-prod-old { font-size: 12px; color: var(--color-text-muted); text-decoration: line-through; }
.ts-prod-disc-tag { font-size: 11px; font-weight: 700; color: #fff; background: var(--color-accent); padding: 2px 7px; border-radius: 4px; }
.ts-prod-cta {
  display: block;
  width: 100%;
  margin-top: auto;
  padding: 10px;
  background: transparent;
  border: 1.5px solid var(--color-primary);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 700;
  border-radius: 7px;
  transition: all var(--transition);
}
.ts-prod-cta:hover { background: var(--color-primary); color: #fff; }

/* Ver más */
.ts-extra-section { display: none; }
.ts-extra-section.open { display: block; }
.ts-ver-mas-wrap { display: flex; justify-content: center; margin: 24px 0; }
.ts-ver-mas-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 8px;
  transition: all var(--transition);
}
.ts-ver-mas-btn:hover { background: var(--color-primary); color: #fff; }
.vm-arrow { transition: transform var(--transition); }
.ts-ver-mas-btn.open .vm-arrow { transform: rotate(180deg); }

/* Modal */
.ts-modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(6,13,26,0.75);
  backdrop-filter: blur(6px);
  z-index: 2000;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.ts-modal-overlay.open { display: flex; }
.ts-modal-box {
  background: #fff;
  border-radius: var(--radius-lg);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  gap: 0;
  position: relative;
  box-shadow: 0 32px 80px rgba(0,0,0,0.4);
}
.ts-modal-close {
  position: absolute;
  top: 16px; right: 16px;
  background: rgba(0,0,0,0.08);
  border-radius: 50%;
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  z-index: 10;
  transition: background var(--transition);
}
.ts-modal-close:hover { background: rgba(0,0,0,0.16); }
.ts-modal-gallery {
  flex: 1;
  padding: 24px;
  border-right: 1px solid #f0f0f0;
}
.ts-modal-main-img { width: 100%; height: 240px; object-fit: contain; border-radius: 8px; margin-bottom: 12px; }
.ts-modal-thumbs { display: flex; gap: 8px; flex-wrap: wrap; }
.ts-modal-thumb {
  width: 60px; height: 60px;
  object-fit: contain;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color var(--transition);
  padding: 4px;
  background: #f8f9fa;
}
.ts-modal-thumb.active, .ts-modal-thumb:hover { border-color: var(--color-primary); }
.ts-modal-info { flex: 1.2; padding: 28px 24px; display: flex; flex-direction: column; gap: 10px; }
.ts-modal-brand { font-size: 11px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 1px; }
.ts-modal-name { font-size: 20px; font-weight: 700; line-height: 1.2; }
.ts-modal-disc-badge { display: inline-block; background: var(--color-accent); color: #fff; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.ts-modal-prices { display: flex; align-items: baseline; gap: 10px; }
.ts-modal-price { font-size: 26px; font-weight: 900; color: var(--color-primary); }
.ts-modal-old { font-size: 14px; color: var(--color-text-muted); text-decoration: line-through; }
.ts-specs-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); margin-top: 8px; }
.ts-modal-spec-row { display: flex; gap: 8px; font-size: 13px; padding: 5px 0; border-bottom: 1px solid #f0f4f8; }
.ts-modal-spec-key { font-weight: 600; min-width: 110px; color: var(--color-text-muted); }
.ts-modal-spec-val { color: var(--color-text); }
.ts-modal-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; }
.ts-btn-cart {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--color-primary); color: #fff;
  font-size: 14px; font-weight: 700;
  padding: 13px; border-radius: 8px;
  transition: background var(--transition);
}
.ts-btn-cart:hover { background: #0097cc; }
.ts-btn-wsp {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: #25D366; color: #fff;
  font-size: 14px; font-weight: 700;
  padding: 13px; border-radius: 8px;
  transition: background var(--transition);
}
.ts-btn-wsp:hover { background: #1ea855; }
```

- [ ] **Paso 4: Verificar en navegador** que los productos cargan automáticamente (los genera `main.js`) y que el modal se abre al hacer clic.

- [ ] **Paso 5: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add featured products section and product modal with new design system"
```

---

## Task 7: Sección Categorías

**Files:**
- Modify: `public/index.html` (reemplazar `<!-- SECTION: CATEGORÍAS -->`)
- Modify: `public/css/style.css` (agregar al final)

- [ ] **Paso 1: Reemplazar `<!-- SECTION: CATEGORÍAS -->` en `index.html`:**

```html
<!-- ══ SECCIÓN CATEGORÍAS ══ -->
<section class="ts-cats-section">
  <div class="container">
    <h2 class="section-title reveal">Explora por Categoría</h2>
    <div class="ts-cats-grid">

      <a class="ts-cat-card reveal-scale" href="/tienda/" aria-label="Celulares">
        <div class="ts-cat-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>
        </div>
        <span class="ts-cat-label">Celulares</span>
      </a>

      <a class="ts-cat-card reveal-scale delay-1" href="/tienda/" aria-label="Periféricos">
        <div class="ts-cat-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="9" width="14" height="11" rx="1"/><path d="M8 9V5a4 4 0 018 0v4"/><line x1="12" y1="14" x2="12" y2="17"/></svg>
        </div>
        <span class="ts-cat-label">Periféricos</span>
      </a>

      <a class="ts-cat-card reveal-scale delay-2" href="/tienda/" aria-label="Accesorios">
        <div class="ts-cat-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
        </div>
        <span class="ts-cat-label">Accesorios</span>
      </a>

      <a class="ts-cat-card reveal-scale delay-3" href="/tienda/" aria-label="Portátiles">
        <div class="ts-cat-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M1 20h22"/></svg>
        </div>
        <span class="ts-cat-label">Portátiles</span>
      </a>

      <a class="ts-cat-card reveal-scale delay-4" href="/tienda/" aria-label="Línea Hogar">
        <div class="ts-cat-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
        </div>
        <span class="ts-cat-label">Línea Hogar</span>
      </a>

      <a class="ts-cat-card reveal-scale delay-5" href="/tienda/" aria-label="Empresas">
        <div class="ts-cat-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
        </div>
        <span class="ts-cat-label">Empresas</span>
      </a>

    </div>
  </div>
</section>
```

- [ ] **Paso 2: Agregar al final de `style.css`:**

```css
/* ══ SECCIÓN CATEGORÍAS ══ */
.ts-cats-section { padding: 80px 0; background: var(--color-bg-light); }
.ts-cats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.ts-cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 24px;
  background: linear-gradient(145deg, var(--color-primary), var(--color-mid));
  border-radius: var(--radius-lg);
  color: #fff;
  text-align: center;
  box-shadow: var(--shadow-card);
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  min-height: 160px;
}
.ts-cat-card:hover {
  background: linear-gradient(145deg, var(--color-dark), #061530);
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}
.ts-cat-icon {
  width: 72px; height: 72px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition);
}
.ts-cat-card:hover .ts-cat-icon { transform: rotate(10deg) scale(1.12); }
.ts-cat-icon svg { color: #fff; }
.ts-cat-label { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: 0.3px; }
```

- [ ] **Paso 3: Verificar en navegador** que las 6 tarjetas de categoría se ven en grid 3×2 y el hover funciona.

- [ ] **Paso 4: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add categories section with 6 cards linking to tienda"
```

---

## Task 8: Sección Garantías

**Files:**
- Modify: `public/index.html` (reemplazar `<!-- SECTION: GARANTÍAS -->`)
- Modify: `public/css/style.css` (agregar al final)

- [ ] **Paso 1: Reemplazar `<!-- SECTION: GARANTÍAS -->` en `index.html`:**

```html
<!-- ══ SECCIÓN GARANTÍAS ══ -->
<section class="ts-guar-section">
  <div class="container">
    <h2 class="section-title reveal" style="color:#fff;">Por qué elegirnos</h2>
    <div class="ts-guar-grid">

      <div class="ts-guar-card reveal delay-1">
        <div class="ts-guar-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        </div>
        <h3>Pago 100% Seguro</h3>
        <p>Transacciones cifradas SSL con las mejores plataformas de pago</p>
      </div>

      <div class="ts-guar-card reveal delay-2">
        <div class="ts-guar-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>
        </div>
        <h3>1 Año de Garantía</h3>
        <p>Garantía directa de fábrica y respaldo oficial de todas las marcas</p>
      </div>

      <div class="ts-guar-card reveal delay-3">
        <div class="ts-guar-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
        </div>
        <h3>Entrega Rápida</h3>
        <p>Envíos a todo Colombia en 24–48 horas con seguimiento en tiempo real</p>
      </div>

      <div class="ts-guar-card reveal delay-4">
        <div class="ts-guar-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </div>
        <h3>Soporte 24/7</h3>
        <p>Equipo de soporte por WhatsApp, email y chat en línea</p>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Paso 2: Agregar al final de `style.css`:**

```css
/* ══ SECCIÓN GARANTÍAS ══ */
.ts-guar-section {
  padding: 80px 0;
  background: var(--color-dark);
}
.ts-guar-section .section-title { color: #fff; }
.ts-guar-section .section-title::after { background: var(--color-primary); }
.ts-guar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.ts-guar-card {
  padding: 32px 24px;
  border-radius: var(--radius);
  border: 1.5px solid rgba(255,255,255,0.08);
  position: relative;
  overflow: hidden;
  transition: background var(--transition), border-color var(--transition), transform var(--transition);
}
.ts-guar-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--color-primary);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s ease;
}
.ts-guar-card:hover { background: var(--color-mid); border-color: rgba(0,174,232,0.3); transform: translateY(-4px); }
.ts-guar-card:hover::before { transform: scaleY(1); }
.ts-guar-icon {
  width: 64px; height: 64px;
  background: rgba(0,174,232,0.12);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: var(--color-primary);
  transition: background var(--transition);
}
.ts-guar-card:hover .ts-guar-icon { background: rgba(0,174,232,0.22); }
.ts-guar-card h3 { color: #fff; font-size: 16px; margin-bottom: 8px; }
.ts-guar-card p { color: var(--color-text-light); font-size: 13.5px; line-height: 1.6; }
```

- [ ] **Paso 3: Verificar en navegador** que las 4 tarjetas se ven sobre fondo oscuro y el efecto hover de borde izquierdo cian funciona.

- [ ] **Paso 4: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add guarantees section on dark navy background with animated border hover"
```

---

## Task 9: Sección Empresa / Stats

**Files:**
- Modify: `public/index.html` (reemplazar `<!-- SECTION: EMPRESA / STATS -->`)
- Modify: `public/css/style.css` (agregar al final)

- [ ] **Paso 1: Reemplazar `<!-- SECTION: EMPRESA / STATS -->` en `index.html`:**

```html
<!-- ══ SECCIÓN EMPRESA / STATS ══ -->
<section class="stats-section" id="nosotros">
  <div class="container stats-inner">

    <div class="stats-brand-col reveal-left">
      <div class="stats-brand-logo">
        <img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore — TNT Technistore Ltda." width="200">
      </div>
      <p class="stats-brand-tagline">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Somos tu aliado tecnológico de confianza, comprometidos con llevar la mejor tecnología a tu hogar y empresa al mejor precio del mercado colombiano.
      </p>
      <span class="stats-brand-years">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Más de 28 años transformando vidas con tecnología de calidad
      </span>
    </div>

    <div class="stats-counters-col reveal-right">
      <div class="stat-item">
        <div class="stat-number" data-target="28" data-prefix="+">+0</div>
        <div class="stat-label">AÑOS LIDERANDO EL<br>MERCADO DE TECNOLOGÍA</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-target="500" data-prefix="+">+0</div>
        <div class="stat-label">CLIENTES CORPORATIVOS<br>SATISFECHOS</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-target="1200" data-prefix="+" data-separator=".">+0</div>
        <div class="stat-label">HOGARES FELICES<br>CON NUESTROS PRODUCTOS</div>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Paso 2: Agregar al final de `style.css`:**

```css
/* ══ SECCIÓN EMPRESA / STATS ══ */
.stats-section { padding: 80px 0; background: #fff; }
.stats-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.stats-brand-logo { margin-bottom: 24px; }
.stats-brand-logo img { max-width: 180px; height: auto; }
.stats-brand-tagline {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}
.stats-brand-years {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary);
  background: rgba(0,174,232,0.08);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(0,174,232,0.2);
}

.stats-counters-col {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.stat-item {
  padding: 24px 0;
  border-bottom: 1px solid #f0f4f8;
}
.stat-item:last-child { border-bottom: none; }
.stat-number {
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 900;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 6px;
}
.stat-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  line-height: 1.5;
}
```

- [ ] **Paso 3: Verificar en navegador** que los contadores animan desde 0 al hacer scroll hasta esa sección (animaciones.js del Task 4 ya está activo).

- [ ] **Paso 4: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add empresa/stats section with animated counters and brand description"
```

---

## Task 10: Sección Clientes / Marcas (Marquee infinito)

**Files:**
- Modify: `public/index.html` (reemplazar `<!-- SECTION: CLIENTES -->`)
- Modify: `public/css/style.css` (agregar al final)

- [ ] **Paso 1: Reemplazar `<!-- SECTION: CLIENTES -->` en `index.html`:**

```html
<!-- ══ SECCIÓN CLIENTES / MARCAS ══ -->
<section class="ts-clients-section">
  <div class="container">
    <h2 class="section-title reveal">Marcas que trabajamos</h2>
  </div>
  <div class="ts-marquee-wrap">
    <div class="ts-marquee-track">
      <!-- Logos originales -->
      <div class="ts-client-logo" aria-label="HP"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="800" font-size="32" fill="#0096D6">HP</text></svg></div>
      <div class="ts-client-logo" aria-label="Dell"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="26" fill="#007DB8">DELL</text></svg></div>
      <div class="ts-client-logo" aria-label="Lenovo"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="22" fill="#E2231A">LENOVO</text></svg></div>
      <div class="ts-client-logo" aria-label="Samsung"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="19" fill="#1428A0">SAMSUNG</text></svg></div>
      <div class="ts-client-logo" aria-label="Logitech"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="17" fill="#00B0F0">LOGITECH</text></svg></div>
      <div class="ts-client-logo" aria-label="Epson"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="22" fill="#003087">EPSON</text></svg></div>
      <div class="ts-client-logo" aria-label="Xiaomi"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="21" fill="#FF6900">XIAOMI</text></svg></div>
      <div class="ts-client-logo" aria-label="JBL"><svg viewBox="0 0 160 60"><text x="80" y="42" text-anchor="middle" font-family="Arial" font-weight="800" font-size="30" fill="#1a1a1a">JBL</text></svg></div>
      <div class="ts-client-logo" aria-label="Microsoft"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="15" fill="#00A4EF">MICROSOFT</text></svg></div>
      <!-- Duplicado para seamless loop -->
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="800" font-size="32" fill="#0096D6">HP</text></svg></div>
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="26" fill="#007DB8">DELL</text></svg></div>
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="22" fill="#E2231A">LENOVO</text></svg></div>
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="19" fill="#1428A0">SAMSUNG</text></svg></div>
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="17" fill="#00B0F0">LOGITECH</text></svg></div>
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="22" fill="#003087">EPSON</text></svg></div>
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="21" fill="#FF6900">XIAOMI</text></svg></div>
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="42" text-anchor="middle" font-family="Arial" font-weight="800" font-size="30" fill="#1a1a1a">JBL</text></svg></div>
      <div class="ts-client-logo" aria-hidden="true"><svg viewBox="0 0 160 60"><text x="80" y="40" text-anchor="middle" font-family="Arial" font-weight="700" font-size="15" fill="#00A4EF">MICROSOFT</text></svg></div>
    </div>
  </div>
</section>
```

- [ ] **Paso 2: Agregar al final de `style.css`:**

```css
/* ══ SECCIÓN CLIENTES / MARCAS ══ */
.ts-clients-section { padding: 64px 0; background: var(--color-bg-off); overflow: hidden; }
.ts-marquee-wrap {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
  margin-top: 16px;
}
.ts-marquee-track {
  display: flex;
  align-items: center;
  gap: 0;
  width: max-content;
  animation: marquee-scroll 28s linear infinite;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ts-client-logo {
  width: 160px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  flex-shrink: 0;
  filter: grayscale(40%) opacity(0.7);
  transition: filter var(--transition);
}
.ts-client-logo:hover { filter: grayscale(0%) opacity(1); }
.ts-client-logo svg { width: 120px; height: 48px; }
```

- [ ] **Paso 3: Verificar en navegador** que el marquee se desplaza continuamente y al hacer hover se pausa (via `animations.js`).

- [ ] **Paso 4: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add brands marquee section with infinite CSS scroll animation"
```

---

## Task 11: Sección Contacto + Footer + WhatsApp flotante

**Files:**
- Modify: `public/index.html` (reemplazar `<!-- SECTION: CONTACTO -->`, `<!-- FOOTER -->`, `<!-- WHATSAPP FLOTANTE -->`)
- Modify: `public/css/style.css` (agregar al final)

- [ ] **Paso 1: Reemplazar `<!-- SECTION: CONTACTO -->` en `index.html`:**

```html
<!-- ══ SECCIÓN CONTACTO ══ -->
<section class="contact-section" id="contacto">
  <div class="container contact-inner">

    <div class="contact-info reveal-left">
      <span class="contact-badge">CONTÁCTANOS</span>
      <h2 class="contact-title">Estamos aquí<br>para ayudarte</h2>
      <p class="contact-sub">Visítanos, escríbenos o llámanos. Con gusto atenderemos tu solicitud.</p>

      <div class="contact-items">
        <div class="contact-item">
          <div class="contact-icon ci-cyan">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          </div>
          <div class="contact-item-text">
            <span class="ci-label">Teléfono fijo</span>
            <a href="tel:6016336364">(601) 633-6364</a>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon ci-green">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div class="contact-item-text">
            <span class="ci-label">WhatsApp</span>
            <a href="https://wa.me/573225817129" target="_blank" rel="noopener">+57 322-581-7129</a>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon ci-cyan">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </div>
          <div class="contact-item-text">
            <span class="ci-label">Correo</span>
            <a href="mailto:comercial1@tntltda.com">comercial1@tntltda.com</a>
            <a href="mailto:directocomercial@tntltda.com">directocomercial@tntltda.com</a>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon ci-orange">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          <div class="contact-item-text">
            <span class="ci-label">Dirección</span>
            <span>Carrera 15 # 77-05<br>Bogotá, Colombia</span>
          </div>
        </div>
      </div>

      <div class="offices-block">
        <div class="offices-block-label">LÍNEAS DE ATENCIÓN</div>
        <div class="offices-block-grid">
          <a href="tel:3164648758">316-464-8758</a>
          <a href="tel:3017298980">301-729-8980</a>
          <a href="tel:3175098003">317-509-8003</a>
          <a href="tel:3225817129">322-581-7129</a>
          <a href="tel:3144300573">314-430-0573</a>
          <a href="tel:3118089016">311-808-9016</a>
        </div>
      </div>
    </div>

    <div class="contact-map reveal-right">
      <iframe
        src="https://maps.google.com/maps?q=Carrera+15+%2377-05,+Bogot%C3%A1,+Colombia&output=embed&z=17"
        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Ubicación Tecnistore — Carrera 15 #77-05, Bogotá">
      </iframe>
    </div>

  </div>
</section>
```

- [ ] **Paso 2: Reemplazar `<!-- FOOTER -->` en `index.html`:**

```html
<!-- ══ FOOTER ══ -->
<footer class="site-footer">
  <div class="footer-inner container">
    <img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" class="footer-logo" width="130" loading="lazy">
    <div class="footer-copy">
      <p>Copyright &copy; <span id="footer-year"></span> Tecnistore</p>
      <p>&copy; TNT Technistore Ltda. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
```

- [ ] **Paso 3: Reemplazar `<!-- WHATSAPP FLOTANTE -->` en `index.html`:**

```html
<!-- WHATSAPP FLOTANTE -->
<a class="whatsapp-float" href="https://wa.me/573225817129?text=Hola!%20me%20interesa%20un%20producto%20de%20Tecnistore" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp" title="Escríbenos por WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/></svg>
</a>
```

- [ ] **Paso 4: Agregar al final de `style.css`:**

```css
/* ══ SECCIÓN CONTACTO ══ */
.contact-section { padding: 80px 0; background: #fff; }
.contact-inner {
  display: grid;
  grid-template-columns: 55% 1fr;
  gap: 48px;
  align-items: start;
}
.contact-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--color-primary);
  background: rgba(0,174,232,0.08);
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid rgba(0,174,232,0.2);
  margin-bottom: 16px;
}
.contact-title { font-size: clamp(26px, 3.5vw, 38px); font-weight: 900; line-height: 1.15; margin-bottom: 12px; color: var(--color-text); }
.contact-sub { font-size: 15px; color: var(--color-text-muted); margin-bottom: 32px; line-height: 1.6; }
.contact-items { display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px; }
.contact-item { display: flex; align-items: flex-start; gap: 16px; }
.contact-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.contact-icon svg { width: 20px; height: 20px; }
.ci-cyan  { background: rgba(0,174,232,0.12); color: var(--color-primary); }
.ci-green { background: rgba(37,211,102,0.12); color: #25D366; }
.ci-orange{ background: rgba(255,107,43,0.12); color: var(--color-accent); }
.contact-item-text { display: flex; flex-direction: column; gap: 2px; }
.ci-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); }
.contact-item-text a, .contact-item-text span { font-size: 14px; color: var(--color-text); font-weight: 600; transition: color var(--transition); }
.contact-item-text a:hover { color: var(--color-primary); }
.offices-block { background: var(--color-bg-light); border-radius: var(--radius); padding: 20px 24px; }
.offices-block-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--color-text-muted); margin-bottom: 12px; }
.offices-block-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.offices-block-grid a { font-size: 13px; font-weight: 600; color: var(--color-text); padding: 4px 0; transition: color var(--transition); }
.offices-block-grid a:hover { color: var(--color-primary); }
.contact-map {
  height: 420px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}
.contact-map iframe { width: 100%; height: 100%; border: 0; }

/* ══ FOOTER ══ */
.site-footer { background: var(--color-dark); padding: 36px 20px; }
.footer-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.footer-logo { height: 44px; width: auto; filter: brightness(0) invert(1); opacity: 0.9; }
.footer-copy { text-align: center; color: rgba(255,255,255,0.45); font-size: 13px; line-height: 1.6; }

/* ══ WHATSAPP FLOTANTE ══ */
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37,211,102,0.5);
  z-index: 999;
  transition: transform var(--transition), box-shadow var(--transition);
  animation: wsp-bounce 3s ease-in-out infinite;
}
.whatsapp-float:hover {
  transform: scale(1.12);
  box-shadow: 0 8px 32px rgba(37,211,102,0.6);
  animation: none;
}
.whatsapp-float svg { width: 30px; height: 30px; }
@keyframes wsp-bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
```

- [ ] **Paso 5: Verificar en navegador** que la sección de contacto muestra info y mapa lado a lado, y el botón de WhatsApp flota en la esquina inferior derecha con animación de rebote.

- [ ] **Paso 6: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add contact section, footer and floating WhatsApp button"
```

---

## Task 12: Media Queries — Responsividad completa

**Files:**
- Modify: `public/css/style.css` (agregar al final — SIEMPRE al final para que sobreescriban correctamente)

- [ ] **Paso 1: Agregar al final de `style.css` todas las media queries:**

```css
/* ══ MEDIA QUERIES ══ */

/* Tablet (≤ 1024px) */
@media (max-width: 1024px) {
  .ts-offers-grid { grid-template-columns: 1fr; }
  .ts-offers-secondary { flex-direction: row; }
  .ts-offer-sec .ts-offer-bg { min-height: 160px; }
  .ts-products-grid { grid-template-columns: repeat(2, 1fr); }
  .ts-guar-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-inner { grid-template-columns: 1fr; gap: 48px; text-align: center; }
  .stats-brand-logo { display: flex; justify-content: center; }
  .contact-inner { grid-template-columns: 1fr; }
  .contact-map { height: 320px; }
}

/* Móvil (≤ 768px) */
@media (max-width: 768px) {
  /* Header */
  .header-search-row { padding: 6px 0; }
  .hs-search-wrap { display: none; }
  .hs-cart-label { display: none; }
  .nav-logo-center { display: none; }
  .nav-links-left, .nav-links-right { display: none; }
  .nav-hamburger { display: flex; }
  .nav-mobile-menu { display: flex; }
  .nav-inner { justify-content: space-between; }

  /* Ofertas */
  .ts-offers-section { padding: 16px; }
  .ts-offers-secondary { flex-direction: column; }
  .ts-offer-main .ts-offer-bg { min-height: 280px; padding: 28px 20px; }
  .ts-offer-main .ts-offer-img { width: 130px; }
  .ts-offer-sec .ts-offer-bg { min-height: 140px; padding: 20px; }
  .ts-offer-sec .ts-offer-img { width: 90px; }

  /* Productos */
  .ts-products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .ts-prod-img-wrap { height: 160px; }

  /* Categorías */
  .ts-cats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .ts-cat-card { padding: 28px 16px; min-height: 130px; }
  .ts-cat-icon { width: 56px; height: 56px; }

  /* Garantías */
  .ts-guar-grid { grid-template-columns: 1fr; }

  /* Stats */
  .stats-counters-col { align-items: center; }
  .stat-number { font-size: 52px; }

  /* Contacto */
  .contact-title { font-size: 26px; }
  .offices-block-grid { grid-template-columns: 1fr; }
  .contact-map { height: 260px; }

  /* Modal */
  .ts-modal-box { flex-direction: column; max-height: 95vh; }
  .ts-modal-gallery { border-right: none; border-bottom: 1px solid #f0f0f0; padding: 16px; }
  .ts-modal-main-img { height: 180px; }
  .ts-modal-info { padding: 16px; }

  /* Top bar */
  .tb-item:last-child { display: none; }
}

/* Móvil pequeño (≤ 480px) */
@media (max-width: 480px) {
  .ts-products-grid { grid-template-columns: 1fr; }
  .ts-cats-grid { grid-template-columns: repeat(2, 1fr); }
  .ts-offer-main .ts-offer-img { display: none; }
  .ts-offer-sec .ts-offer-img { display: none; }
}
```

- [ ] **Paso 2: Verificar en DevTools (F12)** las siguientes vistas:
  - 375px (iPhone SE): menú hamburguesa visible, productos en 1 columna
  - 768px (iPad): menú completo, productos en 2 columnas, categorías en 2 columnas
  - 1024px (laptop pequeño): todo en 2 columnas donde aplica
  - 1280px (desktop): layout completo

- [ ] **Paso 3: Commit**

```bash
git add public/css/style.css
git commit -m "feat: add full responsive media queries for mobile, tablet and desktop"
```

---

## Task 13: Verificación final y commit de integración

**Files:**
- No changes — solo verificación y commit final

- [ ] **Paso 1: Servir el sitio localmente**

```bash
cd "c:/Users/flore/Downloads/Tecnistore SEO"
npx serve public -p 3000
```

Abrir `http://localhost:3000` en el navegador.

- [ ] **Paso 2: Verificar checklist completo**

Revisar cada ítem manualmente:

- [ ] Top bar cian con teléfono y WhatsApp
- [ ] Header sticky: al bajar scroll > 80px se oscurece con glassmorphism
- [ ] Menú hamburguesa funciona en móvil (redimensionar ventana)
- [ ] Sección Promociones: 3 cards con hover (translateY + zoom imagen)
- [ ] Los porcentajes en naranja tienen animación `pulse` suave
- [ ] Sección Productos: 4 cards cargadas por `main.js`, hover funciona, botón "Ver detalles" abre modal
- [ ] Modal: imágenes, specs, botones de carrito y WhatsApp
- [ ] Botón "Ver más productos" despliega los 4 adicionales
- [ ] Botón "Ver todos los productos" lleva a `/tienda/`
- [ ] Sección Categorías: 6 cards, hover invierte colores, todas llevan a `/tienda/`
- [ ] Sección Garantías: fondo oscuro, borde izquierdo cian en hover
- [ ] Sección Empresa: logo + texto + contadores animan desde 0 al llegar a la sección
- [ ] Carrusel de marcas se mueve infinitamente, pausa en hover
- [ ] Sección Contacto: info + mapa visible
- [ ] Footer con logo en blanco (filtro CSS)
- [ ] WhatsApp flotante rebota suavemente
- [ ] SEO: ver fuente de la página, confirmar `<meta description>`, JSON-LD y `<link rel="canonical">`
- [ ] Sin errores en consola del navegador (F12 → Console)

- [ ] **Paso 3: Verificar que `main.js` no fue modificado**

```bash
git diff HEAD~13 -- public/js/main.js
```

Esperado: sin cambios (output vacío).

- [ ] **Paso 4: Commit final**

```bash
git add -A
git commit -m "feat: complete homepage redesign — clean rewrite with animations, SEO and full responsive layout"
```

---

## Notas para el implementador

- **Orden de edición del CSS**: agregar siempre AL FINAL de `style.css`. Las media queries del Task 12 deben ser las últimas líneas del archivo para que sobreescriban correctamente.
- **`main.js` no se toca**: las clases `.ts-prod-card`, `.ts-prod-badge`, `.ts-prod-img-wrap`, `.ts-prod-info`, `.ts-prod-brand`, `.ts-prod-name`, `.ts-prod-stars`, `.ts-star`, `.ts-prod-prices`, `.ts-prod-price`, `.ts-prod-old`, `.ts-prod-disc-tag`, `.ts-prod-cta` son generadas dinámicamente y deben existir en el nuevo `style.css` exactamente como están definidas en Task 6.
- **El carrito**: `openCart()`, `tsOpenModal()`, `tsCloseModal()`, `tsAddToCart()`, `toggleExtraProducts()`, `doSearch()` son funciones de `main.js`. No redefinirlas en `animations.js`.
- **`closeMobileMenu`**: se define en `animations.js` y se llama inline desde los `<a>` del menú móvil.
