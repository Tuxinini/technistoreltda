<?php
/* ── Seguridad: CORS — solo permite llamadas desde el propio dominio ── */
$_SITE    = 'https://tntltda.com';
$_origin  = $_SERVER['HTTP_ORIGIN']  ?? '';
$_referer = $_SERVER['HTTP_REFERER'] ?? '';

$_originOk = !$_origin                                          /* mismo dominio (no envía Origin) */
  || $_origin === $_SITE
  || $_origin === 'https://www.tntltda.com';

if (!$_originOk) {
    http_response_code(403);
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

/* Headers de seguridad */
if ($_origin) header('Access-Control-Allow-Origin: ' . $_origin);
header('Access-Control-Allow-Methods: GET');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
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
