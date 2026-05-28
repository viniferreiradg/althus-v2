# Althus Design System — CLAUDE.md

Source of truth do projeto. Nenhuma decisão visual ou estrutural é tomada fora deste arquivo.

---

## Stack

- React 18 + Vite + TypeScript
- CSS Modules por componente + `src/tokens/tokens.css` (tokens globais)
- Lucide React (ícones — **nunca** criar ícones manualmente)
- ApexCharts + react-apexcharts (gráficos — usar via `LineChart` e `DonutChart` do DS)
- Storybook 8 (`npm run storybook` → porta 6006)

---

## Regras absolutas

1. **Nunca usar valores literais de cor, espaçamento, tipografia, raio ou borda no CSS.** Sempre usar tokens (`var(--color-*)`, `var(--spacing-*)`, etc.). Se o token não existir, reportar ao usuário — nunca inventar valor bruto.
2. **Nunca criar ícones manualmente.** Somente Lucide React.
3. **Nunca recriar um componente que já existe.** Importar do caminho correto.
4. **Componente filho primeiro.** Ao criar qualquer componente que usa sub-componentes, resolver os filhos antes do pai.
5. **Componente novo** → pedir autorização → criar → criar story no Storybook → registrar neste CLAUDE.md → apresentar para aprovação.
6. **Sempre ler este CLAUDE.md** antes de criar qualquer tela ou componente.
7. **Peso de fonte para texto corrido e tabelas: `--font-weight-regular` (400).** Nunca usar medium (500) em células de tabela ou parágrafos de texto. Medium e semibold são reservados para títulos, labels de campo e destaques pontuais.
8. **Respostas curtas.** Ao executar tarefas, responder apenas "Feito." — sem descrever o que foi feito. Explicar somente se houver dúvida, algo saiu do planejado, ou o usuário pedir explicitamente.
9. **Valores de layout sem token → `../shared/page.css`.** Quando um valor pixel-específico não tem token equivalente (ex: `min-width: 720px`, `margin-top: 1px`, `width: 140px`), criar uma classe nomeada em `../shared/page.css` — nunca usar `style=""` inline nem `<style>` na página. O `<style>` de página é reservado apenas para classes de layout exclusivas daquela tela que usem 100% tokens.
10. **Sempre atualizar `prototipo.html`** ao criar qualquer tela nova. Adicionar a tela no fluxo correspondente dentro do array `FLOWS`. Se o fluxo ainda não existir, criar um novo objeto `{ label, screens }` com o RF correto.

---

## Tema

O projeto é **dark mode por padrão** (`:root`). Light mode via seletor `[data-theme="light"]`.  
Os tokens semânticos (ex: `--color-text-primary`, `--color-bg-default`) se adaptam automaticamente ao tema — sempre preferir tokens semânticos a tokens de paleta bruta.

---

## Componentes disponíveis

### MapPin _(Mobile)_
**Import:** `import { MapPin } from '../components/MapPin/MapPin'`  
**Story:** `Mobile/MapPin`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm=32px · md=48px · lg=64px |
| `variant` | `'brand' \| 'muted' \| 'distributor'` | `'brand'` | brand=Althus (teal preenchido) · muted=indisponível (cinza) · distributor=rede terceira (outline) |
| `pinColor` | `string` | — | Hex do distribuidor — só usado com `variant="distributor"` |
| `aria-label` | `string` | — | Descrição para acessibilidade |

```tsx
<MapPin size="lg" variant="brand" aria-label="Carregador Althus disponível" />
<MapPin size="lg" variant="muted" aria-label="Carregador indisponível" />
<MapPin size="sm" variant="distributor" pinColor="#E63946" aria-label="TUPI" />
<MapPin size="sm" variant="distributor" pinColor="#2196F3" aria-label="DCC" />
```

**Em telas HTML:** usar as classes `.mapPin`, `.sm`, `.distributor` no `<svg>`. A cor do distribuidor é definida via classe no container (`.pin-tupi`, `.pin-dcc`) declarada em `page-mobile.css`, que injeta `--pin-color`.

```html
<div class="map-pin-pos-1 pin-tupi">
  <svg class="mapPin sm distributor" viewBox="0 0 24 24" fill="none" aria-label="TUPI">
    <path class="pinBody" d="M12.601 21.799...Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="pinDot"  d="M12 13C13.6569...Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>
```

---

### AppBar _(Mobile)_
**Import:** `import { AppBar } from '../components/AppBar/AppBar'`  
**Story:** `Mobile/AppBar`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | — | Título centralizado |
| `onBack` | `() => void` | — | Exibe botão de voltar (ChevronLeft) quando fornecido |
| `action` | `ReactNode` | — | Elemento opcional no lado direito |
| `className` | `string` | — | Classe extra no container |

```tsx
<AppBar title="Esqueci minha senha" onBack={() => router.pop()} />
<AppBar title="Detalhes" onBack={() => {}} action={<IconButton />} />
```

**Em telas HTML (sem React):** usar as classes do `AppBar.module.css` diretamente:
```html
<header class="appBar">
  <div class="appBarSide appBarSideLeft">
    <button class="appBarIconBtn" onclick="router.pop()" aria-label="Voltar">
      <i data-lucide="chevron-left" width="24" height="24"></i>
    </button>
  </div>
  <span class="appBarTitle">Título</span>
  <div class="appBarSide appBarSideRight"></div>
</header>
```

> O `padding-top` usa `calc(var(--status-bar-height, 0px) + var(--spacing-xs))`.  
> No Storybook `--status-bar-height` é `0px` (fallback). Nas telas mobile é `59px` (definido em `page-mobile.css`).

---

### FAB _(Mobile)_
**Import:** `import { FAB } from '../components/FAB/FAB'`  
**Story:** `Mobile/FAB`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `icon` | `ReactNode` | — | Ícone Lucide React |
| `variant` | `'glass' \| 'brand'` | `'glass'` | Glass (padrão) ou gradiente brand |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `md` = 48×48px |
| `aria-label` | `string` | — | **Obrigatório** — acessibilidade |
| `disabled` | `boolean` | — | Herdado do `<button>` |

```tsx
<FAB icon={<Car size={20} />} aria-label="Selecionar veículo" />
<FAB icon={<QrCode size={20} />} aria-label="Escanear QR Code" />
<FAB icon={<Zap size={22} />} variant="brand" aria-label="Iniciar recarga" />
```

**Em telas HTML:** usar a classe `.fab` de `FAB.module.css` + variantes `.brand`, `.sm`, `.lg`.  
Posicionamento no mapa via `.map-fabs` em `page-mobile.css`.

---

### BottomNav _(Mobile)_
**Import:** `import { BottomNav } from '../components/BottomNav/BottomNav'`  
**Story:** `Mobile/BottomNav`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `items` | `NavItemDef[]` | — | Array de `{ id, label, icon }` |
| `activeId` | `string` | — | ID da aba ativa |
| `onSelect` | `(id: string) => void` | — | Callback ao clicar numa aba |

> **Nota:** Em `prototipo.html`, o BottomNav vive no shell (fora dos iframes). O router chama `updateBottomNav(screenId)` para alternar o `.navActive`. O nav flutua sobre as telas com `position: absolute; bottom: 0`.

**Em telas HTML (sem React):** usar as classes do `BottomNav.module.css` diretamente no shell.

---

### OTPInput _(Mobile)_
**Import:** `import { OTPInput } from '../components/OTPInput/OTPInput'`  
**Story:** `Mobile/OTPInput`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `length` | `number` | `6` | Quantidade de células |
| `onChange` | `(value: string) => void` | — | Dispara a cada mudança |
| `onComplete` | `(value: string) => void` | — | Dispara quando todas as células estão preenchidas |
| `error` | `boolean` | `false` | Bordas vermelhas em todas as células |
| `success` | `boolean` | `false` | Bordas verdes em todas as células |
| `disabled` | `boolean` | `false` | Desabilita todas as células |

```tsx
<OTPInput length={6} onComplete={(code) => verify(code)} />
<OTPInput length={6} error />
```

**Em telas HTML:** usar as classes `otpRoot` e `otpCell` do `OTPInput.module.css` diretamente,  
com o comportamento de foco escrito em vanilla JS (ver `screens/recuperar-otp.html`).

---

### Button
**Import:** `import { Button } from '../components/Button/Button'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'primary' \| 'secondary' \| 'destructive' \| 'ghost'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `iconLeft` | `ReactNode` | — | Ícone à esquerda |
| `iconRight` | `ReactNode` | — | Ícone à direita |
| `iconOnly` | `boolean` | `false` | Modo apenas ícone (sem texto) |
| `disabled` | `boolean` | — | Herdado do `<button>` |
| `children` | `ReactNode` | — | Texto do botão |

```tsx
<Button variant="primary" iconLeft={<Save size={16} />}>Salvar</Button>
<Button variant="destructive" iconLeft={<Trash size={16} />}>Excluir</Button>
<Button iconOnly iconLeft={<Plus size={16} />} aria-label="Adicionar" size="sm" />
```

---

### Input
**Import:** `import { Input } from '../components/Input/Input'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Label acima do campo |
| `helperText` | `string` | Texto auxiliar abaixo |
| `error` | `string` | Mensagem de erro (mostra ícone CircleX) |
| `success` | `string` | Mensagem de sucesso (mostra ícone CircleCheck) |
| `iconLeft` | `ReactNode` | Ícone à esquerda dentro do campo |
| `iconRight` | `ReactNode` | Ícone à direita dentro do campo (decorativo, sem interação) |
| `toggleable` | `boolean` | Modo senha com botão Eye/EyeOff interativo — use no lugar de `type="password"` |
| `disabled` | `boolean` | Desabilita o campo |
| + todos `InputHTMLAttributes` | — | `placeholder`, `type`, `value`, `onChange`, etc. |

```tsx
<Input label="Buscar" iconLeft={<Search size={16} />} placeholder="Pesquisar..." />
<Input label="Senha" toggleable placeholder="••••••••" />
<Input label="E-mail" iconLeft={<Mail size={16} />} value="admin@rede.com.br" disabled readOnly />
```

---

### Sidebar
**Import:** `import { Sidebar } from '../components/Sidebar/Sidebar'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | `true` | Expandida ou colapsada |
| `onToggle` | `() => void` | — | Callback do botão toggle |
| `activeItem` | `string` | `'dashboard'` | ID do item ativo |
| `onNavClick` | `(id: string) => void` | — | Callback ao clicar em item |
| `user` | `SidebarUser` | `{ name: 'Admin Althus', email: 'admin@althus.com', initials: 'AA' }` | Dados do usuário no rodapé |
| `onLogout` | `() => void` | — | Callback do botão Sair |
| `role` | `'adm' \| 'empresa'` | `'adm'` | Filtra itens do menu |
| `theme` | `'dark' \| 'light'` | `'dark'` | Tema atual — controla ícone Sun/Moon |
| `onThemeToggle` | `() => void` | — | Callback do botão de alternância de tema |
| `notificationCount` | `number` | `0` | Número no badge do sininho. 0 = sem badge |

**Itens de navegação padrão:**

| ID | Label | Ícone Lucide | Visível para |
|----|-------|-------------|-------------|
| `dashboard` | Dashboard | `LayoutDashboard` | adm + empresa |
| `eventos` | Eventos | `CalendarCheck` | adm + empresa |
| `usuarios` | Usuários | `User` | somente adm |
| `profissionais` | Profissionais | `ContactRound` | somente adm |
| `clientes` | Clientes | `Building2` | somente adm |
| `pesquisa` | Pesquisa | `FileText` | adm + empresa |

**Nota:** Usa `Logo`, `LogoSymbol` e `NotificationBadge` internamente.

**Bottom area:** O rodapé da sidebar tem um `iconRow` com 3 botões redondos (`.iconBtn`): tema, configurações e notificações. O de notificações usa `NotificationBadge`. Ao clicar em configurações, chama `onNavClick?.('configuracoes')`.

**Aviso CSS (HTML standalone):** Os seletores de largura em `Sidebar.module.css` são **`.sidebar.open`** e **`.sidebar.closed`** (compostos com `.sidebar`) — não são seletores nus `.open`/`.closed`. Isso evita conflito com o Accordion, que também usa a classe `.open` em seus itens. Nunca reverter para seletores nus.

**`.iconRow` collapsed:** Quando sidebar está fechada (`.sidebar.closed`), o `iconRow` muda para `flex-direction: column`, empilhando os 3 ícones verticalmente. Isso está em `Sidebar.module.css` e se aplica automaticamente ao HTML standalone.

```tsx
const [open, setOpen] = useState(true);
const [active, setActive] = useState('dashboard');

<Sidebar
  open={open}
  onToggle={() => setOpen(o => !o)}
  activeItem={active}
  onNavClick={setActive}
  role="adm"
/>
```

---

### Table
**Import:** `import { Table, StatusBadge, type TableColumn } from '../components/Table/Table'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título do card acima da tabela |
| `subtitle` | `string` | Subtítulo/contagem |
| `columns` | `TableColumn<T>[]` | Definição das colunas |
| `rows` | `T[]` | Dados |
| `loading` | `boolean` | Estado de carregamento |
| `emptyMessage` | `string` | Mensagem quando sem dados |
| `onSort` | `(key) => void` | Handler de ordenação |
| `sortKey` / `sortDir` | `keyof T / 'asc' \| 'desc'` | Estado da ordenação |

**Tipos de coluna (`type`):**

| Tipo | Comportamento |
|------|--------------|
| `'text'` (padrão) | Texto simples |
| `'badge'` | `StatusBadge` — requer `statusMap` |
| `'avatar'` | `<img>` com estilo de avatar |
| `'toggle'` | Usa componente `Toggle` interno — requer `onToggle` |
| `'actions'` | Botões de ação — requer `actionItems` |
| `'link'` | Link clicável — aceita `getHref` ou `onLinkClick` |

**StatusBadge — status disponíveis:** `success | error | warning | info`

```tsx
const statusMap = {
  active:   { label: 'Ativo',   status: 'success' as const },
  inactive: { label: 'Inativo', status: 'error'   as const },
};

const columns: TableColumn<MyType>[] = [
  { key: 'name',   label: 'Nome',   sortable: true },
  { key: 'status', label: 'Status', type: 'badge', statusMap },
  { key: 'active', label: 'Ativo',  type: 'toggle', onToggle: (row, val) => {} },
  {
    key: 'name', label: 'Ação', type: 'actions', width: 80,
    actionItems: [
      { icon: <Pencil size={14} />, label: 'Editar', onClick: (r) => {} },
      { icon: <Trash2 size={14} />, label: 'Remover', onClick: (r) => {}, danger: true },
    ],
  },
];

<Table title="Usuários" columns={columns} rows={data} emptyMessage="Nenhum usuário." />
```

---

### AuthCard
**Import:** `import { AuthCard } from '../components/AuthCard/AuthCard'`

Container de tela inteira para fluxos de autenticação. Fundo escuro com blobs decorativos da brand, logo centralizada e card com glass effect. Usado em todas as telas de auth.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título principal do card |
| `description` | `string` | Subtítulo/instrução (opcional) |
| `children` | `ReactNode` | Conteúdo do formulário |

```tsx
<AuthCard title="Crie sua senha" description="Defina uma senha segura para acessar o painel.">
  <Input label="Nova senha" type="password" placeholder="••••••••" />
  <Input label="Confirmar senha" type="password" placeholder="••••••••" />
  <Button style={{ width: '100%' }}>Criar senha</Button>
</AuthCard>
```

---

### PasswordRequirements
**Import:** `import { PasswordRequirements } from '../components/PasswordRequirements/PasswordRequirements'`

Checklist visual de requisitos de senha. Reage em tempo real ao valor digitado. Usado abaixo do campo de senha em fluxos de criação/redefinição.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `value` | `string` | Valor do campo de senha — estados computados internamente |

Estados por requisito: `null` (neutro, bullet) · `false` (erro, × vermelho) · `true` (sucesso, ✓ verde)  
Título muda de cor: vermelho se algum requisito falhou, verde se todos cumpridos.

Requisitos verificados: mínimo 8 caracteres · letra maiúscula · letra minúscula · número · símbolo (!@,#)

```tsx
const [senha, setSenha] = useState('');
<Input label="Nova senha" toggleable value={senha} onChange={e => setSenha(e.target.value)} />
<PasswordRequirements value={senha} />
```

---

### PasswordStrength
**Import:** `import { PasswordStrength } from '../components/PasswordStrength/PasswordStrength'`

Indicador visual de força de senha com 4 barras coloridas + label. Usado abaixo de campos `toggleable` em fluxos de criação/redefinição de senha.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `value` | `string` | Valor digitado no campo de senha — score computado internamente |

Score: `length≥8` +1 · `maiúscula` +1 · `número` +1 · `especial` +1  
Labels: Fraca / Média / Boa / Forte. Cores: erro / brand / sucesso.

```tsx
const [senha, setSenha] = useState('');
<Input label="Nova senha" toggleable value={senha} onChange={e => setSenha(e.target.value)} />
<PasswordStrength value={senha} />
```

---

### Divider
**Import:** `import { Divider } from '../components/Divider/Divider'`

Separador horizontal. Sem props. Usa `--color-border-glass` (rgba translúcido — ≈ `#ffffff21` dark / `#00000015` light) com `margin: 0 var(--spacing-xl)` para inset dentro de cards.

```tsx
<Divider />
```

---

### AppHeader
**Import:** `import { AppHeader } from '../components/AppHeader/AppHeader'`

Sem props. Header da área pública (beneficiário/profissional). Logo centralizada, sticky, com sombra sutil.

```tsx
<AppHeader />
```

---

### Feedback
**Import:** `import { Feedback } from '../components/Feedback/Feedback'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | Tipo do alerta |
| `message` | `string` | Mensagem principal |
| `title` | `string` | Título opcional |
| `dismissible` | `boolean` | Exibe botão de fechar |

```tsx
<Feedback type="error" title="Erro de autenticação" message="Credenciais inválidas." />
<Feedback type="success" message="Dados salvos com sucesso." />
```

---

### Dialog
**Import:** `import { Dialog } from '../components/Dialog/Dialog'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | — | Visibilidade |
| `onClose` | `() => void` | — | Callback de fechar |
| `title` | `string` | — | Título do dialog |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Largura |
| `actions` | `ReactNode` | — | Botões no rodapé |
| `children` | `ReactNode` | — | Conteúdo |

```tsx
<Dialog open={open} onClose={() => setOpen(false)} title="Confirmar exclusão" size="sm"
  actions={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
  </>}>
  <p>Esta ação não pode ser desfeita.</p>
</Dialog>
```

**HTML standalone — classes:**

> ⚠️ As classes internas usam prefixo `dialog` para evitar conflito com `Sidebar.module.css` (que define `.body` globalmente).

| Classe | Descrição |
|--------|-----------|
| `.dialogOverlay` | Backdrop fixo `inset: 0`, centraliza o dialog |
| `.dialog` | Container do modal (fundo, sombra, border-radius) |
| `.sm` / `.md` / `.lg` | Largura: 360px / 540px / 720px |
| `.dialogHeader` | Barra de título + botão fechar |
| `.dialogTitle` | Texto do título |
| `.dialogCloseBtn` | Botão X |
| `.dialogBody` | Conteúdo scrollável |
| `.dialogFooter` | Rodapé com ações (justify: flex-end) |

**Abrir/fechar via JS:** usar `style="display:none"` por padrão e `style.display = 'flex'` para abrir.

```html
<link rel="stylesheet" href="../storybook/src/components/Dialog/Dialog.module.css" />

<div class="dialogOverlay" id="meu-dialog" style="display:none;" onclick="dialogClose()">
  <div class="dialog md" onclick="event.stopPropagation()" role="dialog" aria-modal="true">
    <div class="dialogHeader">
      <span class="dialogTitle">Título do dialog</span>
      <button class="dialogCloseBtn" onclick="dialogClose()" aria-label="Fechar" type="button">
        <i data-lucide="x" width="16" height="16"></i>
      </button>
    </div>
    <div class="dialogBody">
      <!-- conteúdo / campos de formulário -->
    </div>
    <div class="dialogFooter">
      <button class="btn ghost" type="button" onclick="dialogClose()">Cancelar</button>
      <button class="btn primary" type="button">Salvar</button>
    </div>
  </div>
</div>

<script>
  function dialogOpen()  { document.getElementById('meu-dialog').style.display = 'flex'; }
  function dialogClose() { document.getElementById('meu-dialog').style.display = 'none'; }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') dialogClose(); });
</script>
```

**Dialog de confirmação de exclusão (padrão):**
```html
<div class="dialogOverlay" id="del-dialog" style="display:none;" onclick="delDialogClose()">
  <div class="dialog sm" onclick="event.stopPropagation()" role="dialog" aria-modal="true">
    <div class="dialogHeader">
      <span class="dialogTitle">Excluir [entidade]</span>
      <button class="dialogCloseBtn" onclick="delDialogClose()" aria-label="Fechar" type="button">
        <i data-lucide="x" width="16" height="16"></i>
      </button>
    </div>
    <div class="dialogBody">
      <p style="margin:0;color:var(--color-text-secondary);">
        Tem certeza que deseja excluir <strong id="del-nome"></strong>? Esta ação não pode ser desfeita.
      </p>
    </div>
    <div class="dialogFooter">
      <button class="btn ghost" type="button" onclick="delDialogClose()">Cancelar</button>
      <button class="btn destructive" type="button" onclick="delDialogClose()">Excluir</button>
    </div>
  </div>
</div>
```

---

### Dropdown
**Import:** `import { Dropdown } from '../components/Dropdown/Dropdown'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `options` | `{ label: string; value: string }[]` | Lista de opções |
| `value` | `string` | Valor selecionado |
| `onChange` | `(value: string) => void` | Callback de seleção |
| `label` | `string` | Label acima |
| `placeholder` | `string` | Placeholder |
| `disabled` | `boolean` | Desabilita |
| `error` | `string` | Mensagem de erro |

```tsx
const [val, setVal] = useState('');
<Dropdown options={options} value={val} onChange={setVal} label="Status" placeholder="Selecione..." />
```

---

### Sheet
**Import:** `import { Sheet } from '../components/Sheet/Sheet'`

Painel deslizante da direita (right drawer). Overlay com backdrop escurecido, animação `translateX`, scroll interno, Escape para fechar.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | — | Visibilidade |
| `onClose` | `() => void` | — | Callback de fechar (botão X, overlay, Escape) |
| `title` | `string` | — | Título no header |
| `children` | `ReactNode` | — | Conteúdo scrollável |
| `footer` | `ReactNode` | — | Ações no rodapé (opcional) |
| `width` | `number \| string` | `400` | Largura do painel |

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Notificações</Button>

<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="Notificações"
  width={420}
  footer={<Button variant="ghost">Marcar todas como lidas</Button>}
>
  {/* conteúdo */}
</Sheet>
```

**HTML standalone — classes:**

| Classe | Descrição |
|--------|-----------|
| `.sheetOverlay` | Backdrop fixo `inset: 0`, fundo escurecido |
| `.sheetOverlay.sheetOpen` | Estado aberto (fundo visível, pointer-events ativo) |
| `.sheetPanel` | Painel lateral direito (`translateX(100%)` → `translateX(0)`) |
| `.sheetHeader` | Barra de título + botão fechar |
| `.sheetTitle` | Texto do título |
| `.sheetClose` | Botão X |
| `.sheetBody` | Área de conteúdo scrollável |
| `.sheetFooter` | Rodapé com ações (opcional) |

```html
<link rel="stylesheet" href="../storybook/src/components/Sheet/Sheet.module.css" />

<div class="sheetOverlay" id="notif-sheet" onclick="closeSheet()">
  <aside class="sheetPanel" onclick="event.stopPropagation()">
    <div class="sheetHeader">
      <span class="sheetTitle">Notificações</span>
      <button class="sheetClose" onclick="closeSheet()" aria-label="Fechar">
        <i data-lucide="x" width="16" height="16"></i>
      </button>
    </div>
    <div class="sheetBody"><!-- conteúdo --></div>
    <div class="sheetFooter"><!-- ações --></div>
  </aside>
</div>

<script>
  function openSheet()  { document.getElementById('notif-sheet').classList.add('sheetOpen'); }
  function closeSheet() { document.getElementById('notif-sheet').classList.remove('sheetOpen'); }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
</script>
```

---

### NotificationBadge
**Import:** `import { NotificationBadge } from '../components/NotificationBadge/NotificationBadge'`

Envolve qualquer elemento (ícone, botão) e sobrepõe um badge vermelho com contagem de notificações. Badge oculto quando `count === 0`. Acima de `max`, exibe `max+`.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `count` | `number` | — | Número de notificações. 0 = badge oculto |
| `max` | `number` | `9` | Limite antes de exibir "+" (ex: `9+`) |
| `children` | `ReactNode` | — | Elemento envolvido (ícone, botão) |

**Tokens usados:** `--color-action-error` (fundo), `--color-gray-white` (texto), `--color-bg-default` (ring de separação via `box-shadow`).

```tsx
<NotificationBadge count={3}>
  <button className={styles.iconBtn} aria-label="3 notificações">
    <Bell size={16} />
  </button>
</NotificationBadge>

{/* Acima do limite */}
<NotificationBadge count={12} max={9}>  {/* exibe "9+" */}
  <button>...</button>
</NotificationBadge>

{/* Sem badge */}
<NotificationBadge count={0}>
  <button>...</button>
</NotificationBadge>
```

**HTML standalone:** use `.notifBadge` dentro de um `.iconBtn` (position: relative) do `Sidebar.module.css`:
```html
<button class="iconBtn" aria-label="3 notificações">
  <i data-lucide="bell" width="16" height="16"></i>
  <span class="notifBadge">3</span>
</button>
```

---

### Accordion
**Import:** `import { Accordion } from '../components/Accordion/Accordion'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `items` | `{ title: string; content: ReactNode }[]` | Itens |
| `defaultOpenIndex` | `number[]` | Índices abertos por padrão |
| `allowMultiple` | `boolean` | Permite múltiplos abertos ao mesmo tempo |

```tsx
<Accordion items={[{ title: 'Pergunta', content: 'Resposta...' }]} allowMultiple />
```

**CSS classes (para HTML standalone):**

| Classe | Descrição |
|--------|-----------|
| `.accordion` | Container flex coluna |
| `.item` | Um item do accordion (sem `.open` = fechado) |
| `.item.open` | Item aberto — revela `.panel` e gira `.chevron` |
| `.trigger` | Botão do cabeçalho (width: 100%) |
| `.chevron` | Ícone rotacionado quando aberto |
| `.panel` | Área colapsável (`max-height: 0` → `1000px`) |
| `.content` | Padding interno do conteúdo |

**Nota:** A classe `.open` é adicionada ao `.item` via JS. Não conflita com o Sidebar porque `Sidebar.module.css` usa `.sidebar.open` (seletor composto).

```html
<link rel="stylesheet" href="../storybook/src/components/Accordion/Accordion.module.css" />

<div class="accordion">
  <div class="item">
    <button class="trigger" type="button">
      Pergunta
      <span class="chevron"><i data-lucide="chevron-down" width="16" height="16"></i></span>
    </button>
    <div class="panel">
      <div class="content">Resposta detalhada aqui.</div>
    </div>
  </div>
</div>

<script>
  document.querySelectorAll('.accordion .trigger').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.item').classList.toggle('open'));
  });
</script>
```

---

### Checkbox
**Import:** `import { Checkbox } from '../components/Checkbox/Checkbox'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Label ao lado |
| `checked` | `boolean` | Estado marcado |
| `onChange` | `() => void` | Callback |
| `indeterminate` | `boolean` | Estado intermediário |
| `disabled` | `boolean` | Desabilita |

---

### RadioButton
**Import:** `import { RadioButton } from '../components/RadioButton/RadioButton'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `options` | `{ label: string; value: string }[]` | — | Opções |
| `name` | `string` | — | Nome do grupo |
| `value` | `string` | — | Valor selecionado |
| `onChange` | `(value: string) => void` | — | Callback |
| `label` | `string` | — | Label do grupo |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Direção |
| `disabled` | `boolean` | — | Desabilita todo o grupo |

---

### Tab
**Import:** `import { Tab } from '../components/Tab/Tab'`
**CSS:** `../storybook/src/components/Tab/Tab.module.css`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `tabs` | `{ label: string; content: ReactNode }[]` | Abas |
| `defaultIndex` | `number` | Aba ativa inicial |

**CSS classes (para HTML standalone):**

| Classe | Descrição |
|--------|-----------|
| `.tabWrapper` | Container raiz |
| `.tabList` | Linha de botões (flex, border-bottom, scroll horizontal oculto) |
| `.tabBtn` | Botão de aba inativo |
| `.tabBtnActive` | Botão de aba ativo (cor brand + underline) |
| `.tabPanel` | Área de conteúdo da aba ativa |

**Nota:** Classes prefixadas com `tab` para evitar conflito com `.wrapper` do Dropdown/Input e `.list`/`.panel` de outros componentes. Pode ser linkado diretamente sem conflito.

```html
<link rel="stylesheet" href="../storybook/src/components/Tab/Tab.module.css" />

<div class="tabWrapper">
  <div class="tabList" role="tablist">
    <button class="tabBtn tabBtnActive" role="tab" aria-selected="true">Aba 1</button>
    <button class="tabBtn" role="tab" aria-selected="false">Aba 2</button>
  </div>
  <div class="tabPanel" role="tabpanel">Conteúdo da aba ativa</div>
</div>
```

---

### Toggle
**Import:** `import { Toggle } from '../components/Toggle/Toggle'`
**CSS:** `../storybook/src/components/Toggle/Toggle.module.css`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `checked` | `boolean` | — | Estado ligado/desligado |
| `onChange` | `ChangeEventHandler` | — | Callback |
| `label` | `string` | — | Label ao lado |
| `size` | `'md' \| 'sm'` | `'md'` | Tamanho |
| `disabled` | `boolean` | — | Desabilita |

**CSS classes (para HTML standalone):**

| Classe | Descrição |
|--------|-----------|
| `.toggleWrapper` | `<label>` container raiz |
| `.toggleInput` | `<input type="checkbox">` visualmente oculto |
| `.toggleTrack` | Trilho do toggle |
| `.toggleThumb` | Bolinha deslizante |
| `.toggleLabel` | Texto ao lado |
| `.toggleChecked` | Estado ativo (adicionar no wrapper via JS) |
| `.toggleSm` | Tamanho pequeno |
| `.toggleDisabled` | Estado desabilitado |

**Nota:** Estado ativo funciona de dois modos: classe `.toggleChecked` no wrapper (React) OU CSS `:has(input:checked)` automático (HTML standalone — sem JS extra).

```html
<link rel="stylesheet" href="../storybook/src/components/Toggle/Toggle.module.css" />

<label class="toggleWrapper" for="meu-toggle" style="margin-top: var(--spacing-xs);">
  <input type="checkbox" class="toggleInput" id="meu-toggle" checked />
  <span class="toggleTrack"><span class="toggleThumb"></span></span>
  <span class="toggleLabel" id="meu-toggle-label">Ativa</span>
</label>
```

---

### Tooltip
**Import:** `import { Tooltip } from '../components/Tooltip/Tooltip'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `content` | `string` | — | Texto do tooltip |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posição |
| `children` | `ReactNode` | — | Elemento alvo |

```tsx
<Tooltip content="Deletar permanentemente" placement="top">
  <Button variant="destructive" iconOnly iconLeft={<Trash size={16} />} aria-label="Excluir" />
</Tooltip>
```

---

### Breadcrumb
**Import:** `import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `items` | `{ label: string; href?: string; icon?: ReactNode }[]` | Itens do caminho |

O último item é sempre o ativo (sem link).

---

### Logo / LogoSymbol
**Import:** `import { Logo, LogoSymbol } from '../components/Logo/Logo'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho predefinido |
| `width` | `number \| string` | — | Largura customizada (sobrepõe `size`) |

- `Logo` — logotipo completo (texto + símbolo). Widths padrão: sm=80, md=160, lg=240, xl=360
- `LogoSymbol` — só o símbolo "A". Widths padrão: sm=24, md=32, lg=48, xl=64

---

### Avatar
**Import:** `import { Avatar } from '../components/Avatar/Avatar'`

Filho do Sidebar — deve ser criado antes. Foto circular com fallback para iniciais.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `src` | `string` | — | URL da foto |
| `initials` | `string` | — | Iniciais exibidas quando sem foto |
| `size` | `'sm' \| 'md'` | `'md'` | sm=32 px, md=40 px |
| `alt` | `string` | `''` | Alt da imagem |

**Foto padrão para stories:** `./src/placeholder.jpg` (colocar JPG em `Avatar/src/`)

**Nota CSS:** `Table.module.css` usa `.cellAvatar` (não `.avatar`) para evitar conflito em HTML standalone.

```tsx
<Avatar initials="AR" size="md" />
<Avatar src="/fotos/usuario.jpg" alt="Admin Rede" size="md" />
<Avatar initials="AR" size="sm" />
```

---

### Pagination
**Import:** `import { Pagination } from '../components/Pagination/Pagination'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `page` | `number` | Página atual (1-indexed) |
| `pageSize` | `number` | Itens por página |
| `total` | `number` | Total de itens |
| `onChange` | `(page: number) => void` | Callback ao mudar de página |

**Nota CSS:** usa `.paginBtn` e `.paginBtnActive` (não `.btn`) para evitar conflito com Button.module.css em HTML standalone.

```tsx
const [page, setPage] = useState(1);
<Pagination page={page} pageSize={10} total={47} onChange={setPage} />
```

---

### DatePicker
**CSS:** `../storybook/src/components/DatePicker/DatePicker.module.css`

Seletor de intervalo de datas com layout horizontal (calendário à esquerda, controles à direita). Inspirado no Geist Calendar `horizontalLayout`, adaptado com os tokens do Althus.

| Classe | Descrição |
|--------|-----------|
| `.trigger` | Botão pill que abre o popover |
| `.triggerIcon` | Ícone de calendário |
| `.triggerText` | Texto do intervalo selecionado |
| `.triggerPlaceholder` | Texto quando vazio |
| `.triggerClear` | Botão X para limpar |
| `.trigger.open` | Estado aberto (borda focus) |
| `.popoverWrap` | Container `position: relative` |
| `.popover` | Painel absoluto (flex row) |
| `.calPanel` | Painel esquerdo — grade de dias |
| `.calHeader` | Mês + botões nav |
| `.calMonthLabel` | "May 2026" |
| `.calNavBtn` | Seta anterior/próximo |
| `.calGrid` | Grid 7 colunas |
| `.calDayName` | S M T W T F S |
| `.calDay` | Célula de dia |
| `.calDayOutside` | Dia de outro mês (dimmed) |
| `.calDayToday` | Hoje (brand color, bold) |
| `.calDayStart` | Início do range (filled brand) |
| `.calDayEnd` | Fim do range (outlined brand) |
| `.calDayInRange` | Dias dentro do range (bg-brand) |
| `.panelDivider` | Divisória vertical entre painéis |
| `.ctrlPanel` | Painel direito — Start/End/Apply |
| `.ctrlFieldLabel` | Label "Start" / "End" |
| `.ctrlDateInput` | Input de data digitável |
| `.ctrlSpacer` | Flex spacer empurra Apply para baixo |
| `.ctrlApply` | Botão "Apply" brand |
| `.ctrlTzSelect` | Select de timezone |

**HTML standalone — uso:**
```html
<link rel="stylesheet" href="../storybook/src/components/DatePicker/DatePicker.module.css" />

<div class="popoverWrap">
  <button class="trigger open">
    <span class="triggerIcon"><i data-lucide="calendar" width="14" height="14"></i></span>
    <span class="triggerText">22/05/2026 – 31/05/2026</span>
    <button class="triggerClear"><i data-lucide="x" width="12" height="12"></i></button>
  </button>
  <div class="popover">
    <div class="calPanel">...</div>
    <div class="panelDivider"></div>
    <div class="ctrlPanel">...</div>
  </div>
</div>
```

**Notas:**
- `.popover[hidden]` esconde o painel (use JS para alternar o atributo `hidden`)
- O JS de renderização do calendário (navegar meses, selecionar range) deve viver na `<script>` da página HTML
- `.calDayStart` e `.calDayEnd` não devem receber `.calDayInRange`

---

### Card
**CSS:** `../storybook/src/components/Card/Card.module.css`

Container com efeito glass — semi-transparente nos dois temas, deixa os blobs de fundo aparecerem.

| Classe | Descrição |
|--------|-----------|
| `.card` | Glass surface + backdrop-filter blur(16px) + borda glass |

```html
<div class="card">
  <!-- conteúdo -->
</div>
```

**Atenção:** `Table.module.css` também usa `.card` para seu container — não linkar os dois na mesma página.

---

### Timeline
**Import:** `import { Timeline } from '../components/Timeline/Timeline'`
**CSS:** `../storybook/src/components/Timeline/Timeline.module.css`

Linha do tempo vertical com estados visuais. Usado em telas de detalhe para mostrar progressão de eventos (reservas, pedidos, instalações, etc.).

| Prop | Tipo | Descrição |
|------|------|-----------|
| `items` | `TimelineItem[]` | Lista de eventos em ordem cronológica |

**`TimelineItem`:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `label` | `string` | Descrição do evento |
| `time` | `string` (opcional) | Timestamp ou texto de data/hora |
| `status` | `'done' \| 'active' \| 'pending'` | Estado visual do item |

**CSS classes (para HTML standalone):**

| Classe | Descrição |
|--------|-----------|
| `.timeline` | Container flex coluna |
| `.tlItem` | Um evento da linha do tempo |
| `.tlDone` | Estado concluído (ponto verde + conector verde desbotado) |
| `.tlActive` | Estado em andamento (ponto amarelo com glow) |
| `.tlPending` | Estado pendente (ponto outline, conector esmaecido) |
| `.tlVis` | Coluna visual: ponto + conector |
| `.tlDot` | Círculo de estado (12×12 px) |
| `.tlConnector` | Linha vertical entre eventos |
| `.tlContent` | Coluna de texto |
| `.tlLabel` | Texto do evento |
| `.tlTime` | Timestamp abaixo do label (opcional) |

```tsx
<Timeline items={[
  { status: 'done',    label: 'Reserva confirmada',  time: '25/05/2026 às 09:30' },
  { status: 'active',  label: 'Janela iniciada',      time: '25/05/2026 às 16:45' },
  { status: 'pending', label: 'Expiração da janela',  time: 'Previsto 25/05/2026 às 17:00' },
]} />
```

```html
<!-- HTML standalone -->
<link rel="stylesheet" href="../storybook/src/components/Timeline/Timeline.module.css" />

<div class="timeline">
  <div class="tlItem tlDone">
    <div class="tlVis"><div class="tlDot"></div><div class="tlConnector"></div></div>
    <div class="tlContent">
      <div class="tlLabel">Reserva confirmada</div>
      <div class="tlTime">25/05/2026 às 09:30</div>
    </div>
  </div>
  <div class="tlItem tlActive">
    <div class="tlVis"><div class="tlDot"></div><div class="tlConnector"></div></div>
    <div class="tlContent"><div class="tlLabel">Janela iniciada</div></div>
  </div>
  <div class="tlItem tlPending">
    <div class="tlVis"><div class="tlDot"></div><div class="tlConnector"></div></div>
    <div class="tlContent"><div class="tlLabel">Expiração</div></div>
  </div>
</div>
```

**Nota:** O conector do último item some automaticamente via CSS — não precisa de JS.

---

### Chip / ChipGroup
**Import:** `import { Chip, ChipGroup } from '../components/Chip/Chip'`
**CSS:** `../storybook/src/components/Chip/Chip.module.css`

Seletor multi-opção em formato de pílulas. Usa `<input type="checkbox">` oculto com `:has(input:checked)` para estado ativo — sem JS necessário.

| Prop (Chip) | Tipo | Descrição |
|-------------|------|-----------|
| `label` | `string` | Texto do chip |
| `value` | `string` | Valor do checkbox |
| `checked` | `boolean` | Estado marcado |
| `icon` | `ReactNode` | Ícone opcional à esquerda |
| `onChange` | `(value, checked) => void` | Callback |

**CSS classes:**

| Classe | Descrição |
|--------|-----------|
| `.chipGroup` | Container flex-wrap dos chips |
| `.chip` | Pílula `<label>` com checkbox oculto |
| `.chip:has(input:checked)` | Estado ativo — borda brand, fundo brand |
| `.chipIcon` | Wrapper do ícone interno |

```html
<link rel="stylesheet" href="../storybook/src/components/Chip/Chip.module.css" />

<span class="label">Tipos de conectores</span>
<div class="chipGroup">
  <label class="chip"><input type="checkbox" value="ccs2" />CCS2</label>
  <label class="chip"><input type="checkbox" value="ccs1" />CCS1</label>
  <label class="chip"><input type="checkbox" value="tipo2" />Tipo 2</label>
</div>

<!-- Com ícone -->
<div class="chipGroup">
  <label class="chip"><input type="checkbox" checked /><i data-lucide="mail" width="14" height="14"></i>E-mail</label>
  <label class="chip"><input type="checkbox" /><i data-lucide="bell" width="14" height="14"></i>Sistema</label>
</div>
```

---

### DetailCard
**Import:** `import { DetailGrid, DetailCard, TitleRow } from '../components/DetailCard/DetailCard'`
**CSS:** `../storybook/src/components/DetailCard/DetailCard.module.css`

Layout padrão de telas de detalhe (visualizar entidade). Grid de 2 colunas com cards glass que contêm pares chave–valor. Sempre usar em conjunto com `Card.module.css` (glass surface).

| Classe | Descrição |
|--------|-----------|
| `.titleRow` | Linha de cabeçalho: `h1` + badge de status lado a lado |
| `.detailGrid` | Grid externo 2 colunas (`1fr 1fr`) |
| `.detailCard` | Card que ocupa 1 coluna (só padding — glass vem do `.card`) |
| `.detailCardFull` | Card que ocupa as 2 colunas |
| `.cardTitle` | Título interno do card (display, sm, semibold) |
| `.infoGrid` | Grid `auto 1fr` para os pares chave–valor |
| `.infoLabel` | Label (xs, uppercase, terciário) |
| `.infoValue` | Valor padrão (sm, primário) |
| `.infoValueMono` | Valor em fonte mono (código, serial) |
| `.infoValueDim` | Valor esmaecido (campo vazio / N/A) |
| `.infoValueStrong` | Valor em destaque (total, valor financeiro) — md, semibold, brand |
| `.cardDivider` | Divisor horizontal dentro do infoGrid (ocupa as 2 colunas) |

```html
<link rel="stylesheet" href="../storybook/src/components/Card/Card.module.css" />
<link rel="stylesheet" href="../storybook/src/components/DetailCard/DetailCard.module.css" />

<!-- Cabeçalho da página -->
<div class="titleRow">
  <h1 class="pageTitle">ALT-001</h1>
  <span class="badge" data-status="success"><span class="badgeDot"></span>Ativo</span>
</div>

<!-- Grid de cards -->
<div class="detailGrid">
  <div class="card detailCard">
    <h2 class="cardTitle">Informações</h2>
    <div class="infoGrid">
      <span class="infoLabel">Serial</span>
      <span class="infoValueMono">ALT-001</span>

      <span class="infoLabel">Status</span>
      <span class="infoValue">Ativo</span>
    </div>
  </div>

  <div class="card detailCardFull">
    <h2 class="cardTitle">Resumo financeiro</h2>
    <div class="infoGrid">
      <span class="infoLabel">Total</span>
      <span class="infoValueStrong">R$ 1.280,00</span>

      <span class="infoLabel">Observação</span>
      <span class="infoValueDim">—</span>
    </div>
  </div>
</div>
```

**Nota:** `.titleRow` não tem `h1` embutido — usar o `h1.pageTitle` da página normalmente.

---

### Skeleton
**Import:** `import { Skeleton } from '../components/Skeleton/Skeleton'`

Bloco de carregamento com efeito shimmer (faixa deslizante). Use para substituir qualquer elemento enquanto os dados carregam.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `width` | `string \| number` | — | Largura. Ex: `200`, `'100%'`, `'12rem'` |
| `height` | `string \| number` | `16px` | Altura. Ex: `20`, `'1.5rem'` |
| `borderRadius` | `string` | `--radius-xs` | Override de raio. Ex: `'50%'` para círculo |
| `className` | `string` | — | Classe extra |

**CSS:** `../storybook/src/components/Skeleton/Skeleton.module.css`  
**Classe:** `.skeleton`

```tsx
{/* Linha de texto */}
<Skeleton width="60%" height={14} />

{/* Avatar circular */}
<Skeleton width={40} height={40} borderRadius="50%" />

{/* Área de gráfico */}
<Skeleton width="100%" height={220} />

{/* Cartão de métrica */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Skeleton width={36} height={36} borderRadius="var(--radius-sm)" />
  <Skeleton height={12} width="65%" />
  <Skeleton height={28} width="50%" />
</div>
```

**HTML standalone:**
```html
<link rel="stylesheet" href="../storybook/src/components/Skeleton/Skeleton.module.css" />
<span class="skeleton" style="width:200px;height:16px;"></span>
<span class="skeleton" style="width:40px;height:40px;border-radius:50%;"></span>
```

**Notas:**
- `aria-hidden="true"` embutido — não precisa adicionar manualmente
- O efeito shimmer adapta automaticamente ao tema claro/escuro via tokens
- `min-height: var(--spacing-md)` garante visibilidade mesmo sem `height`

---

### Background
**Import:** `import { Background } from '../components/Background/Background'`

Wrapper que renderiza os dois blobs decorativos de fundo (gradientes radiais desfocados). Qualquer tela interna que use os blobs chama este componente — ou, em HTML, linka `Background.module.css` e usa as classes diretamente.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `children` | `ReactNode` | Conteúdo da página (deve ter `position: relative; z-index: 1` para sobrepor os blobs) |
| `className` | `string` | Classe extra para o wrapper |

**CSS classes (para HTML standalone):**
- `.bgWrapper` — `position: relative` no container pai
- `.blob1` — blob superior direito (520 × 520 px, `--color-blob-1`, blur 120 px)
- `.blob2` — blob inferior esquerdo (400 × 400 px, `--color-blob-2`, blur 100 px)

```tsx
/* React */
<Background className="main">
  <div style={{ position: 'relative', zIndex: 1 }}>conteúdo</div>
</Background>
```

```html
<!-- HTML standalone -->
<link rel="stylesheet" href="../storybook/src/components/Background/Background.module.css" />

<main class="main bgWrapper">
  <div class="blob1"></div>
  <div class="blob2"></div>
  <!-- conteúdo com position: relative; z-index: 1 -->
</main>
```

---

### MetricCard
**Import:** `import { MetricCard } from '../components/MetricCard/MetricCard'`

Card de KPI para dashboards. Exibe ícone Lucide, label descritivo, valor principal e variação opcional vs. período anterior.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `icon` | `LucideIcon` | Ícone do componente Lucide |
| `label` | `string` | Descrição do indicador |
| `value` | `string` | Valor formatado (ex: `"1.847"`, `"R$ 28.430"`) |
| `trend` | `{ value: string; direction: 'up' \| 'down' \| 'neutral' }` | Variação opcional |

```tsx
<MetricCard
  icon={Zap}
  label="Total de carregadores habilitados"
  value="142"
  trend={{ value: '+8', direction: 'up' }}
/>
```

Grid de 3 colunas típico:
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
  <MetricCard icon={Zap} label="Carregadores" value="142" trend={{ value: '+8', direction: 'up' }} />
  <MetricCard icon={RotateCcw} label="Recargas" value="1.847" trend={{ value: '+12%', direction: 'up' }} />
  <MetricCard icon={CircleDollarSign} label="Faturamento" value="R$ 28.430" trend={{ value: '-3%', direction: 'down' }} />
</div>
```

---

### LineChart
**Import:** `import { LineChart } from '../components/LineChart/LineChart'`

Gráfico de linha com ApexCharts. Suporta múltiplas séries, formatação customizada do eixo Y e dark mode automático.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `series` | `{ name: string; data: number[] }[]` | — | Séries de dados |
| `categories` | `string[]` | — | Labels do eixo X |
| `title` | `string` | — | Título opcional acima do gráfico |
| `height` | `number` | `280` | Altura em px |
| `yFormatter` | `(val: number) => string` | `String(v)` | Formatação dos valores do eixo Y e tooltip |
| `colors` | `string[]` | `['#7c3aed', '#3b82f6']` | Cores das linhas |

```tsx
<LineChart
  title="Recargas no período"
  series={[{ name: 'Recargas', data: [42, 58, 73, 61, 88] }]}
  categories={['01/05', '08/05', '15/05', '22/05', '29/05']}
/>
```

---

### DonutChart
**Import:** `import { DonutChart } from '../components/DonutChart/DonutChart'`

Gráfico de rosca com ApexCharts. Total centralizado automático, legenda na base, dark mode automático.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `series` | `number[]` | — | Valores de cada fatia |
| `labels` | `string[]` | — | Labels de cada fatia |
| `title` | `string` | — | Título opcional |
| `height` | `number` | `280` | Altura em px |
| `colors` | `string[]` | `['#7c3aed', '#6b7280', '#f59e0b', '#3b82f6']` | Cores das fatias |
| `totalLabel` | `string` | `'Total'` | Label do total centralizado |

```tsx
<DonutChart
  title="Status dos carregadores"
  series={[98, 24, 12, 8]}
  labels={['Ativo', 'Inativo', 'Em manutenção', 'Instalando']}
/>
```

---

## Tokens de Design

### Importação
```css
/* Já importado globalmente via src/tokens/tokens.css */
/* Carregado em src/main.tsx — disponível em toda a aplicação */
```

### Tokens semânticos (preferir sempre)

#### Texto
| Token | Dark | Light |
|-------|------|-------|
| `--color-text-primary` | gray-50 | gray-950 |
| `--color-text-secondary` | gray-300 | gray-700 |
| `--color-text-tertiary` | gray-400 | gray-500 |
| `--color-text-disabled` | gray-600 | gray-400 |
| `--color-text-brand` | brand-300 | brand-600 |
| `--color-text-link` | blue-300 | blue-600 |
| `--color-text-error` | red-300 | red-600 |
| `--color-text-success` | green-300 | green-700 |
| `--color-text-warning` | yellow-300 | yellow-700 |

#### Background
| Token | Dark | Light |
|-------|------|-------|
| `--color-bg-default` | gray-black | gray-50 |
| `--color-bg-subtle` | gray-950 | gray-100 |
| `--color-bg-surface` | gray-900 | white |
| `--color-bg-elevated` | gray-800 | white |
| `--color-bg-disabled` | gray-700 | gray-200 |
| `--color-bg-brand` | brand-950 | brand-50 |
| `--color-bg-brand-strong` | brand-500 | brand-500 |

#### Borda
| Token | Dark | Light |
|-------|------|-------|
| `--color-border-default` | gray-700 | gray-300 |
| `--color-border-subtle` | gray-800 | gray-100 |
| `--color-border-muted` | gray-600 | gray-200 |
| `--color-border-focus` | brand-400 | brand-500 |
| `--color-border-glass` | rgba(255,255,255,0.13) | rgba(0,0,0,0.08) |

#### Ação
| Token | Uso |
|-------|-----|
| `--color-action-primary` / `-hover` / `-pressed` | Botão primário (brand) |
| `--color-action-secondary` / `-hover` / `-pressed` | Botão secundário (blue) |
| `--color-action-error` / `-hover` / `-pressed` | Destrutivo (red) |
| `--color-action-warning` / `-hover` / `-pressed` | Aviso (yellow) |
| `--color-action-success` / `-hover` / `-pressed` | Sucesso (green) |

#### Status (para badges e feedbacks)
```css
--color-status-success-bg / -fg
--color-status-error-bg / -fg
--color-status-warning-bg / -fg
--color-status-info-bg / -fg
--color-status-disabled-bg / -fg
--color-status-cyan-bg / -fg
--color-status-purple-bg / -fg
```

#### Glass / Sidebar
```css
--color-glass-surface     /* fundo translúcido */
--color-glass-border      /* borda translúcida */
--color-sidebar-bg        /* fundo da sidebar */
--color-nav-idle          /* cor dos ícones inativos */
--color-nav-active-bg     /* bg do item ativo */
--color-nav-active-text   /* texto do item ativo */
--color-nav-hover-bg      /* bg hover */
--color-table-bg / -head-bg / -border / -row-hover
```

#### Gradiente e glow brand
```css
--gradient-brand           /* gradiente diagonal brand-400 → brand-600 */
--shadow-glow-sm / -md / -lg  /* glow vermelho brand */
--shadow-highlight         /* inset brilho sutil */
```

---

### Tipografia
| Token | Valor |
|-------|-------|
| `--font-display` | Inter |
| `--font-body` | Inter |
| `--font-mono` | JetBrains Mono / Fira Code |

#### Tamanhos
`--font-size-xs` (12px) → `--font-size-sm` (14px) → `--font-size-md` (16px) → `--font-size-lg` (20px) → `--font-size-xl` (24px) → `--font-size-2xl` (28px) → `--font-size-3xl` (32px) → ... → `--font-size-9xl` (96px)

#### Pesos
`--font-weight-light` (300) · `--font-weight-regular` (400) · `--font-weight-medium` (500) · `--font-weight-semibold` (600) · `--font-weight-bold` (700) · `--font-weight-heavy` (800)

#### Line-height
`--line-height-tight` (1.2) · `--line-height-snug` (1.375) · `--line-height-normal` (1.5) · `--line-height-relaxed` (1.625) · `--line-height-loose` (2)

---

### Espaçamento
`--spacing-2xs` (2px) · `--spacing-xs` (4px) · `--spacing-sm` (8px) · `--spacing-md` (16px) · `--spacing-lg` (24px) · `--spacing-xl` (32px) · `--spacing-2xl` (48px) · `--spacing-3xl` (64px) · `--spacing-4xl` (96px) · `--spacing-5xl` (128px) · `--spacing-6xl` (160px) · `--spacing-7xl` (200px)

---

### Border Radius
`--radius-none` (0) · `--radius-xs` (4px) · `--radius-sm` (8px) · `--radius-md` (16px) · `--radius-lg` (24px) · `--radius-xl` (32px) · `--radius-2xl` (48px) · `--radius-full` (9999px)

---

### Border Width
`--border-width-hairline` (0.5px) · `--border-width-thin` (1px) · `--border-width-medium` (2px) · `--border-width-thick` (4px)

---

### Sombras
`--shadow-xs` · `--shadow-sm` · `--shadow-md` · `--shadow-lg` · `--shadow-xl` · `--shadow-2xl` · `--shadow-inner`

---

### Opacidade
`--opacity-0` (0) · `--opacity-5` (0.05) · `--opacity-10` (0.10) · `--opacity-20` · `--opacity-25` · `--opacity-50` · `--opacity-75` · `--opacity-90` · `--opacity-100` (1)

---

### Motion / Transições
```css
--transition-fast:   150ms ease
--transition-normal: 250ms ease
--transition-slow:   400ms ease

--easing-standard: cubic-bezier(0.3, 0.07, 0.34, 1)
--easing-entrance:  cubic-bezier(0, 0, 0.34, 1)
--easing-exit:      cubic-bezier(0.3, 0.07, 1, 1)
```

---

## Padrões de composição observados

### Layout de página interna (área admin)
```tsx
<div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
  <Sidebar open={open} onToggle={...} activeItem={active} onNavClick={...} />
  <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    {/* Page header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px 0' }}>
      <div>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--color-text-primary)' }}>Título</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--color-text-tertiary)' }}>Subtítulo</p>
      </div>
      <Button iconLeft={<PlusIcon size={16} />}>Ação primária</Button>
    </div>

    {/* Toolbar (busca/filtros) */}
    <div style={{ padding: '20px 32px 0' }}>
      <Input iconLeft={<Search size={16} />} placeholder="Buscar..." style={{ maxWidth: 320 }} />
    </div>

    {/* Conteúdo principal */}
    <div style={{ flex: 1, overflow: 'auto', padding: '16px 32px 32px' }}>
      <Table columns={...} rows={...} />
    </div>
  </main>
</div>
```

### Card de métricas
```tsx
<div style={{
  background: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-subtle)',
  borderRadius: 12, padding: '20px 24px',
}}>
  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>Label</div>
  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Valor</div>
</div>
```

### Grid de cards (4 colunas)
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
  {/* cards */}
</div>
```

---


## Telas HTML standalone (dashboard-rede, dashboard-adm, app)

Telas fora do Storybook são arquivos `.html` servidos via HTTP server. **Regra de CSS:**

1. **Nunca embutir CSS de tokens ou componentes inline** — linkar os arquivos do Storybook diretamente
2. `tokens.css` e os `.module.css` são linkados por caminho relativo — o servidor HTTP resolve
3. CSS `<style>` inline apenas para layout/estilo exclusivo daquela tela

```html
<link rel="stylesheet" href="../storybook/src/tokens/tokens.css" />
<link rel="stylesheet" href="../storybook/src/components/Button/Button.module.css" />
<!-- um link por componente usado na tela -->
```

Mudou o estilo de um componente → todas as telas atualizam automaticamente.

---

## Convenções do projeto

- **CSS Modules** para estilo de componentes (`.module.css` por componente)
- **Importações relativas** entre componentes: `'../ComponentName/ComponentName'`
- **Todos os ícones** via Lucide React — nunca SVG inline, nunca outro lib
- **Componentes são funções nomeadas** (`export function Button...`), não default exports
- **Tipos exportados** junto com o componente no mesmo arquivo
- **Stories** em `ComponentName.stories.tsx` ao lado do componente
- **Novas telas** como stories em `src/stories/NomeDaTela.stories.tsx`
