"""Builds public/empresas/index.html"""

wsp_path = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

person_path = 'M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z'

def person_svg(size=80):
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="rgba(255,255,255,0.72)" aria-hidden="true"><path d="{person_path}"/></svg>'

def team_card(gradient, delay_class=''):
    return f'''
        <div class="eq-card {delay_class}">
          <div class="eq-photo-wrap">
            <div class="eq-photo-bg" style="background:{gradient}">{person_svg(80)}</div>
            <div class="eq-overlay"><span class="eq-overlay-text">Equipo Tecnistore</span></div>
          </div>
          <div class="eq-info"><div class="eq-name-placeholder"></div><div class="eq-role-placeholder"></div></div>
        </div>'''

gradients = [
    'linear-gradient(145deg,#00aee8,#005d7e)',
    'linear-gradient(145deg,#0a3060,#1a5580)',
    'linear-gradient(145deg,#ff6b2b,#9c3a10)',
    'linear-gradient(145deg,#1a5580,#00aee8)',
    'linear-gradient(145deg,#00aee8,#0a3060)',
    'linear-gradient(145deg,#25D366,#0a4a3d)',
]

cards_html = ''.join(team_card(g) for g in gradients)

check_svg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>'
send_svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'

html = f'''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Empresas | Tecnistore — Soluciones Corporativas</title>
  <meta name="description" content="Soluciones tecnologicas para empresas. Cotizaciones corporativas, equipo especializado y mas de 28 anos de experiencia. Tecnistore — TNT Technistore Ltda.">
  <link rel="canonical" href="https://tntltda.com/empresas/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/equipo.css">
</head>
<body>

  <div class="top-bar" role="banner">
    <div class="top-bar-inner container">
      <div class="top-bar-left">
        <span class="tb-item"><a href="tel:6016336364">(601) 633-6364</a></span>
        <span class="tb-sep">|</span>
        <span class="tb-item"><a href="mailto:comercial1@tntltda.com">comercial1@tntltda.com</a></span>
      </div>
      <div class="top-bar-right">
        <a href="https://wa.me/573225817129" class="tb-wa" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </div>

  <header class="site-header">
    <div class="header-search-row">
      <div class="header-search-inner container">
        <a href="/" class="hs-logo" aria-label="Tecnistore inicio"><img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" width="140" height="50"></a>
        <div style="flex:1"></div>
        <button class="hs-cart-btn" onclick="window.location.href='/tienda/'" style="gap:6px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
          Ir a la Tienda
        </button>
      </div>
    </div>
    <nav class="nav-container" aria-label="Navegacion principal">
      <div class="nav-inner container">
        <div class="nav-links-left"><a href="/">INICIO</a><a href="/empresas/" style="color:var(--color-primary)">EMPRESAS</a><a href="/tienda/">TIENDA</a></div>
        <div class="nav-logo-center"><a href="/"><img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" width="110" height="40"></a></div>
        <div class="nav-links-right"><a href="/#contacto">CONTACTO</a><a href="/mi-cuenta/" class="nav-btn-login">INICIAR SESION</a></div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
      <div class="nav-mobile-menu" id="nav-mobile-menu" aria-hidden="true">
        <a href="/">INICIO</a><a href="/empresas/">EMPRESAS</a><a href="/tienda/">TIENDA</a><a href="/#contacto">CONTACTO</a><a href="/mi-cuenta/">INICIAR SESION</a>
      </div>
    </nav>
  </header>

  <!-- ══ HERO ══ -->
  <section class="eq-hero">
    <div class="container eq-hero-inner">
      <span class="eq-hero-badge">TECNISTORE — TNT TECHNISTORE LTDA.</span>
      <h1>Soluciones para<br>Empresas</h1>
      <p>Mas de 28 anos siendo el aliado tecnologico de empresas en Colombia. Equipos certificados, garantias reales y atencion consultiva especializada.</p>
    </div>
  </section>

  <!-- ══ STATS ══ -->
  <section class="empresas-top" style="padding:60px 0;">
    <div class="container">
      <div class="empresas-top-grid">
        <div class="empresas-brand-panel">
          <div class="emp-logo-wrap"><img src="/wp-content/uploads/2021/03/Tnt.png" class="emp-logo" alt="Tecnistore"></div>
          <p class="emp-tagline">Nuestro diferencial esta en la atencion consultiva y transparente. Trabajamos con factura electronica, garantias reales de fabricante y soporte antes, durante y despues de la compra.</p>
          <div class="emp-pills">
            <span class="emp-pill">{check_svg} Garantia de fabrica</span>
            <span class="emp-pill">{check_svg} Factura electronica</span>
            <span class="emp-pill">{check_svg} Envio nacional</span>
            <span class="emp-pill">{check_svg} Soporte post-venta</span>
          </div>
        </div>
        <div class="empresas-stats-panel">
          <div class="emp-stat">
            <div class="stat-number" data-target="28" data-prefix="+">+0</div>
            <div class="stat-label">ANOS LIDERANDO EL<br>MERCADO DE TECNOLOGIA</div>
          </div>
          <div class="emp-stat-divider"></div>
          <div class="emp-stat">
            <div class="stat-number" data-target="500" data-prefix="+">+0</div>
            <div class="stat-label">CLIENTES CORPORATIVOS<br>SATISFECHOS</div>
          </div>
          <div class="emp-stat-divider"></div>
          <div class="emp-stat">
            <div class="stat-number" data-target="1200" data-prefix="+" data-separator=".">+0</div>
            <div class="stat-label">HOGARES FELICES<br>CON NUESTROS PRODUCTOS</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ NUESTRO EQUIPO ══ -->
  <section class="eq-section" style="background:var(--color-dark);padding:72px 0 80px;">
    <div class="container">
      <h2 style="text-align:center;color:#fff;font-size:clamp(28px,3.5vw,40px);font-weight:900;margin-bottom:12px;">Nuestro Equipo</h2>
      <p style="text-align:center;color:rgba(255,255,255,0.55);font-size:15px;margin-bottom:48px;">Las personas que hacen posible mas de 28 anos de excelencia tecnologica.</p>
      <div class="eq-grid">{cards_html}</div>
    </div>
  </section>

  <!-- ══ FORMULARIO B2B ══ -->
  <div class="empresas-form-wrap">
    <div class="container">
      <div class="empresas-form-layout">
        <div class="empresas-form-info">
          <span class="empresas-form-badge">COTIZACIONES CORPORATIVAS</span>
          <h2>Solicita tu<br>Cotizacion Empresarial</h2>
          <p>Completa el formulario y un asesor especializado se comunicara contigo en menos de 24 horas habiles.</p>
          <ul class="empresas-benefits">
            <li>{check_svg} Precios especiales por volumen</li>
            <li>{check_svg} Factura electronica garantizada</li>
            <li>{check_svg} Garantia directa de fabrica</li>
            <li>{check_svg} Soporte tecnico post-venta</li>
            <li>{check_svg} Entrega en toda Colombia</li>
          </ul>
        </div>
        <div class="empresas-form-right">
          <form class="empresas-form" id="empresas-form" novalidate>
            <div class="ef-row">
              <div class="ef-field"><label for="ef-empresa">Razon Social <span class="ef-req">*</span></label><input type="text" id="ef-empresa" name="empresa" placeholder="Nombre de la empresa" required></div>
              <div class="ef-field"><label for="ef-nit">NIT <span class="ef-req">*</span></label><input type="text" id="ef-nit" name="nit" placeholder="Ej: 900.123.456-7" required></div>
            </div>
            <div class="ef-row">
              <div class="ef-field"><label for="ef-contacto">Nombre del Contacto <span class="ef-req">*</span></label><input type="text" id="ef-contacto" name="contacto" placeholder="Nombre completo" required></div>
              <div class="ef-field"><label for="ef-cargo">Cargo</label><input type="text" id="ef-cargo" name="cargo" placeholder="Ej: Gerente, CTO, Compras"></div>
            </div>
            <div class="ef-row">
              <div class="ef-field"><label for="ef-tel">Telefono <span class="ef-req">*</span></label><input type="tel" id="ef-tel" name="tel" placeholder="+57 300 000 0000" required></div>
              <div class="ef-field"><label for="ef-email">Correo Electronico <span class="ef-req">*</span></label><input type="email" id="ef-email" name="email" placeholder="correo@empresa.com" required></div>
            </div>
            <div class="ef-row">
              <div class="ef-field"><label for="ef-sector">Sector Empresarial</label><select id="ef-sector" name="sector"><option value="">Selecciona...</option><option>Tecnologia</option><option>Educacion</option><option>Salud</option><option>Gobierno / Entidad publica</option><option>Retail / Comercio</option><option>Manufactura / Industria</option><option>Servicios</option><option>Otro</option></select></div>
              <div class="ef-field"><label for="ef-cantidad">Cantidad Estimada</label><select id="ef-cantidad" name="cantidad"><option value="">Selecciona...</option><option>1 - 5 equipos</option><option>6 - 20 equipos</option><option>21 - 50 equipos</option><option>51 - 100 equipos</option><option>Mas de 100 equipos</option></select></div>
            </div>
            <div class="ef-field ef-field-full">
              <label>Tipo de Equipos / Productos</label>
              <div class="ef-checkboxes">
                <label class="ef-check"><input type="checkbox" name="tipo" value="Portatiles"> Portatiles</label>
                <label class="ef-check"><input type="checkbox" name="tipo" value="Celulares"> Celulares</label>
                <label class="ef-check"><input type="checkbox" name="tipo" value="Impresoras"> Impresoras</label>
                <label class="ef-check"><input type="checkbox" name="tipo" value="Perifericos"> Perifericos</label>
                <label class="ef-check"><input type="checkbox" name="tipo" value="PCs escritorio"> PCs escritorio</label>
                <label class="ef-check"><input type="checkbox" name="tipo" value="Mantenimiento"> Mantenimiento</label>
              </div>
            </div>
            <div class="ef-field ef-field-full"><label for="ef-mensaje">Mensaje Adicional</label><textarea id="ef-mensaje" name="mensaje" rows="3" placeholder="Cuentanos mas sobre tu necesidad..."></textarea></div>
            <button type="submit" class="ef-submit">Solicitar Cotizacion {send_svg}</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- ══ FOOTER ══ -->
  <footer class="site-footer">
    <div class="footer-inner container">
      <img src="/wp-content/uploads/2021/03/Tnt.png" alt="Tecnistore" class="footer-logo" width="130" loading="lazy">
      <div class="footer-lines">
        <div class="footer-lines-label">Lineas de Atencion</div>
        <div class="footer-lines-grid">
          <a href="tel:3164648758">316-464-8758</a><a href="tel:3017298980">301-729-8980</a>
          <a href="tel:3175098003">317-509-8003</a><a href="tel:3225817129">322-581-7129</a>
          <a href="tel:3144300573">314-430-0573</a><a href="tel:3118089016">311-808-9016</a>
        </div>
      </div>
      <div class="footer-copy"><p>Copyright &copy; <span id="footer-year"></span> Tecnistore | TNT Technistore Ltda. Todos los derechos reservados.</p></div>
    </div>
  </footer>

  <a class="whatsapp-float" href="https://wa.me/573225817129?text=Hola!" target="_blank" rel="noopener" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="{wsp_path}"/></svg>
  </a>

  <script>
  (function(){{
    /* Header scroll */
    var h=document.querySelector('.site-header');
    if(h)window.addEventListener('scroll',function(){{h.classList.toggle('scrolled',window.scrollY>80);}},{{passive:true}});
    /* Hamburger */
    var btn=document.getElementById('nav-hamburger'),menu=document.getElementById('nav-mobile-menu');
    if(btn&&menu){{
      btn.addEventListener('click',function(){{var open=menu.classList.contains('open');btn.classList.toggle('open',!open);menu.classList.toggle('open',!open);btn.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-hidden',String(open));}});
      document.addEventListener('click',function(e){{if(!e.target.closest('.nav-container')){{btn.classList.remove('open');menu.classList.remove('open');btn.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true');}}}});
    }}
    /* Team cards entrance */
    document.querySelectorAll('.eq-card').forEach(function(card,i){{
      card.style.transitionDelay=(i*80)+'ms';
      var obs=new IntersectionObserver(function(entries){{entries.forEach(function(e){{if(e.isIntersecting){{e.target.classList.add('visible');obs.unobserve(e.target);}}}});}},{{threshold:0.15}});
      obs.observe(card);
    }});
    /* Animated counters */
    var counters=document.querySelectorAll('.stat-number[data-target]');
    if(counters.length){{
      function easeOut(t){{return 1-Math.pow(1-t,4);}}
      function animateCounter(el){{
        var target=parseInt(el.dataset.target,10),prefix=el.dataset.prefix||'',sep=el.dataset.separator||'',dur=2000,st=null;
        function tick(now){{if(!st)st=now;var p=Math.min((now-st)/dur,1),val=Math.round(easeOut(p)*target);var d=sep&&val>=1000?val.toLocaleString('es-CO').replace(/,/g,sep):val.toLocaleString('es-CO');el.textContent=prefix+d;if(p<1)requestAnimationFrame(tick);}}
        requestAnimationFrame(tick);
      }}
      var obs2=new IntersectionObserver(function(entries){{entries.forEach(function(e){{if(e.isIntersecting){{counters.forEach(animateCounter);obs2.disconnect();}}}});}},{{threshold:0.3}});
      var statsEl=document.querySelector('.empresas-stats-panel');if(statsEl)obs2.observe(statsEl);
    }}
    /* Form submit → WhatsApp */
    var form=document.getElementById('empresas-form');
    if(form)form.addEventListener('submit',function(e){{
      e.preventDefault();
      var empresa=form.querySelector('[name=empresa]').value.trim();
      var nit=form.querySelector('[name=nit]').value.trim();
      var contacto=form.querySelector('[name=contacto]').value.trim();
      var cargo=form.querySelector('[name=cargo]').value.trim();
      var tel=form.querySelector('[name=tel]').value.trim();
      var email=form.querySelector('[name=email]').value.trim();
      var sector=form.querySelector('[name=sector]').value;
      var cantidad=form.querySelector('[name=cantidad]').value;
      var tipos=[];form.querySelectorAll('[name=tipo]:checked').forEach(function(c){{tipos.push(c.value);}});
      var mensaje=form.querySelector('[name=mensaje]').value.trim();
      if(!empresa||!nit||!contacto||!tel||!email){{alert('Por favor completa los campos obligatorios (*).');return;}}
      var txt='*Cotizacion Empresarial - Tecnistore*\\n\\n'+'Empresa: '+empresa+'\\nNIT: '+nit+'\\nContacto: '+contacto+(cargo?' ('+cargo+')':'')+'\\nTelefono: '+tel+'\\nCorreo: '+email+(sector?'\\nSector: '+sector:'')+(tipos.length?'\\nEquipos: '+tipos.join(', '):'')+(cantidad?'\\nCantidad: '+cantidad:'')+(mensaje?'\\nMensaje: '+mensaje:'');
      window.open('https://wa.me/573225817129?text='+encodeURIComponent(txt),'_blank');
    }});
    /* Footer year */
    var y=document.getElementById('footer-year');if(y)y.textContent=new Date().getFullYear();
  }})();
  </script>
</body>
</html>'''

with open('public/empresas/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('empresas/index.html written, size:', len(html))
