/**
 * shared/sidebar.js
 * Componente de sidebar compartilhado — Dashboard da Rede Althus
 *
 * Uso em cada página:
 *   1. Substituir <aside class="sidebar open" id="sidebar">…</aside>
 *      por <aside id="sidebar-root"></aside>
 *   2. Adicionar data-page="<id>" no <body> (veja IDs abaixo)
 *   3. Remover o bloco de JS de toggle/tema da página
 *   4. Adicionar <script src="shared/sidebar.js"></script> antes do </body>
 *
 * IDs de página válidos:
 *   dashboard | locais | carregadores | tarifas | cupons |
 *   extrato | reservas | logs | usuarios | configuracoes
 */
(function () {
  'use strict';

  /* ── 1. Restaurar tema salvo ───────────────────────────────────────────── */
  const savedTheme = localStorage.getItem('althus-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  /* ── 2. Itens de navegação ─────────────────────────────────────────────── */
  const NAV_ITEMS = [
    { id: 'dashboard',     label: 'Dashboard',      icon: 'layout-dashboard', href: 'jornada-2-8-dashboard.html' },
    { id: 'locais',        label: 'Locais',          icon: 'map-pin',          href: 'jornada-2-1-1-listar-localidades.html' },
    { id: 'carregadores',  label: 'Carregadores',    icon: 'zap',              href: 'jornada-2-7-1-listar-carregadores.html' },
    { id: 'tarifas',       label: 'Tarifas',         icon: 'receipt',          href: 'jornada-2-2-1-opcoes-de-tarifas.html' },
    { id: 'cupons',        label: 'Cupons',           icon: 'tag',              href: 'jornada-2-4-1-listar-cupons.html' },
    { id: 'extrato',       label: 'Extrato',          icon: 'file-text',        href: 'jornada-2-3-1-extrato.html' },
    { id: 'reservas',      label: 'Reservas',         icon: 'calendar-clock',   href: 'jornada-2-9-1-lista-reservas.html' },
    { id: 'logs',          label: 'Logs de Erros',    icon: 'triangle-alert',   href: 'jornada-2-5-1-logs-de-erros.html' },
    { id: 'usuarios',      label: 'Usuários',         icon: 'users',            href: 'jornada-2-6-1-lista-usuarios.html' },
    { id: 'configuracoes', label: 'Configurações',    icon: 'settings',         href: 'jornada-2-8-1-minha-conta.html' },
  ];

  /* ── 3. Página ativa ───────────────────────────────────────────────────── */
  const activePage = document.body.dataset.page || '';

  /* ── 4. Montar HTML dos itens de nav ───────────────────────────────────── */
  const navHTML = NAV_ITEMS.map(item => {
    const active = item.id === activePage ? ' navItemActive' : '';
    return `
      <button class="navItem${active}" onclick="location.href='${item.href}'" type="button">
        <span class="navIcon"><i data-lucide="${item.icon}" width="18" height="18"></i></span>
        <span class="navLabel">${item.label}</span>
      </button>`.trim();
  }).join('\n      ');

  /* ── 5. Ícone e rótulo do tema ─────────────────────────────────────────── */
  const isDarkOnLoad = savedTheme !== 'light';
  const themeIconName = isDarkOnLoad ? 'sun' : 'moon';
  const themeLabelText = isDarkOnLoad ? 'Modo claro' : 'Modo escuro';

  /* ── 6. HTML completo do sidebar ───────────────────────────────────────── */
  const sidebarHTML = `
    <button class="toggleBtn" id="toggle-btn" aria-label="Recolher menu" type="button">
      <i data-lucide="chevron-left"  class="toggleIcon-left"  width="14" height="14"></i>
      <i data-lucide="chevron-right" class="toggleIcon-right" width="14" height="14"></i>
    </button>

    <div class="logoRow">
      <div class="logoWrap">
        <img class="logo-img logo-full"   src="../storybook/src/components/Logo/logo-default.svg" width="120" alt="Althus" />
        <img class="logo-img logo-symbol" src="../storybook/src/components/Logo/logo-symbol.svg"  width="28"  alt="Althus" />
      </div>
    </div>

    <div class="body">
      <nav class="navList">
        ${navHTML}
      </nav>

      <div class="spacer"></div>

      <div class="bottomList">
        <div class="separator"></div>
        <div class="userRow">
          <div class="avatar md"><span class="avatarInitials">AR</span></div>
          <div class="userInfo">
            <div class="userName">Admin Rede</div>
            <div class="userEmail">admin@rededemo.com.br</div>
          </div>
        </div>
        <button class="navItem" id="theme-btn" type="button">
          <span class="navIcon" id="theme-icon">
            <i data-lucide="${themeIconName}" width="18" height="18"></i>
          </span>
          <span class="navLabel" id="theme-label">${themeLabelText}</span>
        </button>
        <button class="navItem" type="button">
          <span class="navIcon"><i data-lucide="log-out" width="18" height="18"></i></span>
          <span class="navLabelLogout">Sair</span>
        </button>
      </div>
    </div>
  `;

  /* ── 7. Injetar no DOM ─────────────────────────────────────────────────── */
  const root = document.getElementById('sidebar-root');
  if (!root) return;
  root.className = 'sidebar open';
  root.id = 'sidebar';
  root.innerHTML = sidebarHTML;

  /* ── 8. Sidebar toggle ─────────────────────────────────────────────────── */
  document.getElementById('toggle-btn').addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    const isOpen = sb.classList.contains('open');
    sb.classList.toggle('open',   !isOpen);
    sb.classList.toggle('closed',  isOpen);
    document.getElementById('toggle-btn')
      .setAttribute('aria-label', isOpen ? 'Expandir menu' : 'Recolher menu');
  });

  /* ── 9. Tema toggle (persiste via localStorage) ────────────────────────── */
  document.getElementById('theme-btn').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const next   = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('althus-theme', next);
    document.getElementById('theme-icon').innerHTML =
      `<i data-lucide="${isDark ? 'moon' : 'sun'}" width="18" height="18"></i>`;
    document.getElementById('theme-label').textContent =
      isDark ? 'Modo escuro' : 'Modo claro';
    if (window.lucide) lucide.createIcons();
  });

  /* ── 10. Renderizar ícones Lucide do sidebar ───────────────────────────── */
  if (window.lucide) lucide.createIcons();

})();
