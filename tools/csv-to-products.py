import csv, re, json, os

CSV_PATH = 'Productos/wc-product-export-15-5-2026-1778894450358.csv'
OUT_PATH = 'public/js/products-data.js'

def strip_html(text):
    return re.sub(r'<[^>]+>', '', text or '').strip()

CATEGORY_MAP = {
    'Celulares y Tablets':    'Celulares',
    'Computadores Portátiles':'Portátiles',
    'Equipos de Escritorio':  'Empresas',
    'Sin categoría':          'Empresas',
}

PERIFERICOS_KW = ['teclado', 'mouse', 'camara', 'cámara', 'diadema', 'apuntador', 'brio', 'webcam', 'logitech']
LINEA_HOGAR_KW = ['jbl', 'altavoz', 'parlante', 'speaker', 'bocina']
CELULARES_KW   = ['celular', 'tablet', 'motorola']

def classify_by_name(name):
    n = name.lower()
    if any(k in n for k in CELULARES_KW):   return 'Celulares'
    if any(k in n for k in LINEA_HOGAR_KW): return 'Línea hogar'
    if any(k in n for k in PERIFERICOS_KW): return 'Periféricos'
    return 'Accesorios'

def normalize_category(cats_str, product_name=''):
    if not cats_str:
        return classify_by_name(product_name)
    first = [c.strip() for c in cats_str.split(',')][0]
    raw = first.split('>')[0].strip() if '>' in first else first
    if raw in CATEGORY_MAP:
        return CATEGORY_MAP[raw]
    return classify_by_name(product_name)

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
        category  = normalize_category(row.get('Categorías', ''), name)
        old_price = to_int(row.get('Precio normal', ''))
        price_str = row.get('Precio rebajado', '').strip()
        price     = to_int(price_str) if price_str else old_price
        if price == 0:
            price = old_price
        if price == 0 and old_price == 0:
            continue
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

print(f'Generated {len(products)} products -> {OUT_PATH}')
