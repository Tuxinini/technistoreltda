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

print(f'Generated {len(products)} products -> {OUT_PATH}')
