# Tecnistore — Rediseño Homepage + Reestructuración de Proyecto

**Fecha:** 2026-05-17  
**Tipo:** Reescritura total (Opción B)  
**Alcance:** `public/index.html`, `public/css/style.css`, `public/js/animations.js`, limpieza de carpetas raíz

---

## 1. Contexto

El proyecto es un sitio estático de Tecnistore (TNT Technistore Ltda.), tienda de tecnología en Bogotá, Colombia. El sitio actual funciona pero tiene:
- CSS monolítico de 1773 líneas sin variables centralizadas
- Orden de secciones que no coincide con el flujo de conversión deseado
- Animaciones limitadas (solo counters y fade-in básico)
- Carpetas innecesarias en la raíz del repositorio

La solución es una reescritura total limpia del HTML y CSS de la página de inicio, conservando la lógica JS del carrito, modal y productos (`main.js`).

---

## 2. Limpieza de carpetas (raíz del repositorio)

Eliminar de la raíz del proyecto (NO tocar `public/`):

| Carpeta / Archivo | Motivo |
|---|---|
| `UsersfloreDownloadssuperpowers/` | Plugin externo, sin relación con Tecnistore |
| `Video/` | Archivo de video de referencia, no usado en producción |
| `wp-backups/` | Backups de WordPress, ya migrado a sitio estático |
| `media-assets/` | Solo contiene un `.zip` de imágenes, no usado |

Conservar: `public/`, `Productos/`, `tools/`, `package.json`, `package-lock.json`, `netlify.toml`, `.github/`.

---

## 3. Sistema de diseño

### Variables CSS (`:root`)

```css
--color-primary:    #00aee8;   /* cian Tecnistore */
--color-dark:       #060d1a;   /* navy profundo — fondo oscuro */
--color-mid:        #0a1f3d;   /* navy medio — fondos de cards */
--color-accent:     #ff6b2b;   /* naranja — badges, CTAs secundarios */
--color-bg-light:   #f4f8fc;   /* gris azulado claro — secciones alternas */
--color-text:       #1a1a2e;
--color-text-muted: #6b7a99;
--font-main:        'Lato', 'Open Sans', Arial, sans-serif;
--radius:           12px;
--radius-lg:        20px;
--shadow-card:      0 8px 32px rgba(0, 0, 0, 0.12);
--shadow-hover:     0 16px 48px rgba(0, 0, 0, 0.20);
--transition:       0.3s cubic-bezier(0.4, 0, 0.2, 1);
--max-width:        1200px;
```

### Tipografía
- Familia: Lato (ya cargada via Google Fonts)
- H1: 48px / 900 — solo en la sección hero/promociones
- H2: 32px / 700 — títulos de sección
- H3: 20px / 700 — títulos de card
- Body: 15px / 400
- Small / labels: 12px / 600 uppercase + letter-spacing

### Paleta de color por sección
| Sección | Fondo | Texto |
|---|---|---|
| Top bar | cian `#00aee8` | blanco |
| Header | blanco → `rgba(6,13,26,0.85)` al scroll | oscuro → blanco |
| Promociones | navy gradiente por card | blanco |
| Productos | blanco | oscuro |
| Categorías | `#f4f8fc` | oscuro |
| Garantías | `#060d1a` | blanco |
| Empresa/Stats | blanco | oscuro |
| Clientes | `#f8f9fa` | oscuro |
| Contacto | blanco | oscuro |
| Footer | `#060d1a` | blanco |

---

## 4. Estructura de archivos

```
public/
  index.html          ← reescritura completa
  css/
    style.css         ← reescritura completa con custom properties
  js/
    main.js           ← conservado sin cambios (carrito, modal, productos)
    animations.js     ← nuevo: IntersectionObserver, counters, header scroll
  tienda/
    index.html        ← actualizar solo el nav para reflejar nueva estructura
```

---

## 5. Orden y especificación de secciones

### 5.1 Top Bar
- Fondo gradiente cian `#008fc2 → #00aee8 → #008fc2`
- Izquierda: teléfono fijo + email con íconos SVG
- Derecha: link WhatsApp con ícono
- Altura: 38px, fuente 12.5px

### 5.2 Header (sticky)

**Estado inicial (scroll = 0):**
- Fondo blanco, sombra suave `0 2px 12px rgba(0,0,0,0.10)`
- Fila superior: logo izquierda + buscador centro + carrito derecha
- Fila nav: links izquierda (INICIO · NOSOTROS · TIENDA) / logo centro / derecha (CONTACTO · INICIAR SESIÓN)
- Borde inferior cian 3px

**Estado scrolled (>80px):**
- Clase `.scrolled` añadida via JS
- `backdrop-filter: blur(20px)`, fondo `rgba(6,13,26,0.85)`
- Texto e íconos en blanco
- Sombra más marcada
- Transición: `0.3s ease`

**Móvil:**
- Hamburguesa reemplaza nav links
- Menú se despliega con `max-height` animation (slide-down)

### 5.3 Sección Promociones

Layout: CSS Grid `2fr 1fr` en desktop, 1 columna en móvil.

**Card principal (Celulares — 2/3 ancho):**
- Fondo: `linear-gradient(160deg, #060d1a 0%, #0a3060 100%)`
- Imagen del producto flotando a la derecha con `filter: drop-shadow(...)`
- Badge "30% OFF" en `--color-accent` (#ff6b2b), animación `pulse` (scale 1 → 1.05 → 1, 2s infinite)
- Botón "Ver Ofertas": fondo cian, hover navy + borde cian
- Altura mínima: 380px

**Cards secundarias (Portátiles + Audio — apiladas):**
- Portátiles: `linear-gradient(160deg, #0a1628 0%, #102244 100%)`
- Audio: `linear-gradient(160deg, #2d0a12 0%, #7a1020 100%)`
- Altura: 180px cada una, gap 16px
- Misma estructura de texto pero más compacta

**Animaciones de entrada:**
- Todas las cards: `opacity: 0; transform: translateY(30px)` → animadas al cargar
- Delays escalonados: card principal 0ms, card 2 = 120ms, card 3 = 240ms

**Hover en todas:**
- `transform: translateY(-6px)`
- `box-shadow: var(--shadow-hover)`
- Imagen hace `transform: scale(1.05)`
- Transición: `var(--transition)`

**SEO:**
- `<section aria-label="Promociones y ofertas">` 
- `<h2>` en cada card con el nombre del producto
- `alt` descriptivo en imágenes

### 5.4 Sección Productos Destacados

- Fondo blanco
- Título: `<h2>Productos Destacados</h2>` con línea decorativa cian (pseudo-elemento `::after`, 60px, 3px, centrada)
- Grid 4 columnas en desktop, 2 en tablet, 1 en móvil
- Cards generadas por `main.js` (lógica conservada, solo se actualiza el CSS de las cards)
- Cada card: imagen 200px altura fija, marca en cian pequeño, nombre en bold, precio en cian 20px, botón "Ver detalles"
- Badge de descuento: posición absoluta top-right, fondo naranja
- **Hover:** `translateY(-8px)`, sombra intensa, imagen `scale(1.06)`
- **Scroll reveal:** cards con delay escalonado 0/100/200/300ms
- Botón "Ver todos los productos" → `/tienda/`: fondo cian, centrado, margen superior 32px

### 5.5 Sección Categorías

- Fondo `--color-bg-light` (#f4f8fc)
- Título: `<h2>Explora por Categoría</h2>`
- Grid: 3 columnas desktop / 2 tablet / 2 móvil
- 6 categorías: Celulares · Periféricos · Accesorios · Portátiles · Línea Hogar · Empresas
- Todas con `href="/tienda/"`

**Cada card:**
- Fondo: gradiente cian→navy
- Ícono SVG 40px centrado
- Nombre en blanco bold debajo
- Border-radius `--radius-lg` (20px)
- Padding 32px

**Hover:**
- Fondo invierte a navy oscuro `--color-dark`
- Ícono: `transform: rotate(10deg) scale(1.1)`
- Texto en cian

**Scroll reveal:** `opacity: 0; transform: scale(0.92)` → `opacity: 1; scale: 1`, delays escalonados

### 5.6 Sección Garantías

- Fondo `--color-dark` (#060d1a)
- Título: `<h2>Por qué elegirnos</h2>` en blanco
- 4 cards horizontales en desktop, 2 columnas en tablet, 1 en móvil
- Cada card: ícono SVG cian 32px, `<h3>` blanco, párrafo gris claro `#a0b0c8`
- **Hover:** borde izquierdo cian 3px (slide-in desde arriba con clip-path), fondo `--color-mid`
- **Scroll reveal:** fade-in con delays 0/100/200/300ms

Contenido:
1. Pago 100% Seguro — Transacciones cifradas SSL
2. 1 Año de Garantía — Garantía directa de fábrica
3. Entrega Rápida — Envíos a todo Colombia en 24–48h
4. Soporte 24/7 — WhatsApp, email y chat

### 5.7 Sección Empresa / Stats

- Fondo blanco, `padding: 80px 20px`
- Layout 2 columnas 50/50 en desktop, apilado en móvil

**Columna izquierda (scroll reveal desde izquierda):**
- Logo `Tnt.png` — ancho máximo 200px
- Párrafo lorem ipsum (descripción de la empresa)
- Badge "+28 años liderando el mercado" con ícono calendario

**Columna derecha (scroll reveal desde derecha):**
- 3 contadores apilados verticalmente
- Número: 64px, 900 weight, color `--color-primary` (#00aee8)
- Etiqueta: 12px, uppercase, letter-spacing 1.5px, color `--color-text-muted`
- Separador horizontal entre cada contador

**Datos:**
- `+28` — AÑOS LIDERANDO EN EL MERCADO DE TECNOLOGÍA
- `+500` — CLIENTES CORPORATIVOS SATISFECHOS  
- `+1.200` — HOGARES FELICES CON NUESTROS PRODUCTOS

**Animación de contadores:**
- `IntersectionObserver` dispara cuando la columna entra al viewport
- Cuenta de 0 al valor final en 2000ms con easing `easeOutQuart`
- Solo se ejecuta una vez (observer desconectado tras disparo)

### 5.8 Sección Clientes / Marcas

- Fondo `#f8f9fa`
- Título: `<h2>Marcas que trabajamos</h2>`
- Carrusel infinito CSS: `@keyframes marquee { from: translateX(0) to: translateX(-50%) }`
- Track duplicado (9 logos × 2 = 18) para efecto seamless
- Velocidad: `animation-duration: 28s`, `linear`, `infinite`
- En hover sobre el track: `animation-play-state: paused`
- Logos: HP · Dell · Lenovo · Samsung · Logitech · Epson · Xiaomi · JBL · Microsoft
- Cada logo: SVG con color de marca, altura 48px, filtro `grayscale(30%)` hover → `grayscale(0)`

### 5.9 Sección Contacto

- Fondo blanco, layout 2 columnas: info (55%) / mapa (45%)
- `padding: 80px 20px`

**Columna info (scroll reveal desde izquierda):**
- Badge "CONTÁCTANOS" en cian
- `<h2>` "Estamos aquí para ayudarte"
- Subtítulo en gris
- 4 items de contacto con íconos de color (teléfono cyan, WhatsApp verde, email cyan, dirección naranja)
- Bloque "LÍNEAS DE ATENCIÓN": 6 números en grid 2×3

**Mapa (scroll reveal desde derecha):**
- `<iframe>` Google Maps — Carrera 15 #77-05, Bogotá
- Altura 420px, `border-radius: var(--radius-lg)`, overflow hidden
- `loading="lazy"`

### 5.10 Footer

- Fondo `--color-dark` (#060d1a)
- Logo centrado, máximo 140px
- Texto copyright en gris claro
- `padding: 32px 20px`

### 5.11 WhatsApp flotante

- Posición fija bottom-right (24px / 24px)
- Círculo verde #25D366, 56px, sombra verde
- Ícono SVG blanco
- Hover: `scale(1.1)`, sombra más intensa
- `animation: bounce 3s ease infinite` (rebote suave)

---

## 6. Archivo `animations.js` (nuevo)

Responsabilidades:
1. **Header scroll:** `window.addEventListener('scroll')` → agrega/quita clase `.scrolled` al header cuando scroll > 80px
2. **Scroll reveal:** `IntersectionObserver` con threshold 0.15 → agrega clase `.visible` a elementos con clase `.reveal`. CSS maneja la transición desde estado inicial (opacity 0, translateY 30px) al estado final
3. **Animated counters:** `IntersectionObserver` en la sección stats → dispara función `animateCounter(el, target, duration)` con `requestAnimationFrame` y easing
4. **Hamburger menu:** toggle clase `.open` en nav móvil
5. **Marquee pause on hover:** event listeners sobre el track de clientes

---

## 7. SEO

### Meta tags en `<head>`:
```html
<meta name="description" content="Tecnistore — Soluciones tecnológicas en Bogotá. Celulares, portátiles, periféricos y más. +28 años de experiencia. Envíos a todo Colombia.">
<meta name="keywords" content="tecnología Bogotá, celulares, portátiles, periféricos, computadores, Colombia">
<link rel="canonical" href="https://tntltda.com/">
<!-- Open Graph -->
<meta property="og:title" content="Tecnistore | Soluciones Tecnológicas">
<meta property="og:description" content="Tu aliado tecnológico en Bogotá. Celulares, portátiles, periféricos y más con garantía de fábrica.">
<meta property="og:image" content="/wp-content/uploads/2021/03/Tnt.png">
<meta property="og:type" content="website">
```

### JSON-LD Schema (`LocalBusiness`):
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tecnistore — TNT Technistore Ltda.",
  "telephone": "+57-322-581-7129",
  "email": "comercial1@tntltda.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Carrera 15 # 77-05",
    "addressLocality": "Bogotá",
    "addressCountry": "CO"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 4.6682, "longitude": -74.0578 },
  "openingHours": "Mo-Fr 08:00-18:00",
  "priceRange": "$$"
}
```

### Jerarquía de headings:
- `<h1>`: solo uno, en la sección de Promociones (texto oculto visualmente pero presente para SEO, o dentro del hero principal)
- `<h2>`: títulos de cada sección
- `<h3>`: títulos de cards individuales

---

## 8. Responsividad (breakpoints)

| Breakpoint | Comportamiento |
|---|---|
| > 1024px | Layout desktop completo |
| 768–1024px | Tablet: grid 2 columnas donde aplica, nav completa |
| < 768px | Móvil: 1 columna, menú hamburguesa, carrusel de clientes más lento |

---

## 9. Lo que NO cambia

- `public/js/main.js` — lógica de productos, carrito, modal de producto, búsqueda
- `public/tienda/index.html` — solo actualizar clases CSS del nav para coherencia visual
- Todas las páginas de producto en `public/producto/`
- Sitemaps XML
- `netlify.toml`
