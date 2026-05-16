# Tienda Catalog Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full product catalog page at `/tienda/` showing 139 products from a WooCommerce CSV export, with category filters, search, and sort — matching the existing site design.

**Architecture:** A Python script converts `Productos/*.csv` into `public/js/products-data.js` (global `ALL_PRODUCTS` array). The tienda page is a standalone HTML file that loads this data and renders it with inline JS. Cart count is shared across pages via `localStorage` with key `ts-cart`.

**Tech Stack:** Vanilla HTML/CSS/JS, Python 3 (for CSV conversion), no build tools.

---

### Task 1: CSV → products-data.js conversion script

**Files:**
- Create: `tools/csv-to-products.py`
- Create (generated): `public/js/products-data.js`

- [ ] **Step 1: Write `tools/csv-to-products.py`**

```python
import csv, re, json, os

CSV_PATH = 'Productos/wc-product-export-15-5-2026-1778894450358.csv'
OUT_PATH = 'public/js/products-data.js'

def strip_html(text):
    return re.sub(r'<[^>]+>', '', text or '').strip()

def normalize_category(cats_str):
    if not cats_str:
        return 'Sin categoría'
    first = [c.strip() for c in cats_str.split(',')][0]
    return first.split('>')[0].strip() if '>' in first else first

def parse_images(img_str):
    return [u.strip() for u in (img_str or '').split(',') if u.strip()]

def to_int(s):
    try:
        return int(float((s or '0').replace(',', '.')))
    except:
        return 0

products = []

with open(CSV_PATH, encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row.get('Publicado', '').strip() != '1':
            continue
        if row.get('Tipo', '').strip() != 'simple':
            continue
        name = row.get('Nombre', '').strip()
        if not name:
            continue
        brand     = row.get('Marcas', '').strip()
        category  = normalize_category(row.get('Categorías', ''))
        old_price = to_int(row.get('Precio normal', ''))
        price_str = row.get('Precio rebajado', '').strip()
        price     = to_int(price_str) if price_str else old_price
        if price == 0:
            price = old_price
        discount  = round((1 - price / old_price) * 100) if old_price > 0 and price < old_price else 0
        images    = parse_images(row.get('Imágenes', ''))
        short_desc = strip_html(row.get('Descripción corta', ''))
        products.append({
            'name':      name,
            'brand':     brand,
            'category':  category,
            'price':     price,
            'oldPrice':  old_price,
            'discount':  f'{discount}% OFF' if discount > 0 else '',
            'images':    images,
            'shortDesc': short_desc,
        })

os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
with open(OUT_PATH, 'w', encoding='utf-8') as f:
    f.write('var ALL_PRODUCTS = ' + json.dumps(products, ensure_ascii=False, indent=2) + ';\n')

print(f'Generated {len(products)} products → {OUT_PATH}')
```

- [ ] **Step 2: Run the script from the project root**

```bash
python tools/csv-to-products.py
```

Expected output: `Generated 139 products → public/js/products-data.js`

- [ ] **Step 3: Verify the output**

```bash
python -c "
import json
with open('public/js/products-data.js', encoding='utf-8') as f:
    data = json.loads(f.read().replace('var ALL_PRODUCTS = ','').rstrip(';\n'))
print('Products:', len(data))
cats = sorted(set(p['category'] for p in data))
print('Categories:', cats)
print('Sample:', data[0]['name'], data[0]['price'])
"
```

Expected: `Products: 139`, categories list, sample product name and price.

- [ ] **Step 4: Commit**

```bash
git add tools/csv-to-products.py public/js/products-data.js
git commit -m "feat: add CSV conversion script and generated products-data.js"
```

---

### Task 2: Tienda CSS styles

**Files:**
- Modify: `public/css/style.css` (append at end)

- [ ] **Step 1: Append tienda styles to the end of `public/css/style.css`**

```css
/* ═══════════ TIENDA PAGE ═══════════ */
.tienda-hero{background:#0a1628;color:#fff;padding:32px 20px 24px;text-align:center;}
.tienda-hero h1{font-size:1.8rem;margin:0 0 6px;font-weight:700;}
.tienda-hero p{font-size:.95rem;color:#8ba3c7;margin:0;}

.tienda-toolbar{background:#fff;border-bottom:1px solid #e8edf4;padding:16px 24px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,.06);}
.tienda-cats{display:flex;flex-wrap:wrap;gap:8px;flex:1;}
.tienda-cat-btn{padding:7px 14px;border-radius:20px;border:1.5px solid #d0d9e8;background:#fff;color:#2a3b55;font-size:.82rem;font-weight:600;cursor:pointer;transition:all .18s;}
.tienda-cat-btn:hover{border-color:#1a56db;color:#1a56db;}
.tienda-cat-btn.active{background:#1a56db;border-color:#1a56db;color:#fff;}
.tienda-search-sort{display:flex;gap:8px;align-items:center;}
.tienda-search{padding:8px 14px;border:1.5px solid #d0d9e8;border-radius:20px;font-size:.85rem;outline:none;width:200px;transition:border .18s;}
.tienda-search:focus{border-color:#1a56db;}
.tienda-sort{padding:8px 12px;border:1.5px solid #d0d9e8;border-radius:20px;font-size:.82rem;background:#fff;cursor:pointer;outline:none;}

.tienda-contador{padding:14px 24px;font-size:.85rem;color:#5a6a85;background:#f7f9fc;}

.tienda-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:24px;}
@media(max-width:1024px){.tienda-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:768px){.tienda-grid{grid-template-columns:repeat(2,1fr);padding:16px;gap:14px;}.tienda-toolbar{padding:12px 16px;}.tienda-search{width:140px;}}
@media(max-width:480px){.tienda-grid{grid-template-columns:1fr;}}

.tienda-no-results{grid-column:1/-1;text-align:center;padding:60px 20px;color:#8ba3c7;}
.tienda-no-results svg{display:block;margin:0 auto 16px;}
.tienda-no-results p{font-size:1rem;margin:0;}
.tienda-img-error{background:#f0f4fa;display:flex;align-items:center;justify-content:center;min-height:180px;}
```

- [ ] **Step 2: Verify homepage still looks correct**

Open `public/index.html` in a browser — the homepage must look identical to before this change. New CSS classes are prefixed with `.tienda-` so there should be zero conflicts.

- [ ] **Step 3: Commit**

```bash
git add public/css/style.css
git commit -m "feat: add tienda page CSS styles"
```

---

### Task 3: Build tienda/index.html

**Files:**
- Modify: `public/tienda/index.html` (replace "Próximamente" content entirely)

- [ ] **Step 1: Write `public/tienda/index.html`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda | Tecnistore</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

<!-- ═══════════ TOP BAR ═══════════ -->
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
      <a href="https://wa.me/573225817129" class="tb-wa" target="_blank">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </div>
  </div>
</div>

<!-- ═══════════ HEADER ═══════════ -->
<header class="site-header">
  <div class="header-search-row">
    <div class="header-search-inner">
      <a href="/" class="hs-logo">
        <img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore">
      </a>
      <div class="hs-search-wrap">
        <input type="text" id="tienda-search-input" placeholder="Buscar productos, marcas, categorías...">
        <button type="button" onclick="headerSearch()" aria-label="Buscar">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          Buscar
        </button>
      </div>
      <button class="hs-cart-btn" onclick="openCart()" aria-label="Carrito">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
        <span class="hs-cart-label">Carrito</span>
        <span class="hs-cart-badge" id="cart-count">0</span>
      </button>
    </div>
  </div>
  <nav class="nav-container">
    <div class="nav-links">
      <a href="/">INICIO</a>
      <a href="/#nosotros">NOSOTROS</a>
      <a href="/tienda/" class="active">TIENDA</a>
    </div>
    <div class="nav-logo">
      <a href="/"><img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore"></a>
    </div>
    <div class="nav-right">
      <a href="/#contacto">CONTACTO</a>
      <a href="/mi-cuenta/" class="nav-btn-login">INICIAR SESIÓN</a>
    </div>
  </nav>
</header>

<!-- ═══════════ HERO ═══════════ -->
<div class="tienda-hero">
  <h1>Nuestro Catálogo</h1>
  <p>Encuentra la mejor tecnología al mejor precio</p>
</div>

<!-- ═══════════ TOOLBAR ═══════════ -->
<div class="tienda-toolbar">
  <div class="tienda-cats" id="tienda-cats"></div>
  <div class="tienda-search-sort">
    <input type="text" class="tienda-search" id="tienda-q" placeholder="Buscar..." oninput="applyFilters()">
    <select class="tienda-sort" id="tienda-sort" onchange="applyFilters()">
      <option value="default">Relevancia</option>
      <option value="price-asc">Menor precio</option>
      <option value="price-desc">Mayor precio</option>
      <option value="discount">Mayor descuento</option>
    </select>
  </div>
</div>

<!-- ═══════════ CONTADOR ═══════════ -->
<div class="tienda-contador" id="tienda-contador">Cargando productos...</div>

<!-- ═══════════ GRID ═══════════ -->
<main class="tienda-grid" id="tienda-grid"></main>

<!-- ═══════════ FOOTER ═══════════ -->
<footer class="site-footer-slim">
  <div class="footer-slim-inner">
    <img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" class="footer-logo">
    <div class="footer-slim-copy">
      <p>Copyright &copy; <span id="footer-year"></span> Tecnistore</p>
      <p>&copy; TNT Technistore Ltda. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

<a class="whatsapp-btn" href="https://wa.me/573225817129?text=Hola!%20mi%20nombre%20es..." target="_blank" rel="noopener" title="WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<script src="/js/products-data.js"></script>
<script>
'use strict';

/* ── CART (localStorage) ── */
var cartCount = parseInt(localStorage.getItem('ts-cart') || '0', 10);
function updateCartBadge() {
  var el = document.getElementById('cart-count');
  if (el) el.textContent = cartCount;
}
function openCart() {
  alert('Tienes ' + cartCount + ' producto(s) en el carrito.');
}
updateCartBadge();

/* ── CATEGORIES ── */
var CATS = ['Todos'];
(function() {
  var seen = {};
  ALL_PRODUCTS.forEach(function(p) {
    if (!seen[p.category]) { seen[p.category] = 1; CATS.push(p.category); }
  });
})();

var activeCat = 'Todos';

function renderCats() {
  document.getElementById('tienda-cats').innerHTML = CATS.map(function(c) {
    return '<button class="tienda-cat-btn' + (c === activeCat ? ' active' : '') +
      '" onclick="setCat(\'' + c.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + '\')">' + c + '</button>';
  }).join('');
}

function setCat(cat) {
  activeCat = cat;
  renderCats();
  applyFilters();
}

/* ── FORMAT ── */
function fmt(n) { return '$' + n.toLocaleString('es-CO'); }

/* ── RENDER CARD ── */
function makeCard(p) {
  var img = p.images && p.images.length ? p.images[0] : '';
  var badge = p.discount ? '<span class="ts-prod-badge">' + p.discount + '</span>' : '';
  var brandHtml = p.brand ? '<p class="ts-prod-brand">' + p.brand + '</p>' : '';
  var oldHtml = p.oldPrice && p.oldPrice !== p.price
    ? '<span class="ts-prod-old">' + fmt(p.oldPrice) + '</span>' : '';
  var discHtml = p.discount ? '<span class="ts-prod-disc-tag">' + p.discount + '</span>' : '';
  var waMsg = encodeURIComponent('Hola! Me interesa ' + (p.brand ? p.brand + ' ' : '') + p.name + ' (' + fmt(p.price) + ').');
  var imgTag = img
    ? '<img src="' + img + '" alt="' + p.name + '" loading="lazy" onerror="this.parentNode.classList.add(\'tienda-img-error\');this.style.display=\'none\'">'
    : '<div class="tienda-img-error" style="min-height:180px"></div>';
  return '<article class="ts-prod-card">' +
    badge +
    '<div class="ts-prod-img-wrap">' + imgTag + '</div>' +
    '<div class="ts-prod-info">' +
      brandHtml +
      '<p class="ts-prod-name">' + p.name + '</p>' +
      '<div class="ts-prod-prices">' +
        '<span class="ts-prod-price">' + fmt(p.price) + '</span>' +
        oldHtml + discHtml +
      '</div>' +
      '<a class="ts-prod-cta" href="https://wa.me/573225817129?text=' + waMsg + '" target="_blank" rel="noopener">Pedir por WhatsApp</a>' +
    '</div></article>';
}

/* ── FILTER + SORT ── */
function applyFilters() {
  var q = (document.getElementById('tienda-q').value || '').trim().toLowerCase();
  var sort = document.getElementById('tienda-sort').value;

  var filtered = ALL_PRODUCTS.filter(function(p) {
    var catOk = activeCat === 'Todos' || p.category === activeCat;
    var qOk = !q ||
      p.name.toLowerCase().indexOf(q) !== -1 ||
      (p.brand || '').toLowerCase().indexOf(q) !== -1;
    return catOk && qOk;
  });

  if (sort === 'price-asc') filtered.sort(function(a, b) { return a.price - b.price; });
  else if (sort === 'price-desc') filtered.sort(function(a, b) { return b.price - a.price; });
  else if (sort === 'discount') {
    filtered.sort(function(a, b) {
      var da = a.oldPrice ? (1 - a.price / a.oldPrice) : 0;
      var db = b.oldPrice ? (1 - b.price / b.oldPrice) : 0;
      return db - da;
    });
  }

  document.getElementById('tienda-contador').textContent =
    'Mostrando ' + filtered.length + ' de ' + ALL_PRODUCTS.length + ' productos';

  var grid = document.getElementById('tienda-grid');
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="tienda-no-results">' +
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8ba3c7" stroke-width="1.5">' +
      '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
      '<p>No se encontraron productos.</p></div>';
  } else {
    grid.innerHTML = filtered.map(makeCard).join('');
  }
}

/* ── HEADER SEARCH SYNC ── */
function headerSearch() {
  var val = document.getElementById('tienda-search-input').value;
  document.getElementById('tienda-q').value = val;
  applyFilters();
}
document.getElementById('tienda-search-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') headerSearch();
});

/* ── INIT ── */
document.getElementById('footer-year').textContent = new Date().getFullYear();
renderCats();
applyFilters();
</script>
</body>
</html>
```

- [ ] **Step 2: Serve locally and verify**

From the `public/` directory, run a local server:

```bash
cd public && python -m http.server 8000
```

Open `http://localhost:8000/tienda/` and verify:
- Header (logo, search, cart badge) renders correctly
- Category buttons show all 8 categories
- Counter reads "Mostrando 139 de 139 productos"
- Grid shows product cards with images, names, prices
- Clicking a category button filters results and updates counter
- Typing in the search box filters by name/brand
- Sort dropdown reorders the grid (price asc/desc/discount)
- "Pedir por WhatsApp" opens WhatsApp with product name and price in the message
- On mobile width (< 768px): 2-column grid, toolbar stacks

- [ ] **Step 3: Commit**

```bash
git add public/tienda/index.html
git commit -m "feat: build tienda catalog page with filters, search, and sort"
```

---

### Task 4: Sync cart count with main.js via localStorage

**Files:**
- Modify: `public/js/main.js` (cart section, lines 157–167)

- [ ] **Step 1: Update cart in `main.js` to read/write localStorage**

Find this block in `public/js/main.js`:

```js
/* ── CARRITO ── */
var cartTotal=0;
function updateCartBadge(){var el=document.getElementById('cart-count');if(el)el.textContent=cartTotal;}
function tsAddToCart(){
  cartTotal++;updateCartBadge();
  var btn=document.getElementById('ts-btn-cart');if(!btn)return;
  var orig=btn.innerHTML;
  btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Agregado!';
  btn.style.background='#25D366';
  setTimeout(function(){btn.innerHTML=orig;btn.style.background='';},1800);
}
function openCart(){alert('Tienes '+cartTotal+' producto(s) en el carrito.');}
```

Replace it with:

```js
/* ── CARRITO ── */
var cartTotal=parseInt(localStorage.getItem('ts-cart')||'0',10);
function updateCartBadge(){var el=document.getElementById('cart-count');if(el)el.textContent=cartTotal;}
function tsAddToCart(){
  cartTotal++;localStorage.setItem('ts-cart',cartTotal);updateCartBadge();
  var btn=document.getElementById('ts-btn-cart');if(!btn)return;
  var orig=btn.innerHTML;
  btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Agregado!';
  btn.style.background='#25D366';
  setTimeout(function(){btn.innerHTML=orig;btn.style.background='';},1800);
}
function openCart(){alert('Tienes '+cartTotal+' producto(s) en el carrito.');}
```

- [ ] **Step 2: Verify cross-page cart persistence**

1. Open `http://localhost:8000/` (homepage)
2. Click "Agregar al carrito" on any product — badge shows `1`
3. Navigate to `http://localhost:8000/tienda/`
4. Cart badge must show `1` (not `0`)

- [ ] **Step 3: Commit**

```bash
git add public/js/main.js
git commit -m "feat: persist cart count in localStorage to sync across pages"
```
