# Diseño: Página de Tienda Tecnistore

**Fecha:** 2026-05-15  
**Estado:** Aprobado

---

## Objetivo

Construir una página `/tienda/` funcional que muestre los 139 productos del catálogo WooCommerce exportado en CSV, con filtros por categoría y buscador, integrada visualmente con el homepage existente.

---

## Arquitectura

```
public/
  js/
    main.js            ← existente (homepage, carrito, modal)
    products-data.js   ← NUEVO: array ALL_PRODUCTS generado desde CSV
  tienda/
    index.html         ← REEMPLAZAR el "Próximamente" con la tienda real
  css/
    style.css          ← agregar estilos de tienda aquí

tools/
  csv-to-products.py   ← NUEVO: script de conversión CSV → JS
```

El homepage sigue usando su propio array `PRODUCTS` en `main.js` (8 productos destacados). La tienda usa `ALL_PRODUCTS` de `products-data.js` (139 productos).

---

## Fuente de datos

**Archivo:** `Productos/wc-product-export-15-5-2026-1778894450358.csv`

**Campos utilizados:**

| Columna CSV | Campo JS | Notas |
|---|---|---|
| Nombre | `name` | |
| Marcas | `brand` | puede estar vacío |
| Categorías | `category` | tomar primera categoría, ignorar subcategorías `>` |
| Precio normal | `oldPrice` | int, COP |
| Precio rebajado | `price` | int, COP; si vacío = igual a oldPrice |
| Imágenes | `images` | primera URL de la lista separada por comas |
| Descripción corta | `shortDesc` | strip HTML tags |

**Descuento calculado:** `Math.round((1 - price/oldPrice) * 100)` → solo mostrar si > 0.

**Productos excluidos:** `Publicado != 1` y `Tipo != simple`.

---

## Categorías de filtro

Extraídas del CSV, normalizadas:

- Todos
- Celulares y Tablets
- Computadores Portátiles
- Equipos de Escritorio
- Partes y accesorios
- Suministros para oficina
- Dispositivos Especiales
- OFERTAS HOY

Subcategorías con `>` (ej. `Partes y accesorios > Discos Duros`) se agrupan bajo la categoría padre.

---

## Script de conversión

**Archivo:** `tools/csv-to-products.py`

- Lee el CSV con `encoding='utf-8'`
- Filtra `Publicado == 1`
- Genera `public/js/products-data.js` con la variable global `var ALL_PRODUCTS = [...]`
- Se ejecuta manualmente con `python tools/csv-to-products.py` cuando se actualiza el catálogo

---

## Página `/tienda/index.html`

### Estructura

```
[Header: idéntico al homepage — logo + búsqueda + carrito]
[Nav: idéntico al homepage]

[Hero mínimo: "Nuestro Catálogo" + conteo de productos]

[Barra de filtros]
  Botones: [Todos] [Celulares y Tablets] [Portátiles] ...
  Buscador: [campo de texto]
  Ordenar: [select: Relevancia / Menor precio / Mayor precio / Descuento]

[Grid de productos — 4 columnas desktop, 2 tablet, 1 móvil]
  Cards con mismo diseño que homepage: imagen, badge, nombre, precio, botón

[Footer: idéntico al homepage]
```

### Comportamiento de filtros

- Filtro de categoría y buscador operan juntos (AND)
- Búsqueda filtra por nombre y marca (case-insensitive)
- Ordenar funciona sobre los resultados ya filtrados
- Conteo visible: "Mostrando X de 139 productos"

### Carrito

Mismo sistema `localStorage` que el homepage. El badge del carrito en header refleja el estado actual. Al agregar un producto desde la tienda, se redirige al carrito o se muestra confirmación inline (igual que homepage).

### Imágenes faltantes

Si una imagen no carga (URL rota), mostrar placeholder con icono de producto.

---

## Estilos

Agregar sección de estilos de tienda al final de `public/css/style.css`:
- `.tienda-filtros` — barra de botones de categoría
- `.tienda-grid` — grid de productos (reutiliza `.ts-prod-card` del homepage)
- `.tienda-contador` — texto "Mostrando X de Y"
- `.tienda-ordenar` — select de ordenamiento

---

## Fuera de alcance

- Pasarela de pago
- Checkout funcional (la página `/finalizar-compra/` se deja para una siguiente fase)
- Páginas individuales de producto (las existentes siguen como están)
- Panel de administración para editar productos desde el navegador
