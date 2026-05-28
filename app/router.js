/**
 * Althus App Router — iframe model
 * Partials are iframe wrappers in partials/{id}.html
 * Screens are standalone HTML pages in screens/{id}.html
 * Transitions are CSS animations applied to the .screen div wrapper
 */
const router = (() => {

  /* ── Base URL ───────────────────────────────────────── */
  const _base = (() => {
    try {
      return new URL('./', document.currentScript.src).href;
    } catch (_) {
      return new URL('./', window.location.href).href;
    }
  })();

  /* ── Constants ─────────────────────────────────────── */

  const ONBOARDING = new Set([
    'splash', 'login', 'cadastro-step1', 'cadastro-step2', 'cadastro-step3',
    'cadastro-step4', 'cadastro-step5', 'recuperar-canal', 'recuperar-otp', 'recuperar-senha',
  ]);

  const TAB_MAP = {
    'home-map': 'mapa', 'map-sheet': 'mapa', 'map-device': 'mapa', 'map-filters': 'mapa',
    'recarga-metodo': 'mapa', 'recarga-pagamento': 'mapa', 'recarga-andamento': 'mapa',
    'recarga-avaliacao': 'mapa', 'reserva-confirmar': 'mapa', 'reserva-confirmada': 'mapa',
    'historico-lista': 'historico', 'historico-detalhe': 'historico',
    'reservas-lista': 'historico', 'reservas-detalhe': 'historico', 'reserva-cancelar': 'historico',
    'carteira': 'carteira', 'carteira-pix': 'carteira', 'carteira-cartao': 'carteira',
    'extrato': 'carteira', 'cupons': 'carteira', 'cartoes': 'carteira',
    'perfil': 'perfil', 'perfil-dados': 'perfil', 'perfil-senha': 'perfil',
    'veiculos-lista': 'perfil', 'veiculos-form': 'perfil', 'notificacoes': 'perfil',
    'notificacao-detalhe': 'perfil', 'termos': 'perfil',
  };

  const DURATION = 300;

  /* ── State ─────────────────────────────────────────── */

  let stack        = [];
  let modals       = [];
  let transitioning = false;

  /* ── DOM helpers ───────────────────────────────────── */

  const $container = () => document.getElementById('screen-container');
  const $bottomNav = () => document.getElementById('bottom-nav');

  /* ── Partial loading ───────────────────────────────── */

  async function loadPartial(screenId) {
    const url = `${_base}partials/${screenId}.html`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Partial not found: ${url} (${res.status})`);
    return res.text();
  }

  function parsePartial(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html.trim();
    const screen = temp.querySelector('.screen') || temp.firstElementChild;
    const iframe = screen && screen.querySelector('iframe');
    if (iframe) {
      const screenId = screen.dataset.screenId;
      iframe.src = `${_base}screens/${screenId}.html?t=${Date.now()}`;
    }
    return screen;
  }

  /* ── Bottom nav ─────────────────────────────────────── */

  function updateBottomNav(screenId) {
    const nav = $bottomNav();
    if (!nav) return;
    if (ONBOARDING.has(screenId)) {
      nav.hidden = true;
    } else {
      nav.hidden = false;
      const tab = TAB_MAP[screenId];
      if (tab) {
        nav.querySelectorAll('[data-tab]').forEach(btn => {
          btn.classList.toggle('navActive', btn.dataset.tab === tab);
        });
      }
    }
  }

  /* ── Utility ────────────────────────────────────────── */

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  /* ── Transition helpers ─────────────────────────────── */

  async function transition({ entering, exiting, enterClass, exitClass }) {
    if (enterClass) entering.classList.add(enterClass);
    if (exitClass && exiting) exiting.classList.add(exitClass);
    await wait(DURATION);
    if (enterClass) entering.classList.remove(enterClass);
    if (exitClass && exiting) {
      exiting.classList.remove(exitClass);
      exiting.remove();
    }
  }

  /* ── Public API ─────────────────────────────────────── */

  async function push(screenId) {
    if (transitioning) return;
    transitioning = true;
    try {
      const html = await loadPartial(screenId);
      const entering = parsePartial(html);
      const exiting = $container().lastElementChild;
      $container().appendChild(entering);
      await transition({ entering, exiting, enterClass: 'enterPush', exitClass: 'exitPush' });
      stack.push(screenId);
      updateBottomNav(screenId);
    } finally { transitioning = false; }
  }

  async function pop() {
    if (transitioning || stack.length <= 1) return;
    transitioning = true;
    try {
      const prevId = stack[stack.length - 2];
      const html = await loadPartial(prevId);
      const entering = parsePartial(html);
      const exiting = $container().lastElementChild;
      $container().insertBefore(entering, exiting);
      await transition({ entering, exiting, enterClass: 'enterPop', exitClass: 'exitPop' });
      stack.pop();
      updateBottomNav(prevId);
    } finally { transitioning = false; }
  }

  async function replace(screenId) {
    if (transitioning) return;
    transitioning = true;
    try {
      const html = await loadPartial(screenId);
      const entering = parsePartial(html);
      const exiting = $container().lastElementChild;
      $container().appendChild(entering);
      await transition({ entering, exiting, enterClass: 'enterReplace', exitClass: 'exitReplace' });
      stack = [screenId];
      updateBottomNav(screenId);
    } finally { transitioning = false; }
  }

  async function modal(screenId) {
    if (transitioning) return;
    transitioning = true;
    try {
      const html = await loadPartial(screenId);
      const screen = parsePartial(html);
      screen.classList.add('modalScreen', 'enterModal');

      const backdrop = document.createElement('div');
      backdrop.className = 'modalBackdrop';
      backdrop.addEventListener('click', closeModal);

      $container().appendChild(backdrop);
      $container().appendChild(screen);

      requestAnimationFrame(() => backdrop.classList.add('backdropVisible'));
      await wait(DURATION);
      screen.classList.remove('enterModal');

      modals.push({ screen, backdrop, screenId });
    } finally { transitioning = false; }
  }

  async function closeModal() {
    if (transitioning || modals.length === 0) return;
    transitioning = true;
    try {
      const { screen, backdrop } = modals[modals.length - 1];
      screen.classList.add('exitModal');
      backdrop.classList.remove('backdropVisible');
      await wait(DURATION);
      screen.remove();
      backdrop.remove();
      modals.pop();
    } finally { transitioning = false; }
  }

  async function tab(screenId) {
    if (transitioning) return;
    transitioning = true;
    try {
      const html = await loadPartial(screenId);
      const entering = parsePartial(html);
      const exiting = $container().lastElementChild;
      $container().appendChild(entering);
      await transition({ entering, exiting, enterClass: 'enterTab', exitClass: 'exitTab' });
      stack = [screenId];
      updateBottomNav(screenId);
    } finally { transitioning = false; }
  }

  async function init(screenId) {
    try {
      const html = await loadPartial(screenId);
      const screen = parsePartial(html);
      $container().appendChild(screen);
      stack = [screenId];
      updateBottomNav(screenId);
    } catch (err) {
      console.error('[router] Failed to init:', err);
      const isFile = window.location.protocol === 'file:';
      $container().innerHTML = `
        <div style="position:absolute;inset:0;padding:24px 20px;font-family:system-ui,sans-serif;font-size:13px;line-height:1.6;background:#0a0a0b">
          <div style="color:#e57373;font-weight:600;margin-bottom:8px">Erro ao carregar tela</div>
          <div style="color:#888;margin-bottom:12px">${err.message}</div>
          ${isFile ? `<div style="color:#ffb74d;padding:10px;background:rgba(255,183,77,0.08);border-radius:6px;border:1px solid rgba(255,183,77,0.2)">
            Abra via servidor HTTP:<br/>
            <span style="font-family:monospace;color:#fff">localhost:3000/app/prototipo.html</span>
          </div>` : `<div style="color:#555">Base: ${_base}</div>`}
        </div>`;
    }
  }

  async function goto(screenId) {
    transitioning = false;
    modals.forEach(({ screen, backdrop }) => { screen.remove(); backdrop.remove(); });
    modals = [];
    try {
      const html = await loadPartial(screenId);
      const screen = parsePartial(html);
      $container().innerHTML = '';
      $container().appendChild(screen);
      stack = [screenId];
      updateBottomNav(screenId);
    } catch (err) {
      console.error('[router] goto failed:', err);
    }
  }

  return { push, pop, replace, modal, closeModal, tab, init, goto };

})();

/* Expõe como window.router para iframes acessarem via window.parent.router */
window.router = router;
