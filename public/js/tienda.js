'use strict';
/* ══ TIENDA.JS ══ */

var tiendaItems = [];
var tiendaSort  = 'discount';
var tiendaCat   = 'all';

function fmt(n){ return '$'+n.toLocaleString('es-CO'); }

var BRANDS=['Samsung','Xiaomi','Motorola','Lenovo','Asus','HP','Dell','Acer','MSI',
  'Logitech','Epson','JBL','Realme','WD','Kingston','Crucial','Adata','Patriot',
  'Hiksemi','Hikvision','Redmi','Xue','Lacie','Touch','Microsoft'];
function extractBrand(name){
  var u=name.toUpperCase();
  for(var i=0;i<BRANDS.length;i++){if(u.indexOf(BRANDS[i].toUpperCase())!==-1)return BRANDS[i];}
  return '';
}

function sortArr(arr,s){
  var a=arr.slice();
  if(s==='discount') a.sort(function(x,y){return(parseFloat(y.discount)||0)-(parseFloat(x.discount)||0);});
  else if(s==='price-asc')  a.sort(function(x,y){return x.price-y.price;});
  else if(s==='price-desc') a.sort(function(x,y){return y.price-x.price;});
  else if(s==='name')       a.sort(function(x,y){return x.name.localeCompare(y.name,'es');});
  return a;
}

function makeCard(p,idx){
  var img=p.images&&p.images[0]?p.images[0]:'';
  var disc=p.discount||'';
  var brand=extractBrand(p.name);
  var saving=p.oldPrice&&p.oldPrice>p.price?p.oldPrice-p.price:0;
  return'<article class="tnd-card" onclick="openModal('+idx+')" tabindex="0" aria-label="'+p.name+'">'+
    (disc?'<span class="tnd-badge">'+disc+'</span>':'')+
    '<div class="tnd-img-wrap"><img src="'+img+'" alt="'+p.name+'" loading="lazy"></div>'+
    '<div class="tnd-info">'+
      (brand?'<p class="tnd-brand">'+brand+'</p>':'')+
      '<p class="tnd-name">'+p.name+'</p>'+
      '<div class="tnd-prices">'+
        '<span class="tnd-price">'+fmt(p.price)+'</span>'+
        (p.oldPrice&&p.oldPrice!==p.price?'<span class="tnd-old">'+fmt(p.oldPrice)+'</span>':'')+
      '</div>'+
      (saving?'<p class="tnd-saving">Ahorras '+fmt(saving)+'</p>':'')+
      '<button class="tnd-cta" tabindex="-1">Ver Producto</button>'+
    '</div></article>';
}

function showGridLoader(){
  var ov=document.getElementById('tnd-loading-overlay');
  if(ov)ov.classList.add('active');
}
function hideGridLoader(){
  var ov=document.getElementById('tnd-loading-overlay');
  if(ov)ov.classList.remove('active');
}

function renderStore(withLoader){
  var src=typeof ALL_PRODUCTS!=='undefined'?ALL_PRODUCTS:[];
  var filtered=tiendaCat==='all'?src.slice():src.filter(function(p){return p.category===tiendaCat;});
  filtered=sortArr(filtered,tiendaSort);
  tiendaItems=filtered;

  function paint(){
    var grid=document.getElementById('tnd-grid');
    var cnt=document.getElementById('tnd-count');
    if(cnt)cnt.textContent=filtered.length+' productos';
    if(grid)grid.innerHTML=filtered.length
      ?filtered.map(function(p,i){return makeCard(p,i);}).join('')
      :'<div class="tnd-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><p>No encontramos productos en esta categoría.</p></div>';
    hideGridLoader();
  }

  if(withLoader){
    showGridLoader();
    setTimeout(paint, 200);
  } else {
    paint();
  }
}

/* ── Búsqueda ── */
function doStoreSearch(){
  var q=(document.getElementById('tnd-search-input').value||'').trim().toLowerCase();
  var src=typeof ALL_PRODUCTS!=='undefined'?ALL_PRODUCTS:[];
  var filtered=q?src.filter(function(p){return p.name.toLowerCase().indexOf(q)!==-1||p.category.toLowerCase().indexOf(q)!==-1;}):src;
  filtered=sortArr(filtered,tiendaSort);
  tiendaItems=filtered;
  var grid=document.getElementById('tnd-grid');
  var cnt=document.getElementById('tnd-count');
  if(cnt)cnt.textContent=filtered.length+' productos';
  /* Reset filtros activos */
  document.querySelectorAll('.ts-cat-filter').forEach(function(b){b.classList.remove('active');b.setAttribute('aria-selected','false');});
  var allBtn=document.querySelector('.ts-cat-filter[data-cat="all"]');
  if(allBtn){allBtn.classList.add('active');allBtn.setAttribute('aria-selected','true');}
  tiendaCat='all';
  if(grid)grid.innerHTML=filtered.length
    ?filtered.map(function(p,i){return makeCard(p,i);}).join('')
    :'<div class="tnd-empty"><p>Sin resultados para "'+q+'".</p></div>';
}

/* ── Modal ── */
function openModal(idx){
  var p=tiendaItems[idx];if(!p)return;
  var brand=extractBrand(p.name);
  document.getElementById('ts-modal-brand').textContent=brand||p.category||'';
  document.getElementById('ts-modal-name').textContent=p.name;
  document.getElementById('ts-modal-disc').textContent=p.discount||'';
  document.getElementById('ts-modal-price').textContent=fmt(p.price);
  document.getElementById('ts-modal-old').textContent=(p.oldPrice&&p.oldPrice!==p.price)?fmt(p.oldPrice):'';
  var mi=document.getElementById('ts-modal-main-img');mi.src=p.images[0]||'';mi.alt=p.name;
  document.getElementById('ts-modal-thumbs').innerHTML=(p.images||[]).map(function(src,i){
    return'<img class="ts-thumb ts-modal-thumb '+(i===0?'active':'')+'" src="'+src+'" alt="Vista '+(i+1)+'" onclick="setThumb('+i+','+idx+')" tabindex="0">';
  }).join('');
  document.getElementById('ts-modal-specs').innerHTML=
    '<div style="padding:10px 0;font-size:13.5px;color:var(--color-text-muted)">Consulta por WhatsApp para obtener especificaciones completas y disponibilidad.</div>';
  var msg=encodeURIComponent('Hola! Me interesa: '+p.name+' ('+fmt(p.price)+').');
  var wb=document.getElementById('ts-btn-wsp');
  if(wb)wb.onclick=function(){window.open('https://wa.me/573225817129?text='+msg,'_blank');};
  var ov=document.getElementById('ts-modal-overlay');ov.classList.add('open');document.body.style.overflow='hidden';
  setTimeout(function(){var c=document.querySelector('.ts-modal-close');if(c)c.focus();},60);
}
function setThumb(imgIdx,prodIdx){
  var p=tiendaItems[prodIdx];if(!p)return;
  document.getElementById('ts-modal-main-img').src=p.images[imgIdx]||'';
  document.querySelectorAll('.ts-thumb').forEach(function(t,i){t.classList.toggle('active',i===imgIdx);});
}
function tsCloseModal(e){
  if(!e||e.target.id==='ts-modal-overlay'){
    var ov=document.getElementById('ts-modal-overlay');
    if(ov){ov.classList.remove('open');document.body.style.overflow='';}
  }
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){var ov=document.getElementById('ts-modal-overlay');if(ov&&ov.classList.contains('open')){ov.classList.remove('open');document.body.style.overflow='';}}
});

/* ── Carrito ── */
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
updateCartBadge();

/* ── Init ── */
(function(){
  /* Filtros categoría */
  document.querySelectorAll('.ts-cat-filter').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.ts-cat-filter').forEach(function(b){b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      tiendaCat=btn.dataset.cat;
      var si=document.getElementById('tnd-search-input');if(si)si.value='';
      renderStore(true);
    });
  });
  /* Sort */
  var sortEl=document.getElementById('tnd-sort');
  if(sortEl)sortEl.addEventListener('change',function(){tiendaSort=this.value;renderStore(true);});
  /* Buscar botón */
  var sbtn=document.getElementById('tnd-search-btn');
  if(sbtn)sbtn.addEventListener('click',doStoreSearch);
  var si=document.getElementById('tnd-search-input');
  if(si)si.addEventListener('keydown',function(e){if(e.key==='Enter')doStoreSearch();});
  /* Header scroll */
  var h=document.querySelector('.site-header');
  if(h)window.addEventListener('scroll',function(){h.classList.toggle('scrolled',window.scrollY>80);},{passive:true});
  /* Hamburger */
  var btn=document.getElementById('nav-hamburger'),menu=document.getElementById('nav-mobile-menu');
  if(btn&&menu){
    btn.addEventListener('click',function(){
      var open=menu.classList.contains('open');
      btn.classList.toggle('open',!open);menu.classList.toggle('open',!open);
      btn.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-hidden',String(open));
    });
    document.addEventListener('click',function(e){
      if(!e.target.closest('.nav-container')){btn.classList.remove('open');menu.classList.remove('open');btn.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true');}
    });
  }
  /* Footer year */
  var y=document.getElementById('footer-year');if(y)y.textContent=new Date().getFullYear();
  /* Render inicial (sin loader de pestaña, el splash lo cubre) */
  renderStore(false);
})();
