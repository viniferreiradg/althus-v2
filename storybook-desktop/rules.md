# Design System Rules — Althus Eletropostos
_Last updated: 2026-05-22_

> Source of truth completa: `CLAUDE.md` neste mesmo diretório.  
> Este arquivo é a referência rápida para criação de telas HTML em `dashboard-rede/` e `dashboard-adm/`.

---

## Stack & Setup

- React 18 + Vite + TypeScript + CSS Modules
- Ícones: **Lucide** (CDN para HTML: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`)
- Fonte: **Inter** (Google Fonts)
- Tokens: `src/tokens/tokens.css` — importar sempre como primeiro `<link>`
- Storybook 8 (`npm run storybook` → porta 6006)

---

## Absolute Rules

1. **Zero valores literais** — toda cor, tamanho, espaçamento, raio ou borda usa `var(--token)`.
2. **Zero estilos de componente inline** — apenas `<link>` para cada componente usado.
3. **`<style>` somente para layout de página** — body, .main, .pageHeader, grids de página, padrões page-only como .chip, .switchLabel.
4. **Nunca linkar dois componentes com a mesma classe CSS** — ver seção de Conflitos abaixo.
5. **Ícones via `data-lucide`** — nunca SVG inline.
6. **Logos via `<img src="...svg">`** — nunca SVG inline.
7. **Fonte: `--font-weight-regular` para texto corrido e células de tabela** — medium/semibold só para títulos e labels.

---

## Theming

```html
<html lang="pt-BR" data-theme="dark">
```

Tokens semânticos se adaptam automaticamente. Dark é o padrão. Light via `data-theme="light"`.  
Botão de tema alterna `data-theme` e re-executa `lucide.createIcons()`.

---

## Componentes — CSS paths e classes HTML

### StepIndicator _(Mobile)_
```html
<link rel="stylesheet" href="../../storybook/src/components/StepIndicator/StepIndicator.module.css" />
```
Classes: `.stepRoot` (container flex-column), `.stepBars` (row de barras), `.stepBar` (barra individual), `.stepBar.done` (preenchida — brand gradient), `.stepBar.pending` (vazia — fundo elevado), `.stepLabel` (texto "Passo X de Y")

```html
<!-- Passo 1 de 5 -->
<div class="stepRoot" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="5" aria-label="Passo 1 de 5">
  <div class="stepBars">
    <div class="stepBar done"></div>
    <div class="stepBar pending"></div>
    <div class="stepBar pending"></div>
    <div class="stepBar pending"></div>
    <div class="stepBar pending"></div>
  </div>
  <span class="stepLabel" aria-hidden="true">Passo 1 de 5</span>
</div>
```

Regras:
- `.done` = todos os passos com índice < current (1-indexed)
- `.pending` = todos os passos com índice >= current
- Sempre incluir `role="progressbar"` + `aria-valuenow/min/max` no `.stepRoot`

---

### UserPin _(Mobile)_
```html
<link rel="stylesheet" href="../../storybook/src/components/UserPin/UserPin.module.css" />
```
Classe: `.userPin` — círculo brand com ícone `user` do Lucide. Visual 100% no componente; posicionamento no mapa via `.map-user-pin` em `page-mobile.css`.  
Futuramente suportará prop `pulse` com animação em loop (placeholder comentado no CSS).

```html
<!-- posicionamento (.map-user-pin) + visual (.userPin) no mesmo elemento -->
<div class="map-user-pin userPin" role="img" aria-label="Sua localização">
  <i data-lucide="user" width="18" height="18"></i>
</div>
```

---

### MapPin _(Mobile)_
```html
<link rel="stylesheet" href="../storybook/src/components/MapPin/MapPin.module.css" />
```
Classes: `.mapPin`, `.sm`, `.md`, `.lg` (tamanho), `.brand`, `.muted`, `.distributor` (variante), `.selected` (estado selecionado)  
Paths internos: `.pinBody` (forma do pin), `.pinDot` (círculo interno)

Variantes: `brand` (teal preenchido + dot branco) · `muted` (cinza, indisponível) · `distributor` (outline, cor via `--pin-color`)  
Estados: `pressed` — escala 0.88× (feedback de toque, aplicar via JS em touchstart/touchend) · `selected` — escala 1.2× + drop-shadow na cor do pin (aplicar quando a sheet de detalhe está aberta)

```html
<!-- pin distribuidor normal -->
<div class="map-pin-pos-1 pin-tupi">
  <svg class="mapPin md distributor" viewBox="0 0 24 24" fill="none" aria-label="TUPI">
    <path class="pinBody" d="M12.601 21.799C14.461 20.193 20 14.993 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 14.993 9.539 20.193 11.399 21.799C11.5723 21.9293 11.7832 21.9998 12 21.9998C12.2168 21.9998 12.4277 21.9293 12.601 21.799Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="pinDot"  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>

<!-- pin Althus selecionado (sheet aberta) — cor brand via .pin-brand em page-mobile.css -->
<div class="map-pin-center pin-brand">
  <svg class="mapPin md distributor selected" viewBox="0 0 24 24" fill="none" aria-label="Auto Shopping Eixo">
    <path class="pinBody" d="..." stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="pinDot"  d="..." stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>
```

Cores dos distribuidores (via `page-mobile.css`): `.pin-tupi` · `.pin-dcc` · `.pin-brand` (Althus, usa `--color-action-primary`)

---

### TimeSlot _(Mobile)_
```html
<link rel="stylesheet" href="../../storybook/src/components/TimeSlot/TimeSlot.module.css" />
```
Classes: `.timeSlot` (base — disponível), `.timeSlot.selected` (selecionado — gradiente brand), `.timeSlot.unavailable` (indisponível — dimmed + strikethrough + `disabled`)

```html
<!-- Disponível -->
<button class="timeSlot" type="button">09:00</button>

<!-- Selecionado -->
<button class="timeSlot selected" type="button" aria-pressed="true">09:30</button>

<!-- Indisponível -->
<button class="timeSlot unavailable" type="button" disabled aria-disabled="true">10:00</button>
```

Usar dentro de `.time-slot-grid` (2 colunas, definida em `page-mobile.css`):
```html
<div class="time-slot-grid">
  <button class="timeSlot selected">09:00</button>
  <button class="timeSlot">09:30</button>
  <button class="timeSlot unavailable" disabled>10:00</button>
  ...
</div>
```

Layout do dia complementar via classes de `page-mobile.css`: `.day-picker`, `.day-picker__nav`, `.day-picker__scroll`, `.day-picker__day` (+ `.active`), `.day-picker__day-name`, `.day-picker__day-date`. Seções com `.schedule-section` e `.schedule-section__label`.

---

### Tokens
```html
<link rel="stylesheet" href="../storybook/src/tokens/tokens.css" />
```
Sempre o primeiro link. Expõe todas as variáveis `--color-*`, `--spacing-*`, etc.

---

### Sidebar
```html
<link rel="stylesheet" href="../storybook/src/components/Sidebar/Sidebar.module.css" />
```
Classes: `.sidebar`, `.open`, `.closed`, `.toggleBtn`, `.logoRow`, `.logoWrap`, `.body`, `.navList`, `.navItem`, `.navItemActive`, `.navIcon`, `.navLabel`, `.navLabelLogout`, `.spacer`, `.bottomList`, `.separator`, `.userRow`, `.userName`, `.userEmail`, `.toggleIcon-left`, `.toggleIcon-right`

Sempre linkar junto com Avatar.

---

### Avatar
```html
<link rel="stylesheet" href="../storybook/src/components/Avatar/Avatar.module.css" />
```
Classes: `.avatar`, `.md`, `.sm`, `.avatarInitials`

---

### Background
```html
<link rel="stylesheet" href="../storybook/src/components/Background/Background.module.css" />
```
Classes: `.bgWrapper` (no `<main>`), `.blob1`, `.blob2` (dois `<div>` filhos diretos do main)

---

### Button
```html
<link rel="stylesheet" href="../storybook/src/components/Button/Button.module.css" />
```
Classes: `.btn`, `.primary`, `.secondary`, `.destructive`, `.ghost`, `.sm`, `.lg`, `.hasLeft` (com ícone esquerdo), `.iconOnly`  
Ícone: `<span class="icon"><i data-lucide="..." width="16" height="16"></i></span>`

---

### Input
```html
<link rel="stylesheet" href="../storybook/src/components/Input/Input.module.css" />
```
Classes: `.wrapper`, `.label`, `.inputWrap`, `.input`, `.helperText`, `.errorText`, `.successText`  
**Atenção:** `.wrapper` também existe em Dropdown — os dois podem coexistir (mesma estrutura visual).  
**Não coexiste com:** Checkbox (`.wrapper` conflita destrutivamente) e Toggle (`.wrapper` conflita destrutivamente).

---

### Dropdown
```html
<link rel="stylesheet" href="../storybook/src/components/Dropdown/Dropdown.module.css" />
```
Classes: `.wrapper`, `.label`, `.trigger`, `.chevron`, `.menu`, `.option`, `.selected`  
O `.wrapper` é o container do field (mesmo visual que Input `.wrapper`).  
**Não coexiste com:** Checkbox, Toggle (`.wrapper` conflita).

```html
<div class="wrapper" id="meu-dropdown">
  <label class="label" for="meu-trigger">Label</label>
  <div class="trigger" id="meu-trigger" role="button" tabindex="0" aria-haspopup="listbox">
    <span id="meu-value">Opção selecionada</span>
    <span class="chevron"><i data-lucide="chevron-down" width="14" height="14"></i></span>
  </div>
  <div class="menu" role="listbox">
    <div class="option selected" data-value="val1" role="option">Opção 1</div>
    <div class="option" data-value="val2" role="option">Opção 2</div>
  </div>
</div>
```
JS padrão para dropdowns: `querySelectorAll('[id$="-dropdown"]')`.

---

### Table
```html
<link rel="stylesheet" href="../storybook/src/components/Table/Table.module.css" />
```
Classes: `.card` (container), `.tableWrap`, `.table`, `.thead`, `.tbody`, `.tr`, `.th`, `.td`, `.tdMono`, `.badge`, `.badgeDot`, `.cellActions`  
**Atenção:** `.card` também existe em Card.module.css — **nunca linkar os dois na mesma página**.  
**Regra:** use Table.module.css em páginas de lista/detalhe; Card.module.css em páginas de formulário.  
**Status disponíveis para `.badge`:** `data-status="success|error|warning|info|orange|indigo|violet|pink"`

---

### Card
```html
<link rel="stylesheet" href="../storybook/src/components/Card/Card.module.css" />
```

| Classe | Token de fundo | Uso |
|--------|---------------|-----|
| `.card` | `--color-glass-surface` — `rgba(255,255,255,0.08)` dark / `rgba(0,0,0,0.05)` light | Glass padrão (adapta ao tema). Usar em formulários. |
| `.card2` | `--color-glass2-surface` — `rgba(255,255,255,0.40)` | Glass 2: mais opaco, tema-independente. |

Ambas usam `backdrop-filter: blur(16px)` e `border: --color-glass-border`.  
**Não coexiste com:** Table.module.css (mesma classe `.card`).

---

### Breadcrumb
```html
<link rel="stylesheet" href="../storybook/src/components/Breadcrumb/Breadcrumb.module.css" />
```
Classes: `.nav` (no `<nav>`), `.list` (no `<ol>`), `.item` (no `<li>`), `.link` (no `<a>`), `.sep` (dentro do `<a>`), `.current` (último item, `<span>`)

**Estrutura obrigatória** — o `.sep` fica DENTRO do `<a class="link">`:
```html
<nav aria-label="Breadcrumb" class="nav">
  <ol class="list">
    <li class="item">
      <a href="pagina-pai.html" class="link">
        Pai
        <span class="sep" aria-hidden="true"><i data-lucide="chevron-right" width="12" height="12"></i></span>
      </a>
    </li>
    <li class="item">
      <span class="current" aria-current="page">Filho</span>
    </li>
  </ol>
</nav>
```

---

### Divider
```html
<link rel="stylesheet" href="../storybook/src/components/Divider/Divider.module.css" />
```
Uso: `<hr class="divider" />`  
Cor: `--color-border-glass` (translúcido — `rgba(255,255,255,0.13)` dark / `rgba(0,0,0,0.08)` light)  
Margin: `0 var(--spacing-xl)` (inset horizontal)

---

### Timeline
```html
<link rel="stylesheet" href="../storybook/src/components/Timeline/Timeline.module.css" />
```
Classes: `.timeline`, `.tlItem`, `.tlVis`, `.tlDot`, `.tlConnector`, `.tlContent`, `.tlLabel`, `.tlTime`  
Modificadores de estado (no `.tlItem`): `.tlDone` · `.tlActive` · `.tlPending`

```html
<div class="timeline">
  <div class="tlItem tlDone">
    <div class="tlVis">
      <div class="tlDot"></div>
      <div class="tlConnector"></div>
    </div>
    <div class="tlContent">
      <div class="tlLabel">Reserva confirmada</div>
      <div class="tlTime">25/05/2026 às 09:30</div>
    </div>
  </div>
  <div class="tlItem tlActive"><!-- ... --></div>
  <div class="tlItem tlPending"><!-- ... --></div>
</div>
```

**Regras:**
- `.tlTime` é opcional (omitir quando não há timestamp)
- O conector do último item some automaticamente via CSS (`.tlItem:last-child .tlConnector`)
- Usar dentro de `.formSection` ou `.card` — não standalone

---

### Feedback
```html
<link rel="stylesheet" href="../storybook/src/components/Feedback/Feedback.module.css" />
```
Classes: `.alert`, `.success`, `.error`, `.warning`, `.info`, `.body`, `.title`, `.message`, `.dismiss`

```html
<div class="alert success" role="alert">
  <span><i data-lucide="circle-check" width="18" height="18"></i></span>
  <div class="body">
    <div class="title">Título</div>
    <div class="message">Mensagem.</div>
  </div>
  <button class="dismiss" aria-label="Fechar"><i data-lucide="x" width="14" height="14"></i></button>
</div>
```

---

### Pagination
```html
<link rel="stylesheet" href="../storybook/src/components/Pagination/Pagination.module.css" />
```
Classes: `.paginWrap`, `.paginInfo`, `.paginControls`, `.paginBtn`, `.paginBtnActive`

---

### DatePicker
```html
<link rel="stylesheet" href="../storybook/src/components/DatePicker/DatePicker.module.css" />
```
Layout horizontal: grade de dias (esquerda) + controles Start/End/Apply (direita).  
Adaptado do Geist Calendar `horizontalLayout` com tokens do Althus.

**Estrutura HTML:**
```html
<div class="popoverWrap">
  <!-- Trigger pill -->
  <button class="trigger [open]">
    <span class="triggerIcon"><i data-lucide="calendar" width="14" height="14"></i></span>
    <span class="triggerText">22/05 – 31/05/2026</span>         <!-- ou -->
    <span class="triggerPlaceholder">Selecionar período</span>   <!-- quando vazio -->
    <button class="triggerClear"><i data-lucide="x" width="12" height="12"></i></button>
  </button>

  <!-- Popover (ocultar com atributo hidden) -->
  <div class="popover">
    <!-- Painel esquerdo: calendário -->
    <div class="calPanel">
      <div class="calHeader">
        <button class="calNavBtn">...</button>
        <span class="calMonthLabel">May 2026</span>
        <button class="calNavBtn">...</button>
      </div>
      <div class="calGrid">
        <!-- 7x calDayName: S M T W T F S -->
        <!-- Nx calDay  + modificadores: calDayOutside / calDayToday / calDayStart / calDayEnd / calDayInRange -->
      </div>
    </div>

    <!-- Divisória vertical -->
    <div class="panelDivider"></div>

    <!-- Painel direito: controles -->
    <div class="ctrlPanel">
      <div><div class="ctrlFieldLabel">Start</div><input class="ctrlDateInput" /></div>
      <div><div class="ctrlFieldLabel">End</div><input class="ctrlDateInput" /></div>
      <div class="ctrlSpacer"></div>
      <button class="ctrlApply">Apply</button>
      <select class="ctrlTzSelect">...</select>
    </div>
  </div>
</div>
```

**Regras:**
- `.popover[hidden]` → `display: none` — use `hidden` attr para abrir/fechar
- `.calDayStart` e `.calDayEnd` nunca recebem `.calDayInRange`
- JS de navegação de meses e seleção de range fica na `<script>` da página

---

## Conflitos de classes conhecidos

| Classe | Componentes conflitantes | Solução |
|--------|--------------------------|---------|
| `.card` | Table.module.css + Card.module.css | Nunca linkar juntos. Table para listas; Card para formulários. |
| `.wrapper` | Input + Dropdown + Checkbox + Toggle | Input e Dropdown coexistem (mesmo visual). Checkbox e Toggle **não** coexistem com nenhum dos outros. |

### Toggle sem Toggle.module.css (workaround)

Quando a página já usa Dropdown, implementar toggle com CSS page-level:

```css
.switchLabel { display: inline-flex; align-items: center; gap: var(--spacing-sm); cursor: pointer; user-select: none; flex-shrink: 0; }
.switchInput { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.switchTrack { position: relative; width: 44px; height: 24px; background: var(--color-glass-surface); border: var(--border-width-thin) solid var(--color-glass-border); border-radius: var(--radius-full); transition: background var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast); flex-shrink: 0; }
.switchThumb { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: white; border-radius: 50%; box-shadow: var(--shadow-xs); transition: transform var(--transition-fast); }
.switchLabel:has(input:checked) .switchTrack { background: var(--gradient-brand); border-color: transparent; box-shadow: var(--shadow-highlight), var(--shadow-glow-sm); }
.switchLabel:has(input:checked) .switchThumb { transform: translateX(20px); }
```

### MultiSelect
```html
<link rel="stylesheet" href="../storybook/src/components/MultiSelect/MultiSelect.module.css" />
```
Classes: `.multiSelect` (container), `.msLabel`, `.msField` (trigger), `.msField.msOpen`, `.msField.msDisabled`, `.msField.msError`, `.msInner`, `.msPlaceholder`, `.msChip`, `.msChipLabel`, `.msChipRemove`, `.msChevron`, `.msMenu`, `.msOption`, `.msOption.msSelected`, `.msCheck`, `.msOptionLabel`, `.msHelperText`, `.msErrorText`

Todas as classes prefixadas com `ms` — sem conflito com Dropdown, Input, Toggle ou outros.

```html
<div class="multiSelect" id="meu-ms" data-placeholder="Selecione...">
  <span class="msLabel">Campo</span>
  <div class="msField" role="combobox" tabindex="0" aria-expanded="false" aria-haspopup="listbox">
    <div class="msInner"><!-- chips injetados por JS --></div>
    <span class="msChevron"><i data-lucide="chevron-down" width="14" height="14"></i></span>
  </div>
  <div class="msMenu" hidden role="listbox" aria-multiselectable="true">
    <div class="msOption" data-value="val1" role="option" aria-selected="false">
      <span class="msCheck"></span>
      <span class="msOptionLabel">Opção 1</span>
    </div>
    <div class="msOption" data-value="val2" role="option" aria-selected="false">
      <span class="msCheck"></span>
      <span class="msOptionLabel">Opção 2</span>
    </div>
  </div>
</div>
```

JS padrão (vanilla): usar `makeMultiSelect(containerId, options[])` — função que gerencia seleção, chips e abertura/fechamento do menu. Sempre chamar `lucide.createIcons()` após inserir chips ou ícones de check. Fechar menu no `document.addEventListener('click', ...)`.

---

### FilterChips — filtros em pílula (seleção única)

**CSS:** `../storybook-desktop/src/components/FilterChips/FilterChips.module.css`
**Classes:** `.filterChips` (container) · `.filterChip` (cada botão) · `.filterChip.active` (ativo)

Usado sempre que precisar de um grupo de filtros em pílula com seleção exclusiva (um ativo por vez). Padrão visual: pílula com borda, fundo invertido no ativo.

```html
<link rel="stylesheet" href="../storybook-desktop/src/components/FilterChips/FilterChips.module.css" />

<div class="filterChips">
  <button class="filterChip active" type="button">30 dias</button>
  <button class="filterChip" type="button">60 dias</button>
  <button class="filterChip" type="button">90 dias</button>
  <button class="filterChip" type="button">
    <i data-lucide="calendar" width="12" height="12"></i>
    Período
  </button>
</div>
```

JS para alternar ativo:
```js
document.querySelectorAll('.filterChips').forEach(group => {
  group.querySelectorAll('.filterChip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.filterChip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
});
```

**Conflitos:** `.filterChip` não conflita com `.chip` (Chip.module.css). Não linkar Chip.module.css e FilterChips.module.css na mesma página — classes distintas, mas evitar por clareza.

---

### Chips multi-select (workaround para Checkbox)

Quando a página já usa Dropdown, implementar multi-select com CSS page-level:

```css
.chipGroup { display: flex; flex-wrap: wrap; gap: var(--spacing-sm); margin-top: var(--spacing-xs); }
.chip { display: inline-flex; align-items: center; gap: var(--spacing-xs); padding: var(--spacing-xs) var(--spacing-md); border: var(--border-width-thin) solid var(--color-border-muted); border-radius: var(--radius-full); font-size: var(--font-size-sm); color: var(--color-text-secondary); cursor: pointer; user-select: none; transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast); }
.chip input[type="checkbox"] { display: none; }
.chip:has(input:checked) { border-color: var(--color-action-primary); color: var(--color-text-brand); background: var(--color-bg-brand); }
```

---

## Padrões de página estabelecidos

### Página de lista (ex: listar-carregadores)
- CSS: tokens + Sidebar + Avatar + Background + Button + Input + Dropdown + Table + Pagination
- Sem breadcrumb (top-level nav)
- Header: título + subtítulo + botão de ação primária
- Toolbar: inputs de busca + dropdowns de filtro
- Conteúdo: `<div class="card tableWrap">...</div>`

### Página de detalhe (ex: visualizar-dispositivo)
- CSS: tokens + Sidebar + Avatar + Background + Button + Breadcrumb + **Table.module.css** (para `.card` + `.badge`) + Divider
- Breadcrumb: "Pai > Filho"
- Header: título + badge de status + botão "Editar"
- Grid de cards com label/value pairs

### Página de formulário (ex: editar/cadastrar dispositivo, tarifas)
- CSS: tokens + Sidebar + Avatar + Background + Button + Input + Dropdown + Breadcrumb + Divider + Feedback + **Card.module.css**
- 1 card com múltiplas seções separadas por `<hr class="divider" />`
- Footer dentro do card: `<div class="formFooter">` com Cancelar + Salvar

### Estrutura de formulário padrão
```html
<div class="card">
  <div class="formSection">
    <h2 class="sectionTitle">Seção</h2>
    <p class="sectionSubtitle">Descrição</p>
    <div class="formGrid grid2">
      <!-- campos -->
    </div>
  </div>
  <hr class="divider" />
  <!-- próxima seção -->
  <div class="formFooter">
    <button class="btn secondary">Cancelar</button>
    <button class="btn primary hasLeft"><span class="icon"><i data-lucide="save" ...></i></span>Salvar</button>
  </div>
</div>
```

---

## Tokens mais usados

### Cores semânticas (preferir sempre)
- Texto: `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-brand`
- Fundo: `--color-bg-default`, `--color-bg-surface`, `--color-bg-brand`
- Borda: `--color-border-default`, `--color-border-subtle`, `--color-border-muted`, `--color-border-glass`, `--color-border-focus`
- Ação: `--color-action-primary`, `--color-action-primary-hover`

### Espaçamento
`--spacing-xs` (4px) · `--spacing-sm` (8px) · `--spacing-md` (16px) · `--spacing-lg` (24px) · `--spacing-xl` (32px) · `--spacing-2xl` (48px)

### Tipografia
- Tamanhos: `--font-size-xs` (12) · `--font-size-sm` (14) · `--font-size-md` (16) · `--font-size-xl` (24)
- Pesos: `--font-weight-regular` (400) · `--font-weight-medium` (500) · `--font-weight-semibold` (600)
- Mono: `--font-mono`

### Raios
`--radius-xs` (4) · `--radius-sm` (8) · `--radius-md` (16) · `--radius-full` (9999)

### Border width
`--border-width-thin` (1px) · `--border-width-medium` (2px)

### Gradiente e glow brand
`--gradient-brand` · `--shadow-glow-sm` · `--shadow-highlight` · `--shadow-xs`

### Glass
`--color-glass-surface` · `--color-glass-border`

---

## Sidebar — estado padrão

```html
<aside class="sidebar open" id="sidebar">
  <button class="toggleBtn" id="toggle-btn" aria-label="Recolher menu">
    <i data-lucide="chevron-left" class="toggleIcon-left" width="14" height="14"></i>
    <i data-lucide="chevron-right" class="toggleIcon-right" width="14" height="14"></i>
  </button>
  <!-- logoRow, body com navList, spacer, bottomList -->
</aside>
```

Itens de nav: Dashboard (`layout-dashboard`), Locais (`map-pin`), Carregadores (`zap`), Tarifas (`receipt`), Cupons (`tag`), Extrato (`file-text`), Logs de Erros (`triangle-alert`).  
Adicionar `navItemActive` no item ativo da página.

---

## HTML page skeleton

```html
<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Título — Althus</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <link rel="stylesheet" href="../storybook/src/tokens/tokens.css" />
  <!-- demais links de componentes -->
  <style>
    /* somente layout de página */
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: var(--font-body); background: var(--color-bg-default); color: var(--color-text-primary); display: flex; height: 100vh; overflow: hidden; -webkit-font-smoothing: antialiased; }
    .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
    /* sidebar collapsed */
    .closed .navLabel, .closed .navLabelLogout, .closed .userInfo { display: none; }
    .closed .toggleIcon-left { display: none; }
    .closed .toggleIcon-right { display: inline-flex; }
    .toggleIcon-right { display: none; }
    /* logo */
    .logo-img { display: block; filter: brightness(0) invert(1); }
    [data-theme="light"] .logo-img { filter: none; }
    .logo-symbol { display: none; }
    .closed .logo-full { display: none; }
    .closed .logo-symbol { display: block; }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <!-- Main (class="main bgWrapper") -->
  <!--   blob1 + blob2 -->
  <!--   pageHeader -->
  <!--   pageContent (overflow-y: auto) -->
  <script>
    /* sidebar toggle, theme toggle */
    lucide.createIcons();
  </script>
</body>
</html>
```
