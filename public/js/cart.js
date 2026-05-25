/* ══ CART.JS — Carrito compartido entre páginas ══ */
'use strict';
(function () {
  var CART_KEY = 'ts-cart-v2';

  function fmt(n) { return '$' + n.toLocaleString('es-CO'); }

  /* ── Estado ── */
  window.getCart = function () {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  };
  window.saveCart = function (items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateBadge();
  };

  /* ── Añadir producto ── */
  window.addToCart = function (product) {
    var cart = getCart();
    var key = product.name + '|' + product.price;
    var found = null;
    for (var i = 0; i < cart.length; i++) { if (cart[i].key === key) { found = cart[i]; break; } }
    if (found) { found.qty += 1; }
    else {
      cart.push({
        key: key, name: product.name, price: product.price, qty: 1,
        image: product.image || '', category: product.category || ''
      });
    }
    saveCart(cart);
  };

  /* ── Badge ── */
  function updateBadge() {
    var total = getCart().reduce(function (s, i) { return s + i.qty; }, 0);
    document.querySelectorAll('#cart-count').forEach(function (el) { el.textContent = total || '0'; });
  }
  window.updateCartBadge = updateBadge;

  /* ── Abrir / Cerrar ── */
  window.openCart = function () {
    renderPanel();
    var panel = document.getElementById('cart-panel');
    var overlay = document.getElementById('cart-overlay');
    if (panel) panel.classList.add('open');
    if (overlay) { overlay.classList.add('open'); overlay.removeAttribute('aria-hidden'); }
    document.body.style.overflow = 'hidden';
  };
  window.closeCart = function () {
    var panel = document.getElementById('cart-panel');
    var overlay = document.getElementById('cart-overlay');
    if (panel) panel.classList.remove('open');
    if (overlay) { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); }
    document.body.style.overflow = '';
  };

  /* ── Cantidad y eliminar ── */
  window.cartQty = function (idx, delta) {
    var cart = getCart();
    if (!cart[idx]) return;
    cart[idx].qty = Math.max(1, cart[idx].qty + delta);
    saveCart(cart);
    renderPanel();
  };
  window.cartRemove = function (idx) {
    var cart = getCart();
    cart.splice(idx, 1);
    saveCart(cart);
    renderPanel();
  };

  /* ── Formulario checkout ── */
  window.openCheckoutForm = function () {
    var body = document.getElementById('cart-panel-body');
    var foot = document.getElementById('cart-panel-foot');
    var form = document.getElementById('cart-checkout-form');
    if (body) body.hidden = true;
    if (foot) foot.hidden = true;
    if (form) form.hidden = false;
  };
  window.backToCart = function () {
    var body = document.getElementById('cart-panel-body');
    var foot = document.getElementById('cart-panel-foot');
    var form = document.getElementById('cart-checkout-form');
    if (form) form.hidden = true;
    renderPanel();
  };

  /* ── Confirmar pedido ── */
  window.placeOrder = function () {
    var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var name = g('co-name'), email = g('co-email'), phone = g('co-phone'), city = g('co-city'), address = g('co-address');
    if (!name || !email || !phone || !city) {
      alert('Por favor completa todos los campos requeridos (*).'); return;
    }
    var cart = getCart();
    if (!cart.length) { alert('Tu carrito está vacío.'); return; }
    var btn = document.getElementById('cart-btn-place-order');
    if (btn) { btn.disabled = true; btn.textContent = 'Procesando…'; }

    var cartText = cart.map(function (i) { return i.name + ' x' + i.qty + ' — ' + fmt(i.price * i.qty); }).join('\n');
    var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);

    var cfg = window.WOO_CONFIG;
    var wooReady = true;

    if (wooReady) {
      var parts = name.split(' ');
      var payload = {
        payment_method: 'cod', payment_method_title: 'Pendiente de pago',
        set_paid: false, status: 'pending',
        billing: { first_name: parts[0] || name, last_name: parts.slice(1).join(' ') || '', email: email, phone: phone, city: city, address_1: address, country: 'CO' },
        shipping: { first_name: parts[0] || name, last_name: parts.slice(1).join(' ') || '', city: city, address_1: address, country: 'CO' },
        line_items: cart.map(function (i) { return { name: i.name, quantity: i.qty, price: i.price }; })
      };
      fetch(cfg.url + '/wp-json/wc/v3/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.ok ? r.json() : Promise.reject('HTTP ' + r.status); })
        .then(function (order) {
          saveCart([]); closeCart();
          var url = order.checkout_payment_url || (cfg.url + '/checkout/order-pay/' + order.id + '/?pay_for_order=true&key=' + order.order_key);
          window.location.href = url;
        }).catch(function (err) {
          console.warn('WooCommerce error:', err);
          if (btn) { btn.disabled = false; btn.textContent = 'Confirmar y pagar'; }
          _wspFallback(name, phone, email, city, address, cartText, total);
        });
    } else {
      if (btn) { btn.disabled = false; btn.textContent = 'Confirmar y pagar'; }
      _wspFallback(name, phone, email, city, address, cartText, total);
    }
  };

  function _wspFallback(name, phone, email, city, address, cartText, total) {
    var msg = encodeURIComponent(
      'Nuevo pedido de ' + name + '\nTeléfono: ' + phone +
      '\nCiudad: ' + city + (address ? '\nDirección: ' + address : '') +
      '\nEmail: ' + email + '\n\nProductos:\n' + cartText + '\n\nTotal: ' + fmt(total)
    );
    window.open('https://wa.me/573225817129?text=' + msg, '_blank');
    saveCart([]); closeCart();
  }

  /* ── Render panel ── */
  function renderPanel() {
    var cart = getCart();
    var body = document.getElementById('cart-panel-body');
    var foot = document.getElementById('cart-panel-foot');
    if (!body) return;
    body.hidden = false;

    if (!cart.length) {
      body.innerHTML =
        '<div class="cart-empty">' +
        '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>' +
        '<p>Tu carrito está vacío</p>' +
        '<a href="/tienda/" class="cart-empty-link">Ver productos</a></div>';
      if (foot) foot.hidden = true;
      return;
    }

    if (foot) foot.hidden = false;
    var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    body.innerHTML = cart.map(function (item, idx) {
      return '<div class="cart-item">' +
        '<div class="cart-item-img"><img src="' + item.image + '" alt="' + item.name + '" loading="lazy"></div>' +
        '<div class="cart-item-info">' +
          '<p class="cart-item-name">' + item.name + '</p>' +
          '<p class="cart-item-price">' + fmt(item.price) + '</p>' +
        '</div>' +
        '<div class="cart-item-qty">' +
          '<button class="cart-qty-btn" onclick="cartQty(' + idx + ',-1)" aria-label="Restar">&#8722;</button>' +
          '<span class="cart-qty-num">' + item.qty + '</span>' +
          '<button class="cart-qty-btn" onclick="cartQty(' + idx + ',1)" aria-label="Sumar">+</button>' +
        '</div>' +
        '<button class="cart-item-remove" onclick="cartRemove(' + idx + ')" aria-label="Eliminar">&#x2715;</button>' +
      '</div>';
    }).join('');

    var el = document.getElementById('cart-total');
    if (el) el.textContent = fmt(total);
    var pc = document.getElementById('cart-panel-count');
    if (pc) pc.textContent = cart.reduce(function (s, i) { return s + i.qty; }, 0) + ' producto(s)';
  }
  window.renderCartPanel = renderPanel;

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.addEventListener('click', closeCart);
    updateBadge();
  });
})();
