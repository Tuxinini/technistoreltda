# SEO + Conversión: Páginas de Producto, SEO Técnico y FAQ

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar páginas individuales por producto, SEO técnico completo (meta tags, Schema.org, sitemap, robots.txt) y sección FAQ al sitio estático Tecnistore, todo dentro del worktree `worktree-demo-features-seo`.

**Architecture:** Un script Node.js lee `public/js/products-data.js`, genera un HTML estático por producto en `public/producto/[slug]/index.html` y escribe `public/sitemap.xml`. El homepage y la página de tienda reciben meta tags, canonical y JSON-LD inline. Una sección FAQ con `<details>` nativo se añade al homepage antes del footer.

**Tech Stack:** HTML/CSS/JS vanilla, Node.js 18+ (para el script generador), `serve` para desarrollo local. Sin framework, sin build tool.

---

### Task 1: Crear `public/robots.txt`

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Crear el archivo**

Contenido de `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://tecnistore.com/sitemap.xml
```

- [ ] **Step 2: Verificar que se sirve**

Con el servidor corriendo (`npm start`), abrir http://localhost:3000/robots.txt en el navegador. Debe mostrar el texto exacto del archivo.

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt"
```

---

### Task 2: Actualizar `<head>` del homepage con meta tags y Schema.org

**Files:**
- Modify: `public/index.html` líneas 1–11 (bloque `<head>`)

- [ ] **Step 1: Reemplazar el bloque `<head>` completo en `public/index.html`**

Reemplazar:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tecnistore | Soluciones Tecnológicas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
</head>
```

Con:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tecnistore | Tienda de Tecnología en Bogotá</title>
  <meta name="description" content="Compra celulares, portátiles, periféricos y accesorios tecnológicos en Bogotá. Envíos a toda Colombia. Garantía de fábrica. Tecnistore - Tu aliado tecnológico.">
  <link rel="canonical" href="https://tecnistore.com/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Tecnistore | Tienda de Tecnología en Bogotá">
  <meta property="og:description" content="Celulares, portátiles, periféricos y accesorios con garantía de fábrica. Envíos a toda Colombia.">
  <meta property="og:url" content="https://tecnistore.com/">
  <meta property="og:image" content="https://tecnistore.com/wp-content/uploads/2021/03/Tnt.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://tecnistore.com/#business",
        "name": "Tecnistore",
        "url": "https://tecnistore.com",
        "telephone": ["+573225817129", "+576016336364"],
        "email": "comercial1@tntltda.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Carrera 15 # 77-05",
          "addressLocality": "Bogotá",
          "addressCountry": "CO"
        },
        "priceRange": "$$",
        "image": "https://tecnistore.com/wp-content/uploads/2021/03/Tnt.png",
        "sameAs": ["https://wa.me/573225817129"]
      },
      {
        "@type": "WebSite",
        "@id": "https://tecnistore.com/#website",
        "url": "https://tecnistore.com",
        "name": "Tecnistore",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://tecnistore.com/tienda/?q={query}",
          "query-input": "required name=query"
        }
      }
    ]
  }
  </script>
</head>
```

- [ ] **Step 2: Añadir H1 oculto justo después de `<body>` (antes del comentario TOP BAR)**

Insertar como primera línea después de `<body>`:
```html
<h1 class="sr-only">Tecnistore — Tienda de Tecnología en Bogotá</h1>
```

- [ ] **Step 3: Añadir clase `.sr-only` al final de `public/css/style.css`**

```css
/* === UTILITY === */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 4: Verificar en DevTools**

Abrir http://localhost:3000. En DevTools → Elements confirmar:
- `<title>` dice "Tecnistore | Tienda de Tecnología en Bogotá"
- `<meta name="description">` está presente
- `<script type="application/ld+json">` contiene `LocalBusiness` y `WebSite`
- `<h1 class="sr-only">` existe en el DOM y no es visible en pantalla

- [ ] **Step 5: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add meta tags, canonical and LocalBusiness schema to homepage"
```

---

### Task 3: Corregir lorem ipsum en la sección de stats del homepage

**Files:**
- Modify: `public/index.html` líneas ~314–319

- [ ] **Step 1: Reemplazar el párrafo de lorem ipsum**

Buscar:
```html
      <p class="stats-brand-tagline">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Somos tu aliado tecnológico de confianza, comprometidos con llevar la mejor tecnología a tu hogar y empresa al mejor precio del mercado colombiano.
      </p>
      <span class="stats-brand-years">
        📅 Más de 2 años transformando vidas con tecnología de calidad
      </span>
```

Reemplazar con:
```html
      <p class="stats-brand-tagline">
        Somos tu aliado tecnológico de confianza en Bogotá. Llevamos más de 5 años conectando hogares y empresas con la mejor tecnología al mejor precio del mercado colombiano.
      </p>
      <span class="stats-brand-years">
        📅 Más de 5 años transformando vidas con tecnología de calidad
      </span>
```

- [ ] **Step 2: Verificar en browser**

Abrir http://localhost:3000 y hacer scroll a la sección "Nosotros". No debe aparecer texto lorem ipsum.

- [ ] **Step 3: Commit**

```bash
git add public/index.html
git commit -m "fix: replace lorem ipsum with real company description in stats section"
```

---

### Task 4: Añadir sección FAQ al homepage con schema FAQPage

**Files:**
- Modify: `public/index.html` — insertar antes de `<!-- ═══════════ FOOTER ═══════════ -->`
- Modify: `public/index.html` — añadir FAQPage al JSON-LD existente en `<head>`
- Modify: `public/css/style.css` — estilos del FAQ

- [ ] **Step 1: Insertar el HTML de la sección FAQ antes del footer**

Insertar antes de `<!-- ═══════════ FOOTER ═══════════ -->`:
```html
<!-- ═══════════ FAQ ═══════════ -->
<section class="faq-section">
  <div class="faq-inner">
    <div class="ts-section-head"><h2>Preguntas Frecuentes</h2></div>
    <div class="faq-list">

      <details class="faq-item">
        <summary class="faq-question">¿Hacen envíos a toda Colombia?</summary>
        <div class="faq-answer">
          <p>Sí, realizamos envíos a todo el territorio colombiano. Los tiempos de entrega son de 24 a 48 horas para Bogotá y de 2 a 5 días hábiles para el resto del país, según la transportadora y la zona.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">¿Los productos tienen garantía?</summary>
        <div class="faq-answer">
          <p>Todos nuestros productos cuentan con garantía oficial de fábrica de mínimo 1 año. Somos distribuidores autorizados de marcas como Samsung, HP, Lenovo, JBL y Xiaomi, por lo que la garantía es directamente con el fabricante.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">¿Puedo comprar al por mayor para mi empresa?</summary>
        <div class="faq-answer">
          <p>¡Por supuesto! Contamos con una línea corporativa especializada para empresas con precios especiales por volumen, facturación electrónica y soporte técnico postventa. Contáctanos por WhatsApp o al (601) 633-6364 para asesorarte.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">¿Aceptan pagos en línea o contraentrega?</summary>
        <div class="faq-answer">
          <p>Aceptamos múltiples formas de pago: transferencia bancaria, PSE, efectivo y contraentrega en Bogotá. Para compras corporativas también manejamos crédito empresarial. Consulta disponibilidad según tu ciudad al momento de hacer el pedido.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">¿Dónde están ubicados en Bogotá?</summary>
        <div class="faq-answer">
          <p>Nuestra oficina principal está en la Carrera 15 # 77-05, Bogotá. Puedes contactarnos por WhatsApp al +57 322-581-7129 o visitarnos de lunes a viernes de 8am a 6pm y sábados de 9am a 1pm.</p>
        </div>
      </details>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Añadir FAQPage al `@graph` del JSON-LD existente en `<head>`**

En el JSON-LD del `<head>` del homepage, dentro del array `"@graph": [...]`, añadir como tercer elemento (después del objeto `WebSite`):
```json
      ,{
        "@type": "FAQPage",
        "@id": "https://tecnistore.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Hacen envíos a toda Colombia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, realizamos envíos a todo el territorio colombiano. Los tiempos de entrega son de 24 a 48 horas para Bogotá y de 2 a 5 días hábiles para el resto del país."
            }
          },
          {
            "@type": "Question",
            "name": "¿Los productos tienen garantía?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Todos nuestros productos cuentan con garantía oficial de fábrica de mínimo 1 año. Somos distribuidores autorizados de Samsung, HP, Lenovo, JBL y Xiaomi."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo comprar al por mayor para mi empresa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí, contamos con línea corporativa con precios por volumen, facturación electrónica y soporte técnico postventa."
            }
          },
          {
            "@type": "Question",
            "name": "¿Aceptan pagos en línea o contraentrega?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Aceptamos transferencia bancaria, PSE, efectivo y contraentrega en Bogotá. Para empresas también manejamos crédito empresarial."
            }
          },
          {
            "@type": "Question",
            "name": "¿Dónde están ubicados en Bogotá?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Carrera 15 # 77-05, Bogotá. Horario: lunes a viernes 8am–6pm, sábados 9am–1pm. WhatsApp: +57 322-581-7129."
            }
          }
        ]
      }
```

- [ ] **Step 3: Añadir estilos FAQ al final de `public/css/style.css`**

```css
/* === FAQ SECTION === */
.faq-section {
  background: #f7f9fc;
  padding: 60px 20px;
}
.faq-inner {
  max-width: 820px;
  margin: 0 auto;
}
.faq-list {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faq-item {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}
.faq-question {
  font-size: 16px;
  font-weight: 700;
  color: #0a1628;
  padding: 18px 24px;
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
.faq-question::-webkit-details-marker { display: none; }
.faq-question::after {
  content: '+';
  font-size: 22px;
  font-weight: 300;
  color: #008fc2;
  flex-shrink: 0;
  margin-left: 12px;
  transition: transform 0.2s;
}
.faq-item[open] .faq-question::after {
  transform: rotate(45deg);
}
.faq-answer {
  padding: 0 24px 18px;
  color: #555;
  font-size: 15px;
  line-height: 1.7;
}
@media (max-width: 600px) {
  .faq-question { font-size: 14px; padding: 15px 18px; }
  .faq-answer { padding: 0 18px 15px; }
}
```

- [ ] **Step 4: Verificar en browser**

Abrir http://localhost:3000 y hacer scroll hasta el final. La sección FAQ debe aparecer encima del footer. Hacer click en cada pregunta para verificar que se expande y colapsa.

- [ ] **Step 5: Verificar JSON-LD en DevTools**

En la consola del navegador en http://localhost:3000:
```js
JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'].map(x => x['@type'])
```
Resultado esperado: `["LocalBusiness", "WebSite", "FAQPage"]`

- [ ] **Step 6: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: add FAQ section with FAQPage schema to homepage"
```

---

### Task 5: Actualizar `<head>` de la tienda con meta tags y H1

**Files:**
- Modify: `public/tienda/index.html` líneas 1–11 (bloque `<head>`)

- [ ] **Step 1: Reemplazar el bloque `<head>` completo en `public/tienda/index.html`**

Reemplazar:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda | Tecnistore</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
</head>
```

Con:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda de Tecnología en Bogotá | Tecnistore</title>
  <meta name="description" content="Explora nuestro catálogo de celulares, portátiles, periféricos, accesorios y electrodomésticos. Filtra por categoría y precio. Envíos a toda Colombia.">
  <link rel="canonical" href="https://tecnistore.com/tienda/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Tienda de Tecnología en Bogotá | Tecnistore">
  <meta property="og:description" content="Celulares, portátiles, periféricos y accesorios con garantía. Filtra por categoría y precio. Envíos a toda Colombia.">
  <meta property="og:url" content="https://tecnistore.com/tienda/">
  <meta property="og:image" content="https://tecnistore.com/wp-content/uploads/2021/03/Tnt.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://tecnistore.com/tienda/",
    "name": "Tienda de Tecnología en Bogotá | Tecnistore",
    "description": "Catálogo de celulares, portátiles, periféricos, accesorios y electrodomésticos tecnológicos",
    "url": "https://tecnistore.com/tienda/",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://tecnistore.com/"},
        {"@type": "ListItem", "position": 2, "name": "Tienda", "item": "https://tecnistore.com/tienda/"}
      ]
    }
  }
  </script>
</head>
```

- [ ] **Step 2: Añadir H1 oculto en `public/tienda/index.html`**

Insertar como primera línea después de `<body>`:
```html
<h1 class="sr-only">Tienda de Tecnología en Bogotá — Celulares, Portátiles y Periféricos</h1>
```

- [ ] **Step 3: Verificar en browser**

Abrir http://localhost:3000/tienda/. En DevTools verificar que `<title>` dice "Tienda de Tecnología en Bogotá | Tecnistore".

- [ ] **Step 4: Commit**

```bash
git add public/tienda/index.html
git commit -m "feat: add meta tags, canonical and CollectionPage schema to tienda"
```

---

### Task 6: Crear el template HTML para páginas de producto

**Files:**
- Create: `tools/product-template.html`

- [ ] **Step 1: Crear `tools/product-template.html`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <meta name="description" content="{{META_DESC}}">
  <link rel="canonical" href="https://tecnistore.com/producto/{{SLUG}}/">
  <meta property="og:type" content="product">
  <meta property="og:title" content="{{OG_TITLE}}">
  <meta property="og:description" content="{{META_DESC}}">
  <meta property="og:url" content="https://tecnistore.com/producto/{{SLUG}}/">
  <meta property="og:image" content="{{IMAGE}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">{{SCHEMA}}</script>
</head>
<body>

<div class="top-bar">
  <div class="top-bar-inner">
    <div class="top-bar-left">
      <span class="tb-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        <a href="tel:+573225817129">+57 322-581-7129</a>
      </span>
      <span class="tb-sep">|</span>
      <span class="tb-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <a href="mailto:comercial1@tntltda.com">comercial1@tntltda.com</a>
      </span>
    </div>
    <div class="top-bar-right">
      <a href="https://wa.me/573225817129" class="tb-wa" target="_blank">WhatsApp</a>
    </div>
  </div>
</div>

<header class="site-header">
  <div class="header-search-row">
    <div class="header-search-inner">
      <a href="/" class="hs-logo">
        <img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" loading="lazy">
      </a>
    </div>
  </div>
  <nav class="nav-container">
    <div class="nav-links">
      <a href="/">INICIO</a>
      <a href="/tienda/" class="active">TIENDA</a>
    </div>
    <div class="nav-logo">
      <a href="/"><img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" loading="lazy"></a>
    </div>
    <div class="nav-right">
      <a href="/#contacto">CONTACTO</a>
    </div>
  </nav>
</header>

<main class="prod-page">
  <nav class="prod-breadcrumb" aria-label="Breadcrumb">
    <a href="/">Inicio</a>
    <span aria-hidden="true">›</span>
    <a href="/tienda/">Tienda</a>
    <span aria-hidden="true">›</span>
    <a href="/tienda/?cat={{CAT_ENCODED}}">{{CATEGORY}}</a>
    <span aria-hidden="true">›</span>
    <span>{{NAME}}</span>
  </nav>

  <div class="prod-layout">
    <div class="prod-image-col">
      <img src="{{IMAGE}}" alt="{{NAME}}" class="prod-main-img" loading="eager">
    </div>
    <div class="prod-info-col">
      <span class="prod-category-badge">{{CATEGORY}}</span>
      <h1 class="prod-name">{{NAME}}</h1>
      {{DISCOUNT_BADGE}}
      <div class="prod-prices">
        <span class="prod-price">{{PRICE}}</span>
        {{OLD_PRICE}}
      </div>
      <a href="/tienda/?cat={{CAT_ENCODED}}" class="prod-back-btn">
        ← Ver todos los productos en {{CATEGORY}}
      </a>
    </div>
  </div>
</main>

<footer class="site-footer-slim">
  <div class="footer-slim-inner">
    <img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" class="footer-logo" loading="lazy">
    <div class="footer-slim-copy">
      <p>Copyright &copy; 2026 Tecnistore</p>
      <p>&copy; TNT Technistore Ltda. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add tools/product-template.html
git commit -m "feat: add product page HTML template"
```

---

### Task 7: Crear el script generador de páginas de producto

**Files:**
- Create: `tools/generate-product-pages.js`

- [ ] **Step 1: Crear `tools/generate-product-pages.js`**

```js
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tecnistore.com';
const PUBLIC = path.join(__dirname, '..', 'public');
const PRODUCTS_FILE = path.join(PUBLIC, 'js', 'products-data.js');
const TEMPLATE_FILE = path.join(__dirname, 'product-template.html');
const OUTPUT_DIR = path.join(PUBLIC, 'producto');
const SITEMAP_FILE = path.join(PUBLIC, 'sitemap.xml');

function makeSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function formatPrice(price) {
  return '$ ' + price.toLocaleString('es-CO');
}

function loadProducts() {
  const src = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  const match = src.match(/var\s+ALL_PRODUCTS\s*=\s*(\[[\s\S]*\]);/);
  if (!match) throw new Error('Could not find ALL_PRODUCTS in ' + PRODUCTS_FILE);
  return JSON.parse(match[1]);
}

function buildSchema(p, slug) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": BASE_URL + '/producto/' + slug + '/',
        "name": p.name,
        "image": p.images[0] || '',
        "offers": {
          "@type": "Offer",
          "price": p.price,
          "priceCurrency": "COP",
          "availability": "https://schema.org/InStock",
          "url": BASE_URL + '/producto/' + slug + '/'
        },
        ...(p.brand ? { "brand": { "@type": "Brand", "name": p.brand } } : {})
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE_URL + '/' },
          { "@type": "ListItem", "position": 2, "name": "Tienda", "item": BASE_URL + '/tienda/' },
          { "@type": "ListItem", "position": 3, "name": p.category, "item": BASE_URL + '/tienda/?cat=' + encodeURIComponent(p.category) },
          { "@type": "ListItem", "position": 4, "name": p.name, "item": BASE_URL + '/producto/' + slug + '/' }
        ]
      }
    ]
  };
  return JSON.stringify(schema, null, 2);
}

function buildPage(template, p, slug) {
  const price = formatPrice(p.price);
  const oldPrice = (p.oldPrice && p.oldPrice > p.price)
    ? '<span class="prod-old-price">' + formatPrice(p.oldPrice) + '</span>'
    : '';
  const discountBadge = p.discount
    ? '<span class="prod-discount-badge">' + p.discount + '</span>'
    : '';
  const metaDesc = 'Compra ' + p.name + ' en Bogotá - ' + price + ' COP. '
    + (p.discount ? p.discount + '. ' : '')
    + 'Garantía de fábrica. Envíos a toda Colombia. Tecnistore.';
  const ogTitle = p.name + ' | ' + price + ' | Tecnistore Bogotá';
  const catEncoded = encodeURIComponent(p.category);

  return template
    .replace(/\{\{TITLE\}\}/g, p.name + ' | Precio en Bogotá | Tecnistore')
    .replace(/\{\{META_DESC\}\}/g, metaDesc)
    .replace(/\{\{OG_TITLE\}\}/g, ogTitle)
    .replace(/\{\{SLUG\}\}/g, slug)
    .replace(/\{\{IMAGE\}\}/g, p.images[0] || '')
    .replace(/\{\{SCHEMA\}\}/g, buildSchema(p, slug))
    .replace(/\{\{NAME\}\}/g, p.name)
    .replace(/\{\{CATEGORY\}\}/g, p.category)
    .replace(/\{\{CAT_ENCODED\}\}/g, catEncoded)
    .replace(/\{\{PRICE\}\}/g, price)
    .replace(/\{\{OLD_PRICE\}\}/g, oldPrice)
    .replace(/\{\{DISCOUNT_BADGE\}\}/g, discountBadge);
}

function generateSitemap(urls) {
  const items = urls.map(u => '  <url>\n    <loc>' + u + '</loc>\n  </url>').join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + items + '\n</urlset>';
}

function run() {
  const products = loadProducts();
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const slugCount = {};
  const urls = [BASE_URL + '/', BASE_URL + '/tienda/'];
  let generated = 0;

  for (const p of products) {
    if (!p.price || p.price <= 0) continue;
    let slug = makeSlug(p.name);
    if (!slug) continue;

    slugCount[slug] = (slugCount[slug] || 0) + 1;
    if (slugCount[slug] > 1) slug = slug + '-' + slugCount[slug];

    const dir = path.join(OUTPUT_DIR, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, 'index.html'), buildPage(template, p, slug), 'utf8');
    urls.push(BASE_URL + '/producto/' + slug + '/');
    generated++;
  }

  fs.writeFileSync(SITEMAP_FILE, generateSitemap(urls), 'utf8');
  console.log('Generated ' + generated + ' product pages');
  console.log('Sitemap written to public/sitemap.xml with ' + urls.length + ' URLs');
}

run();
```

- [ ] **Step 2: Commit**

```bash
git add tools/generate-product-pages.js
git commit -m "feat: add product page generator script"
```

---

### Task 8: Ejecutar el generador y verificar el output

**Files:**
- Generated: `public/producto/*/index.html`
- Generated: `public/sitemap.xml`

- [ ] **Step 1: Ejecutar el script**

```bash
node tools/generate-product-pages.js
```

Salida esperada:
```
Generated N product pages
Sitemap written to public/sitemap.xml with N+2 URLs
```

- [ ] **Step 2: Verificar carpetas generadas**

```bash
node -e "const fs=require('fs'); const dirs=fs.readdirSync('public/producto'); console.log('Primeras 5:', dirs.slice(0,5)); console.log('Total:', dirs.length);"
```

Esperado: 5 slugs de carpeta mostrados, total > 0.

- [ ] **Step 3: Verificar el sitemap**

```bash
node -e "const s=require('fs').readFileSync('public/sitemap.xml','utf8'); const n=(s.match(/<loc>/g)||[]).length; console.log('URLs en sitemap:', n);"
```

Esperado: número > 2.

- [ ] **Step 4: Verificar una página de producto en browser**

Con el servidor corriendo, tomar un slug de la lista (ej: `celular-samsung-a05`) y abrir:
http://localhost:3000/producto/celular-samsung-a05/

Verificar que aparecen: breadcrumb navegable, imagen del producto, badge de categoría, H1 con el nombre, precio formateado en COP, botón "Ver todos los productos en [Categoría]".

- [ ] **Step 5: Validar el JSON-LD de la página de producto**

En DevTools de la página de producto, ejecutar en consola:
```js
JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'].map(x=>x['@type'])
```

Resultado esperado: `["Product", "BreadcrumbList"]`

- [ ] **Step 6: Verificar el sitemap en browser**

Abrir http://localhost:3000/sitemap.xml — debe mostrar XML válido con URLs de productos.

- [ ] **Step 7: Commit de archivos generados**

```bash
git add public/producto/ public/sitemap.xml
git commit -m "feat: generate product pages and sitemap"
```

---

### Task 9: Añadir CSS para las páginas de producto

**Files:**
- Modify: `public/css/style.css` — añadir estilos al final del archivo

- [ ] **Step 1: Añadir estilos de páginas de producto al final de `public/css/style.css`**

```css
/* === PRODUCT PAGE === */
.prod-page {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
}
.prod-breadcrumb {
  font-size: 13px;
  color: #888;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.prod-breadcrumb a { color: #008fc2; }
.prod-breadcrumb a:hover { text-decoration: underline; }
.prod-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}
.prod-main-img {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #eee;
  background: #f7f9fc;
  object-fit: contain;
  max-height: 420px;
}
.prod-info-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.prod-category-badge {
  font-size: 12px;
  font-weight: 700;
  color: #008fc2;
  background: #e6f6fb;
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.prod-name {
  font-size: 26px;
  font-weight: 900;
  color: #0a1628;
  line-height: 1.2;
}
.prod-discount-badge {
  background: #e53e3e;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;
}
.prod-prices {
  display: flex;
  align-items: center;
  gap: 12px;
}
.prod-price {
  font-size: 30px;
  font-weight: 900;
  color: #0a1628;
}
.prod-old-price {
  font-size: 18px;
  color: #aaa;
  text-decoration: line-through;
}
.prod-back-btn {
  display: inline-block;
  margin-top: 8px;
  padding: 12px 24px;
  background: #008fc2;
  color: #fff;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  transition: background 0.2s;
  width: fit-content;
}
.prod-back-btn:hover { background: #0073a0; }
@media (max-width: 700px) {
  .prod-layout { grid-template-columns: 1fr; gap: 24px; }
  .prod-name { font-size: 20px; }
  .prod-price { font-size: 24px; }
}
```

- [ ] **Step 2: Verificar en browser**

Recargar http://localhost:3000/producto/celular-samsung-a05/ — imagen a la izquierda, info a la derecha, breadcrumb visible arriba. Precio grande y legible.

- [ ] **Step 3: Verificar mobile**

En DevTools activar vista móvil (Ctrl+Shift+M) a 375px. El layout debe apilarse en columna única.

- [ ] **Step 4: Commit**

```bash
git add public/css/style.css
git commit -m "feat: add product page CSS styles"
```
