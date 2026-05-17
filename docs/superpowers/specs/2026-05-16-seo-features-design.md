# Tecnistore — SEO + Conversión: Diseño

**Fecha:** 2026-05-16
**Rama de trabajo:** worktree-demo-features-seo

## Contexto

Tecnistore es un e-commerce estático (HTML/CSS/JS puro) de tecnología con sede en Bogotá, Colombia. Sirve a consumidores finales y empresas. Stack: `serve` + Netlify, sin framework ni build tool. Actualmente tiene homepage, catálogo `/tienda/` con filtros/búsqueda, carrito con localStorage, y datos de productos en `products-data.js`.

**Objetivo:** Mejorar atractivo visual Y posicionamiento en Google (SEO local Bogotá) por igual.

---

## Enfoque elegido: Paquete Completo (Opción C)

Tres capas que se refuerzan mutuamente:

1. Páginas de producto estáticas individuales
2. SEO técnico base
3. Secciones de confianza en homepage

---

## Capa 1 — Páginas de producto individuales

### URLs generadas
`/public/producto/[slug]/index.html`

Ejemplo: `/public/producto/samsung-galaxy-a16/index.html`

### Contenido de cada página
- `<title>`: `{Nombre producto} | Precio en Bogotá | Tecnistore`
- `<meta name="description">`: precio, categoría, disponibilidad
- `<link rel="canonical" href="https://tecnistore.com/producto/{slug}/">`
- `<meta property="og:title">`, `og:description`, `og:image`
- `<h1>`: nombre completo del producto (único y descriptivo)
- Imagen principal con `alt` descriptivo y `loading="lazy"`
- Precio formateado en COP
- Breadcrumb navegable: Inicio → Tienda → {Categoría} → {Producto}
- Botón "Ver en tienda" → `/tienda/` filtrado por categoría
- **Sin botón WhatsApp por ahora**

### Schema.org en cada página de producto
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "...",
  "image": "...",
  "offers": {
    "@type": "Offer",
    "price": "...",
    "priceCurrency": "COP",
    "availability": "https://schema.org/InStock"
  },
  "brand": { "@type": "Brand", "name": "..." }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### Script generador
**Archivo:** `tools/generate-product-pages.js`

- Lee `src/products-data.js`
- Genera slug limpio por nombre (minúsculas, sin tildes, guiones)
- Copia template HTML (`tools/product-template.html`) y reemplaza placeholders
- Crea `/public/producto/{slug}/index.html` por cada producto
- Genera `public/sitemap.xml` como paso final
- Ejecución: `node tools/generate-product-pages.js`

---

## Capa 2 — SEO técnico base

### `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://tecnistore.com/sitemap.xml
```

### `public/sitemap.xml` (generado por el script)
Incluye:
- `https://tecnistore.com/`
- `https://tecnistore.com/tienda/`
- Una entrada por cada página de producto

### Meta tags en todas las páginas
Cada página existente (homepage, /tienda/) recibe manualmente:
- `<title>` único y descriptivo
- `<meta name="description">` de ~155 caracteres con keyword local
- `<link rel="canonical">`
- Open Graph básico (`og:title`, `og:description`, `og:image`)

### Schema.org en homepage
```json
{
  "@type": "LocalBusiness",
  "name": "Tecnistore",
  "telephone": "+573225817129",
  "email": "comercial1@tntltda.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bogotá",
    "addressCountry": "CO"
  },
  "priceRange": "$$"
}
```

```json
{
  "@type": "WebSite",
  "url": "https://tecnistore.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://tecnistore.com/tienda/?q={query}",
    "query-input": "required name=query"
  }
}
```

### Schema.org en `/tienda/`
```json
{
  "@type": "ItemList",
  "name": "Catálogo de productos Tecnistore",
  "itemListElement": [...]
}
```

### Imágenes
Todos los `<img>` en páginas generadas deben tener:
- `alt` descriptivo con nombre del producto
- `loading="lazy"` (excepto imagen above-the-fold)

### H1 únicos
- Homepage: ya tiene `<h2>` en ofertas — agregar `<h1>` visible o visualmente oculto con keyword principal
- `/tienda/`: agregar `<h1>Tienda de Tecnología en Bogotá</h1>`
- Páginas de producto: `<h1>` = nombre del producto

---

## Capa 3 — Secciones de confianza en homepage

### Bloque A — Franja de marcas
**Posición:** Después de la sección de categorías  
**Contenido:** Logos SVG en escala de grises: Samsung, HP, JBL, Xiaomi, Motorola, Lenovo  
**Estilo:** Fila horizontal con hover a color

### Bloque B — Stats / Números
**Posición:** Después de la franja de marcas  
**Contenido:** 4 cifras en fila:
- `500+` Clientes satisfechos *(confirmar número real)*
- `1.000+` Productos disponibles *(confirmar número real)*
- `5+` Años en el mercado *(confirmar número real)*
- Bogotá y toda Colombia

### Bloque C — FAQ
**Posición:** Antes del footer  
**Preguntas (5):**
1. ¿Hacen envíos a toda Colombia?
2. ¿Los productos tienen garantía?
3. ¿Puedo comprar al por mayor para mi empresa?
4. ¿Aceptan pagos en línea o contraentrega?
5. ¿Dónde están ubicados en Bogotá?

**Schema.org:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [{ "@type": "Question", ... }]
}
```

---

## Archivos que se crean o modifican

| Archivo | Acción |
|---|---|
| `tools/generate-product-pages.js` | Crear |
| `tools/product-template.html` | Crear |
| `public/producto/*/index.html` | Generar (uno por producto) |
| `public/sitemap.xml` | Generar |
| `public/robots.txt` | Crear |
| `public/index.html` | Modificar (meta tags, Schema.org, 3 bloques nuevos) |
| `public/tienda/index.html` | Modificar (meta tags, H1, Schema.org ItemList) |
| `public/css/style.css` | Modificar (estilos de los 3 bloques nuevos) |

---

## Notas de implementación

- La URL base `https://tecnistore.com` se usa en sitemap y Schema.org. Si el dominio real es diferente, actualizar en el script generador antes de correrlo.
- Los números del bloque Stats deben ser confirmados por el cliente antes de publicar.

---

## Fuera de alcance (por ahora)
- Botón WhatsApp en páginas de producto
- Blog o sección de noticias
- Google Analytics / Search Console
- Pagos en línea
