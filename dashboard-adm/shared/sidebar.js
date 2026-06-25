/**
 * shared/sidebar.js
 * Componente de sidebar compartilhado — Painel ADM Althus
 *
 * Uso em cada página:
 *   1. Adicionar <aside id="sidebar-root"></aside>
 *   2. Adicionar data-page="<id>" no <body> (veja IDs abaixo)
 *   3. Adicionar <script src="shared/sidebar.js"></script> antes do </body>
 *
 * IDs de página válidos:
 *   dashboard |
 *   financeiro-visao | btg-pactual | extrato-stripe | extrato-pagarme |
 *   mensalidades | repasses-cpos | cashback-tpv |
 *   operacional-historico | operacional-cupons | logs |
 *   analise-operacional | analise-cupons |
 *   usuarios-cpos | usuarios-app | usuarios-emsps | usuarios-althus |
 *   fiscal-recargas | fiscal-mensalidades |
 *   suporte
 */
(function () {
  'use strict';

  /* ── 1. Restaurar tema salvo ───────────────────────────────────────────── */
  const savedTheme = localStorage.getItem('althus-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  /* ── 2. Estrutura de navegação ─────────────────────────────────────────── */
  const NAV_ITEMS = [
    {
      id: 'dashboard',
      label: 'Início',
      icon: 'home',
      href: 'jornada-3-4-dashboard.html',
    },
    {
      id: 'financeiro',
      label: 'Financeiro',
      icon: 'dollar-sign',
      children: [
        { id: 'financeiro-visao',   label: 'Visão geral',     href: '#' },
        { id: 'btg-pactual',        label: 'BTG Pactual',     href: '#' },
        { id: 'extrato-stripe',     label: 'Extrato Stripe',  href: '#' },
        { id: 'extrato-pagarme',    label: 'Extrato Pagar.me', href: '#' },
        { id: 'mensalidades',       label: 'Mensalidades',    href: '#' },
        { id: 'repasses-cpos',      label: 'Repasses CPOs',   href: '#' },
        { id: 'cashback-tpv',       label: 'Cashback por TPV', href: '#' },
      ],
    },
    {
      id: 'operacional',
      label: 'Operacional',
      icon: 'activity',
      children: [
        { id: 'operacional-historico', label: 'Histórico',      href: '#' },
        { id: 'operacional-cupons',    label: 'Cupons',          href: '#' },
        { id: 'logs',                  label: 'Logs de falhas',  href: 'jornada-3-5-logs.html' },
      ],
    },
    {
      id: 'analises',
      label: 'Análises',
      icon: 'bar-chart-2',
      children: [
        { id: 'analise-operacional', label: 'Operacional', href: '#' },
        { id: 'analise-cupons',      label: 'Cupons',       href: '#' },
      ],
    },
    {
      id: 'gestao-usuarios',
      label: 'Gestão de usuários',
      icon: 'users',
      children: [
        { id: 'usuarios-cpos',   label: 'CPOs',   href: 'jornada-2-6-1-lista-usuarios.html' },
        { id: 'usuarios-app',    label: 'APP',    href: 'jornada-usuarios-app.html' },
        { id: 'usuarios-emsps',  label: 'eMSPs',  href: 'jornada-usuarios-emsps.html' },
        { id: 'usuarios-althus', label: 'Althus', href: 'jornada-usuarios-althus.html' },
      ],
    },
    {
      id: 'fiscal',
      label: 'Fiscal',
      icon: 'file-text',
      children: [
        { id: 'fiscal-recargas',     label: 'Recargas',     href: 'jornada-fiscal-recargas.html' },
        { id: 'fiscal-mensalidades', label: 'Mensalidades', href: 'jornada-fiscal-mensalidades.html' },
      ],
    },
    {
      id: 'suporte',
      label: 'Suporte',
      icon: 'message-square',
      href: '#',
    },
  ];

  /* ── 3. Página ativa ───────────────────────────────────────────────────── */
  const activePage = document.body.dataset.page || '';

  /* ── 4. Grupos que devem iniciar abertos (contêm a página ativa) ───────── */
  const openGroups = new Set();
  NAV_ITEMS.forEach(item => {
    if (item.children && item.children.some(c => c.id === activePage)) {
      openGroups.add(item.id);
    }
  });

  /* ── 5. Gerar HTML dos itens ───────────────────────────────────────────── */
  function buildNavHTML() {
    return NAV_ITEMS.map(item => {
      /* Item simples (sem submenu) */
      if (!item.children) {
        const active = item.id === activePage ? ' navItemActive' : '';
        return `
          <button class="navItem${active}" onclick="location.href='${item.href}'" type="button">
            <span class="navIcon"><i data-lucide="${item.icon}" width="18" height="18"></i></span>
            <span class="navLabel">${item.label}</span>
          </button>`.trim();
      }

      /* Grupo com submenu */
      const isOpen = openGroups.has(item.id);

      const subItems = item.children.map(child => {
        const subActive = child.id === activePage ? ' navSubItemActive' : '';
        return `<button class="navSubItem${subActive}" onclick="location.href='${child.href}'" type="button">${child.label}</button>`;
      }).join('\n          ');

      return `
        <div class="navGroup${isOpen ? ' open' : ''}" id="navg-${item.id}">
          <button class="navItem" type="button" onclick="toggleNavGroup('${item.id}')">
            <span class="navIcon"><i data-lucide="${item.icon}" width="18" height="18"></i></span>
            <span class="navLabel">${item.label}</span>
            <span class="navChevron"><i data-lucide="chevron-down" width="14" height="14"></i></span>
          </button>
          <div class="navSubList" id="navsl-${item.id}">
            ${subItems}
          </div>
        </div>`.trim();
    }).join('\n      ');
  }

  /* ── 6. Ícone e rótulo do tema ─────────────────────────────────────────── */
  const isDarkOnLoad   = savedTheme !== 'light';
  const themeIconName  = isDarkOnLoad ? 'sun'        : 'moon';
  const themeLabelText = isDarkOnLoad ? 'Modo claro' : 'Modo escuro';

  /* ── 7. HTML completo do sidebar ───────────────────────────────────────── */
  const sidebarHTML = `
    <button class="toggleBtn" id="toggle-btn" aria-label="Recolher menu" type="button">
      <i data-lucide="chevron-left"  class="toggleIcon-left"  width="14" height="14"></i>
      <i data-lucide="chevron-right" class="toggleIcon-right" width="14" height="14"></i>
    </button>

    <div class="logoRow">
      <div class="logoWrap">
        <img class="logo-img logo-full"   src="../storybook-desktop/src/components/Logo/logo-default.svg" width="120" alt="Althus" />
        <img class="logo-img logo-symbol" src="../storybook-desktop/src/components/Logo/logo-symbol.svg"  width="28"  alt="Althus" />
      </div>
    </div>

    <div class="body">
      <nav class="navList">
        ${buildNavHTML()}
      </nav>

      <div class="spacer"></div>

      <div class="bottomList">
        <div class="iconRow">
          <button class="iconBtn" id="theme-btn" type="button" aria-label="${themeLabelText}" title="${themeLabelText}">
            <span id="theme-icon"><i data-lucide="${themeIconName}" width="16" height="16"></i></span>
          </button>
          <button class="iconBtn" type="button" aria-label="Configurações" title="Configurações" onclick="location.href='configuracoes.html'">
            <i data-lucide="settings" width="16" height="16"></i>
          </button>
          <button class="iconBtn" type="button" id="notif-btn" aria-label="2 notificações" title="Notificações">
            <i data-lucide="bell" width="16" height="16"></i>
            <span class="notifBadge" id="notif-badge">2</span>
          </button>
        </div>
        <div class="separator"></div>
        <div class="userRow">
          <div style="padding:2px;background:linear-gradient(135deg,var(--color-brand-300),var(--color-brand-500));border-radius:var(--radius-full);display:inline-flex;flex-shrink:0;">
            <div class="avatar md"><img class="avatarImg" src="../src/perfil-admin.png" alt="Admin Althus" /></div>
          </div>
          <div class="userInfo">
            <div class="userName">Admin Althus</div>
            <div class="userEmail">admin@althus.com.br</div>
          </div>
        </div>
        <button class="navItem" type="button" onclick="location.href='jornada-3-1-login.html'">
          <span class="navIcon"><i data-lucide="log-out" width="18" height="18"></i></span>
          <span class="navLabelLogout">Sair</span>
        </button>
      </div>
    </div>
  `;

  /* ── 8. Injetar no DOM ─────────────────────────────────────────────────── */
  const root = document.getElementById('sidebar-root');
  if (!root) return;
  root.className = 'sidebar open';
  root.id = 'sidebar';
  root.innerHTML = sidebarHTML;

  /* ── 9. Toggle de grupo de nav ─────────────────────────────────────────── */
  window.toggleNavGroup = function (id) {
    const group = document.getElementById('navg-' + id);
    if (!group) return;
    group.classList.toggle('open');
    if (window.lucide) lucide.createIcons();
  };

  /* ── 10. Sidebar toggle ─────────────────────────────────────────────────── */
  document.getElementById('toggle-btn').addEventListener('click', () => {
    const sb     = document.getElementById('sidebar');
    const isOpen = sb.classList.contains('open');
    sb.classList.toggle('open',   !isOpen);
    sb.classList.toggle('closed',  isOpen);
    document.getElementById('toggle-btn')
      .setAttribute('aria-label', isOpen ? 'Expandir menu' : 'Recolher menu');
  });

  /* ── 11. Tema toggle ────────────────────────────────────────────────────── */
  document.getElementById('theme-btn').addEventListener('click', () => {
    const isDark   = document.documentElement.getAttribute('data-theme') !== 'light';
    const next     = isDark ? 'light' : 'dark';
    const newLabel = isDark ? 'Modo escuro' : 'Modo claro';
    const newIcon  = isDark ? 'moon' : 'sun';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('althus-theme', next);
    document.getElementById('theme-icon').innerHTML =
      `<i data-lucide="${newIcon}" width="16" height="16"></i>`;
    document.getElementById('theme-btn').setAttribute('aria-label', newLabel);
    document.getElementById('theme-btn').setAttribute('title', newLabel);
    if (window.lucide) lucide.createIcons();
  });

  /* ── 12. Renderizar ícones Lucide ──────────────────────────────────────── */
  if (window.lucide) lucide.createIcons();

  /* ── 13. Notificações ──────────────────────────────────────────────────── */
  const notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      if (typeof notifSheetOpen === 'function') notifSheetOpen();
    });
  }

})();
