# Spec: Limpieza, Seguridad y Preparación para Hostinger

**Fecha:** 2026-05-25
**Estado:** Aprobado

---

## Objetivo

Dejar el repositorio limpio, proteger las credenciales de WooCommerce y preparar el sitio para despliegue en Hostinger (shared o VPS).

---

## Sección 1 — Limpieza de archivos basura

### Eliminar del repositorio

- `public/wp-content/` — archivos del tema Divi/WordPress scrapeados, no utilizados por el sitio nuevo
- `build_empresas.py` y `build_tienda.py` — mover a `scripts/` para mantener el root limpio
- Sitemaps XML heredados del WordPress original en `public/`:
  - `author-sitemap.xml`
  - `category-sitemap.xml`
  - `layout_tag-sitemap.xml`
  - `page-sitemap.xml`
  - `post-sitemap.xml`
  - `product-sitemap.xml`
  - `product_cat-sitemap.xml`
  - `product_tag-sitemap.xml`
  - `main-sitemap.xsl`
  - `author-sitemap.xml`
  - Se conservan `sitemap.xml` y `sitemap_index.xml` para SEO

### Actualizar `.gitignore`

Agregar las siguientes entradas:

```
public/js/woo-config.js
public/wp-content/
config.php
```

---

## Sección 2 — Arquitectura del proxy PHP

### Problema actual

`public/js/woo-config.js` expone `consumer_key` y `consumer_secret` de WooCommerce en texto plano en el JavaScript del navegador. Cualquier visitante puede verlas en DevTools.

### Solución: PHP proxy + config fuera del web root

**Flujo nuevo:**
```
Browser → GET /api/products.php?page=N
              ↓
          products.php lee config.php (fuera de public_html)
              ↓
          products.php llama a WooCommerce API
              ↓
          Devuelve JSON al browser
```

### Archivos a crear

**`config.example.php`** (va al repo, sin credenciales reales):
```php
<?php
return [
  'url' => 'https://tntltda.com',
  'ck'  => 'ck_REEMPLAZA_AQUI',
  'cs'  => 'cs_REEMPLAZA_AQUI',
  'cacheTTL' => 30,
];
```

**`config.php`** (NUNCA al repo — se sube manualmente al servidor un nivel arriba de `public_html/`):
```
/home/tuusuario/         ← raíz del servidor
  ├── config.php         ← credenciales reales aquí
  └── public_html/       ← document root
```

**`public/api/products.php`** — proxy que:
1. Carga `config.php` desde `dirname(__DIR__, 2) . '/config.php'` (un nivel arriba de `public_html/`)
2. Recibe `?page=N` como parámetro (valida que sea entero > 0)
3. Llama a WooCommerce `/wp-json/wc/v3/products` con las credenciales del config
4. Devuelve el JSON crudo con los headers correctos (`Content-Type: application/json`)
5. En caso de error devuelve HTTP 502 con JSON `{"error": "..."}`

### Archivos a modificar

**`public/js/woo-sync.js`:**
- `buildURL()` pasa de construir URL de WooCommerce a llamar `/api/products.php?page=N`
- Se elimina la lectura de `cfg.ck` y `cfg.cs`
- Se mantiene toda la lógica de caché localStorage, mapeo de categorías y filtro de stock

**`public/js/woo-config.js`:**
- Se elimina `ck` y `cs`
- Solo queda `cacheTTL` y `url` (para referencias de UI, no para autenticación)

---

## Sección 3 — Estructura final del deploy

### Lo que sube a `public_html/` en Hostinger

```
public_html/
  ├── index.html
  ├── tienda/index.html
  ├── equipo/index.html
  ├── empresas/index.html
  ├── admin/index.html
  ├── css/
  │   ├── style.css
  │   ├── tienda.css
  │   ├── equipo.css
  │   ├── loader.css
  │   └── cart.css
  ├── js/
  │   ├── main.js
  │   ├── tienda.js
  │   ├── cart.js
  │   ├── woo-sync.js      ← actualizado (sin credenciales)
  │   ├── woo-config.js    ← solo cacheTTL (sin ck/cs)
  │   ├── animations.js
  │   ├── loader.js
  │   └── products-data.js
  ├── api/
  │   └── products.php     ← nuevo proxy
  ├── sitemap.xml
  ├── sitemap_index.xml
  └── ... (imágenes, otras páginas heredadas)
```

### Lo que se sube manualmente al servidor (1 sola vez, NUNCA al repo)

```
/home/tuusuario/
  └── config.php           ← credenciales reales
```

### Scripts de build

`build_empresas.py` y `build_tienda.py` se mueven a `scripts/`. No se despliegan.

---

## Checklist de despliegue

1. Subir `public/` → `public_html/` en Hostinger (vía FTP o panel)
2. Crear y subir `config.php` manualmente un nivel arriba de `public_html/`
3. Verificar que `/api/products.php` responde con JSON en producción
4. Verificar que la tienda carga productos correctamente

---

## Lo que NO cambia

- Toda la lógica de UI (carrusel, filtros, carrito, animaciones)
- La lógica de caché en localStorage de `woo-sync.js`
- El mapeo de categorías WooCommerce → categorías internas
- El filtro de stock

---

## Seguridad: qué se protege y qué no

| Riesgo | Estado después |
|--------|---------------|
| Credenciales WooCommerce en JS | Eliminadas del frontend |
| Credenciales en el repo git | Excluidas por `.gitignore` |
| `config.php` accesible desde web | No — está fuera de `public_html/` |
| Código JS legible en DevTools | Normal — el código de lógica no es secreto |
| Admin panel (`/admin/`) sin auth real | Sin cambios (fuera de scope) |
