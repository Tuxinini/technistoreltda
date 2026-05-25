# Limpieza, Seguridad y Deploy Hostinger — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Limpiar el repositorio de archivos WordPress scrapeados, mover las credenciales WooCommerce a un proxy PHP seguro y dejar el sitio listo para subir a Hostinger.

**Architecture:** Se elimina `public/wp-content/` del repo y del disco. Las credenciales WooCommerce se sacan del JS del browser y pasan a vivir en `config.php` fuera del `public_html/` del servidor. Un proxy `public/api/products.php` intermedia las peticiones a la API de WooCommerce. `woo-sync.js` pasa a llamar `/api/products.php` en lugar de WooCommerce directamente.

**Tech Stack:** HTML/CSS/JS vanilla, PHP 7.4+ (disponible en Hostinger shared y VPS), cURL de PHP, Git.

---

## Mapa de archivos

| Acción | Archivo |
|--------|---------|
| Modificar | `.gitignore` |
| Eliminar del repo + disco | `public/wp-content/` (19 813 archivos) |
| Eliminar del repo + disco | `public/author-sitemap.xml`, `public/category-sitemap.xml`, `public/layout_tag-sitemap.xml`, `public/page-sitemap.xml`, `public/post-sitemap.xml`, `public/product-sitemap.xml`, `public/product_cat-sitemap.xml`, `public/product_tag-sitemap.xml`, `public/main-sitemap.xsl` |
| Mover | `build_empresas.py` → `scripts/build_empresas.py` |
| Mover | `build_tienda.py` → `scripts/build_tienda.py` |
| Crear | `config.example.php` (en root del repo) |
| Crear | `public/api/products.php` |
| Modificar | `public/js/woo-sync.js` |
| Modificar | `public/js/woo-config.js` |

---

## Task 1: Actualizar `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Agregar entradas al `.gitignore`**

Abrir `.gitignore` y añadir al final:

```
# Credenciales WooCommerce — nunca al repo
public/js/woo-config.js
config.php

# Archivos WordPress scrapeados
public/wp-content/
```

- [ ] **Step 2: Verificar que el archivo quedó bien**

```bash
cat .gitignore
```

Esperado: las tres entradas nuevas aparecen al final del archivo.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: exclude woo-config, wp-content and config.php from repo"
```

---

## Task 2: Eliminar `public/wp-content/` del repo y del disco

> ⚠️ Esta operación elimina 19 813 archivos rastreados. Es irreversible en el disco local, pero el historial de git los conserva. Verificar que no hay nada valioso antes de continuar.

**Files:**
- Delete: `public/wp-content/` (todo el directorio)

- [ ] **Step 1: Quitar del índice de git y del disco**

```bash
git rm -r public/wp-content/
```

Este comando tarda varios minutos por la cantidad de archivos. Salida esperada: miles de líneas `rm 'public/wp-content/...'` y finalmente sin error.

- [ ] **Step 2: Verificar que el directorio ya no existe**

```bash
ls public/wp-content/ 2>/dev/null && echo "AUN EXISTE" || echo "OK — eliminado"
```

Esperado: `OK — eliminado`

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove scraped WordPress wp-content directory"
```

---

## Task 3: Eliminar sitemaps heredados de WordPress

**Files:**
- Delete: varios XMLs en `public/`

- [ ] **Step 1: Eliminar archivos de sitemap del WordPress original**

```bash
git rm public/author-sitemap.xml \
       public/category-sitemap.xml \
       public/layout_tag-sitemap.xml \
       public/page-sitemap.xml \
       public/post-sitemap.xml \
       public/product-sitemap.xml \
       public/product_cat-sitemap.xml \
       public/product_tag-sitemap.xml \
       public/main-sitemap.xsl
```

- [ ] **Step 2: Verificar que `sitemap.xml` y `sitemap_index.xml` siguen intactos**

```bash
ls public/sitemap.xml public/sitemap_index.xml
```

Esperado: ambos archivos listados sin error.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove legacy WordPress sitemaps"
```

---

## Task 4: Mover scripts de build a `scripts/`

**Files:**
- Move: `build_empresas.py` → `scripts/build_empresas.py`
- Move: `build_tienda.py` → `scripts/build_tienda.py`

- [ ] **Step 1: Crear carpeta `scripts/` y mover los archivos**

```bash
mkdir -p scripts
git mv build_empresas.py scripts/build_empresas.py
git mv build_tienda.py scripts/build_tienda.py
```

> Nota: `build_empresas.py` y `build_tienda.py` están actualmente sin rastrear (`??` en git status). Si `git mv` falla por eso, usar en su lugar:
> ```bash
> mkdir -p scripts
> mv build_empresas.py scripts/build_empresas.py
> mv build_tienda.py scripts/build_tienda.py
> git add scripts/
> ```

- [ ] **Step 2: Verificar la nueva ubicación**

```bash
ls scripts/
```

Esperado: `build_empresas.py  build_tienda.py`

- [ ] **Step 3: Commit**

```bash
git add scripts/
git commit -m "chore: move build scripts to scripts/"
```

---

## Task 5: Crear `config.example.php`

**Files:**
- Create: `config.example.php` (root del repo)

- [ ] **Step 1: Crear el archivo de plantilla**

Crear `config.example.php` en la raíz del repositorio con este contenido exacto:

```php
<?php
/**
 * Configuración de credenciales WooCommerce.
 *
 * INSTRUCCIONES DE DESPLIEGUE EN HOSTINGER:
 * 1. Copiar este archivo y renombrarlo a config.php
 * 2. Rellenar las credenciales reales
 * 3. Subir config.php UN NIVEL ARRIBA de public_html/
 *    Ejemplo: /home/u123456789/config.php
 *             (NO dentro de public_html/)
 * 4. NUNCA subir config.php al repositorio git
 */
return [
    'url'      => 'https://tntltda.com',
    'ck'       => 'ck_REEMPLAZA_AQUI',
    'cs'       => 'cs_REEMPLAZA_AQUI',
    'cacheTTL' => 30,
];
```

- [ ] **Step 2: Verificar que `config.php` (sin "example") sigue excluido**

```bash
git check-ignore -v config.php
```

Esperado: `.gitignore:X:config.php  config.php`

- [ ] **Step 3: Commit**

```bash
git add config.example.php
git commit -m "chore: add config.example.php for server credentials"
```

---

## Task 6: Crear el proxy PHP `public/api/products.php`

**Files:**
- Create: `public/api/products.php`

- [ ] **Step 1: Crear el directorio `public/api/`**

```bash
mkdir -p public/api
```

- [ ] **Step 2: Crear `public/api/products.php`**

```php
<?php
header('Content-Type: application/json; charset=utf-8');

/*
 * Proxy WooCommerce — public/api/products.php
 *
 * Lee credenciales desde config.php que vive UN NIVEL ARRIBA
 * de public_html/ (nunca accesible desde el navegador).
 *
 * Parámetros GET:
 *   page (int, opcional, default 1) — página de productos
 *
 * Respuesta exitosa:
 *   HTTP 200 + JSON array de productos + headers X-WP-TotalPages, X-WP-Total
 *
 * Respuesta de error:
 *   HTTP 500 / 502 + JSON { "error": "mensaje" }
 */

/* ── Cargar config ─────────────────────────────────────── */
// dirname(__DIR__) = public/  →  dirname(__DIR__, 2) = public_html/../ = raíz del servidor
$configPath = dirname(__DIR__, 2) . '/config.php';

if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Configuración del servidor no encontrada']);
    exit;
}

$cfg = require $configPath;

if (empty($cfg['ck']) || strpos($cfg['ck'], 'REEMPLAZA') !== false) {
    http_response_code(500);
    echo json_encode(['error' => 'Credenciales WooCommerce no configuradas']);
    exit;
}

/* ── Parámetros de la petición ─────────────────────────── */
$page = max(1, (int)($_GET['page'] ?? 1));

/* ── Construir URL de WooCommerce ──────────────────────── */
$url = rtrim($cfg['url'], '/') . '/wp-json/wc/v3/products'
     . '?consumer_key='    . urlencode($cfg['ck'])
     . '&consumer_secret=' . urlencode($cfg['cs'])
     . '&per_page=100'
     . '&page=' . $page
     . '&status=publish';

/* ── Petición cURL ─────────────────────────────────────── */
$totalPages   = 1;
$totalProducts = 0;

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    CURLOPT_HEADERFUNCTION => function ($curl, $header) use (&$totalPages, &$totalProducts) {
        $len  = strlen($header);
        $parts = explode(':', $header, 2);
        if (count($parts) < 2) return $len;
        $name = strtolower(trim($parts[0]));
        if ($name === 'x-wp-totalpages') $totalPages    = (int) trim($parts[1]);
        if ($name === 'x-wp-total')      $totalProducts = (int) trim($parts[1]);
        return $len;
    },
]);

$body      = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

/* ── Manejar errores ───────────────────────────────────── */
if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Error de conexión: ' . $curlError]);
    exit;
}

if ($httpCode >= 400) {
    http_response_code(502);
    echo json_encode(['error' => 'WooCommerce devolvió HTTP ' . $httpCode]);
    exit;
}

/* ── Reenviar headers de paginación ───────────────────── */
header('X-WP-TotalPages: ' . $totalPages);
header('X-WP-Total: ' . $totalProducts);

echo $body;
```

- [ ] **Step 3: Verificar sintaxis PHP**

```bash
php -l public/api/products.php
```

Esperado: `No syntax errors detected in public/api/products.php`

- [ ] **Step 4: Commit**

```bash
git add public/api/products.php
git commit -m "feat: add WooCommerce PHP proxy at /api/products.php"
```

---

## Task 7: Actualizar `public/js/woo-sync.js`

**Files:**
- Modify: `public/js/woo-sync.js`

Los cambios son dos:
1. `buildURL()` ahora apunta a `/api/products.php` (sin credenciales)
2. La guardia de `initWooProducts` ya no comprueba `cfg.ck`

- [ ] **Step 1: Reemplazar `buildURL()`**

Localizar en `woo-sync.js` (líneas 88-93):

```javascript
  function buildURL(cfg, page) {
    return cfg.url + '/wp-json/wc/v3/products' +
      '?consumer_key='    + encodeURIComponent(cfg.ck) +
      '&consumer_secret=' + encodeURIComponent(cfg.cs) +
      '&per_page=100&page=' + page + '&status=publish';
  }
```

Reemplazar con:

```javascript
  function buildURL(cfg, page) {
    return '/api/products.php?page=' + page;
  }
```

- [ ] **Step 2: Reemplazar la guardia de credenciales en `initWooProducts`**

Localizar (líneas 132-135):

```javascript
  window.initWooProducts = function (onReady, onError) {
    var cfg = window.WOO_CONFIG;
    if (!cfg || !cfg.ck || cfg.ck.indexOf('REEMPLAZA') !== -1) {
      if (onError) onError('WooCommerce no configurado');
      return;
    }
```

Reemplazar con:

```javascript
  window.initWooProducts = function (onReady, onError) {
    var cfg = window.WOO_CONFIG;
    if (!cfg) {
      if (onError) onError('WooCommerce no configurado');
      return;
    }
```

- [ ] **Step 3: Verificar que no quedan referencias a `cfg.ck` o `cfg.cs`**

```bash
grep -n "cfg\.ck\|cfg\.cs\|consumer_key\|consumer_secret" public/js/woo-sync.js
```

Esperado: sin resultados (salida vacía).

- [ ] **Step 4: Commit**

```bash
git add public/js/woo-sync.js
git commit -m "feat: route WooCommerce fetches through /api/products.php proxy"
```

---

## Task 8: Simplificar `public/js/woo-config.js`

**Files:**
- Modify: `public/js/woo-config.js`

- [ ] **Step 1: Reemplazar el contenido del archivo**

El archivo actualmente contiene `ck` y `cs`. Reemplazar todo el contenido con:

```javascript
/* ══════════════════════════════════════════════════════
   CONFIGURACIÓN TIENDA — woo-config.js
   Las credenciales de API viven en el servidor (config.php).
   ══════════════════════════════════════════════════════ */
window.WOO_CONFIG = {
  url:      'https://tntltda.com',
  cacheTTL: 30
};
```

- [ ] **Step 2: Verificar que no hay credenciales en el archivo**

```bash
grep -n "ck\|cs\|consumer\|secret\|key" public/js/woo-config.js
```

Esperado: sin resultados (o solo coincidencias en comentarios, no en valores de datos).

- [ ] **Step 3: Agregar al staging (aunque esté en .gitignore para producción, lo commiteamos esta vez sin credenciales)**

> Nota: `.gitignore` excluye `public/js/woo-config.js`, así que `git add` normal lo ignorará. Usar `-f` para forzar el add ya que el archivo ahora es seguro (sin credenciales):

```bash
git add -f public/js/woo-config.js
git commit -m "feat: strip credentials from woo-config.js, proxy handles auth"
```

---

## Task 9: Verificación final local

- [ ] **Step 1: Revisar el estado del repo**

```bash
git status
```

Esperado: árbol de trabajo limpio (o solo archivos no rastreados irrelevantes).

- [ ] **Step 2: Verificar que `woo-config.js` ya no tiene credenciales**

```bash
grep -r "ck_\|cs_" public/js/
```

Esperado: sin resultados.

- [ ] **Step 3: Verificar que `public/wp-content/` no existe**

```bash
ls public/wp-content/ 2>/dev/null && echo "EXISTE — revisar" || echo "OK"
```

Esperado: `OK`

- [ ] **Step 4: Verificar sintaxis de todos los archivos PHP**

```bash
php -l public/api/products.php && php -l config.example.php
```

Esperado:
```
No syntax errors detected in public/api/products.php
No syntax errors detected in config.example.php
```

- [ ] **Step 5: Revisar el log de commits**

```bash
git log --oneline -8
```

Esperado: ver los 5-6 commits de este plan en la parte superior.

---

## Checklist de despliegue en Hostinger

Una vez que el repo está listo, estos son los pasos **manuales** de subida al servidor:

1. Conectarse al servidor vía FTP o el File Manager del panel Hostinger
2. Copiar `config.example.php`, renombrarlo a `config.php`, rellenar credenciales reales y subirlo a `/home/u<id>/config.php` (UN NIVEL ARRIBA de `public_html/`)
3. Subir todo el contenido de `public/` a `public_html/`
4. En el navegador, visitar `https://tudominio.com/api/products.php?page=1`
   - Esperado: JSON array con productos de WooCommerce
5. Visitar `https://tudominio.com/tienda/` y verificar que los productos cargan

---

## Notas importantes

- **`config.php` NUNCA va al repo.** El `.gitignore` ya lo excluye. La única copia con credenciales reales vive en el servidor.
- **Las páginas antiguas de WordPress** (`public/2021/`, `public/2023/`, `public/carrito/`, etc.) quedaron sin sus estilos de Divi al borrar `wp-content/`. Esas páginas son del scraping original y no forman parte del sitio nuevo — se pueden ignorar o eliminar en una limpieza posterior.
- **`woo-config.js` en el repo** (el nuevo sin credenciales) se commiteó con `git add -f` por excepción. En futuras ediciones, si se agrega accidentalmente una credencial, el `.gitignore` la excluirá automáticamente.
