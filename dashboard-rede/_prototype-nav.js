(function () {
  /* ─── Screens registry ─────────────────────────────────────────────────── */
  const FLOWS = [
    {
      label: 'Fluxo 01 — Login',
      screens: [
        { label: 'Criar senha',  file: 'fluxo-01-login-01-criar-senha.html' },
        { label: 'Login',        file: 'fluxo-01-login-02-login.html' },
      ],
    },
  ];

  /* ─── Detect current page ──────────────────────────────────────────────── */
  const currentFile = window.location.pathname.split('/').pop();

  /* ─── Styles ───────────────────────────────────────────────────────────── */
  const css = `
    #pnav-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #7c3aed;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      transition: background 150ms ease, transform 150ms ease;
    }
    #pnav-btn:hover { background: #6d28d9; transform: scale(1.08); }
    #pnav-btn svg { width: 20px; height: 20px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

    #pnav-backdrop {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,0,0,0.5);
      opacity: 0; pointer-events: none;
      transition: opacity 200ms ease;
    }
    #pnav-backdrop.open { opacity: 1; pointer-events: auto; }

    #pnav-panel {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      z-index: 10001;
      width: 280px;
      background: #111111;
      border-left: 1px solid #2a2a2a;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 220ms cubic-bezier(0.3, 0.07, 0.34, 1);
    }
    #pnav-panel.open { transform: translateX(0); }

    #pnav-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #2a2a2a;
      flex-shrink: 0;
    }
    #pnav-header-label {
      font-family: system-ui, sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #7c3aed;
    }
    #pnav-close {
      background: none; border: none; cursor: pointer;
      color: #888; padding: 4px;
      display: flex; align-items: center;
      border-radius: 4px;
      transition: color 150ms ease;
    }
    #pnav-close:hover { color: #fff; }
    #pnav-close svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

    #pnav-list {
      overflow-y: auto;
      flex: 1;
      padding: 12px 0;
    }

    .pnav-flow-label {
      font-family: system-ui, sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #555;
      padding: 12px 20px 6px;
    }

    .pnav-screen-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 20px;
      font-family: system-ui, sans-serif;
      font-size: 13px;
      color: #aaa;
      text-decoration: none;
      transition: background 120ms ease, color 120ms ease;
      border-left: 2px solid transparent;
      margin: 0 8px;
      border-radius: 6px;
    }
    .pnav-screen-link:hover { background: #1e1e1e; color: #fff; }
    .pnav-screen-link.active {
      background: rgba(124,58,237,0.12);
      color: #a78bfa;
      border-left-color: #7c3aed;
    }
    .pnav-screen-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: currentColor;
      flex-shrink: 0;
      opacity: 0.5;
    }
    .pnav-screen-link.active .pnav-screen-dot { opacity: 1; }

    #pnav-footer {
      padding: 12px 20px;
      border-top: 1px solid #1e1e1e;
      font-family: system-ui, sans-serif;
      font-size: 10px;
      color: #444;
      flex-shrink: 0;
    }
  `;

  /* ─── Inject styles ────────────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ─── Build HTML ───────────────────────────────────────────────────────── */
  // Floating button
  const btn = document.createElement('button');
  btn.id = 'pnav-btn';
  btn.setAttribute('aria-label', 'Navegação do protótipo');
  btn.innerHTML = `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`;

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'pnav-backdrop';

  // Panel
  const panel = document.createElement('div');
  panel.id = 'pnav-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Navegação do protótipo');

  // Header
  const header = document.createElement('div');
  header.id = 'pnav-header';
  header.innerHTML = `
    <span id="pnav-header-label">Protótipo</span>
    <button id="pnav-close" aria-label="Fechar">
      <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;

  // List
  const list = document.createElement('div');
  list.id = 'pnav-list';

  FLOWS.forEach(flow => {
    const flowLabel = document.createElement('div');
    flowLabel.className = 'pnav-flow-label';
    flowLabel.textContent = flow.label;
    list.appendChild(flowLabel);

    flow.screens.forEach(screen => {
      const a = document.createElement('a');
      a.className = 'pnav-screen-link' + (screen.file === currentFile ? ' active' : '');
      a.href = screen.file;
      a.innerHTML = `<span class="pnav-screen-dot"></span>${screen.label}`;
      list.appendChild(a);
    });
  });

  // Footer
  const footer = document.createElement('div');
  footer.id = 'pnav-footer';
  footer.textContent = 'Althus · Navegação de protótipo';

  panel.appendChild(header);
  panel.appendChild(list);
  panel.appendChild(footer);

  document.body.appendChild(btn);
  document.body.appendChild(backdrop);
  document.body.appendChild(panel);

  /* ─── Interactions ─────────────────────────────────────────────────────── */
  function open() {
    panel.classList.add('open');
    backdrop.classList.add('open');
  }
  function close() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
  }

  btn.addEventListener('click', open);
  backdrop.addEventListener('click', close);
  document.getElementById('pnav-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
