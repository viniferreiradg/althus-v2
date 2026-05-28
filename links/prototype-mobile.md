---
name: prototype-mobile
description: >
  Use this skill whenever the user wants to create high-fidelity mobile HTML screens from a
  design system, build or update a clickable mobile prototype with transitions, create or update
  mobile storybook components, or update prototipo.html navigation.

  Trigger on: "criar tela mobile", "criar tela do app", "criar componente mobile", "protótipo
  mobile", "screen mobile", "adicionar tela", "atualizar componente mobile", requests to build
  any mobile .html screen, or any mention of using or extending the mobile component library.
---

# prototype-mobile

Turns a design system into a living high-fidelity mobile prototype. Every screen exists as a
standalone HTML file that works independently, and as a minimal iframe wrapper (partial) used
by the router inside a phone frame with rich transitions.

Zero code duplication: the partial is just a wrapper that loads the real screen via iframe.

---

## Reference files — always read first

Before acting on any request, read:

- `rules.md` — snapshot of the design system: available components, tokens, page-mobile.css classes
- `CLAUDE.md` — project-specific behavior rules and conventions

**`rules.md`** = what exists in the design system  
**`CLAUDE.md`** = how to behave in this project

---

## Operating rule — Proceed or Ask

**All information available → act immediately, no confirmation needed.**  
**Anything ambiguous or missing → ask before acting, never assume.**

---

## File structure

```
screens/login.html        ← full HTML page, works standalone, no frame
partials/login.html       ← minimal wrapper that loads screens/login.html via iframe
prototipo.html            ← phone frame + router + transitions
shared/page-mobile.css    ← all non-component CSS for mobile screens
shared/transitions.css    ← transition definitions (extensible)
```

---

## Step-by-step workflow

### Step 1 — Understand the screen

The user describes the screen: purpose, data shown, actions available, which flow it belongs to.
If the description is incomplete or ambiguous, ask for clarification before proceeding.

### Step 2 — List required components

Analyze the screen and list every UI element needed. For each element, apply this test:

> "Would a designer name and document this in a styleguide?"

- **Yes** → it is a component → comes from the storybook
- **No** → it is layout/structure → comes from `page-mobile.css`

Present the full list to the user before moving on.

### Step 3 — Check storybook availability

Read `rules.md` and cross-reference the component list against what exists in the storybook.
Mobile components use `title: 'Mobile/ComponentName'` in their story files.

Present the result clearly:

```
✅ Already in storybook: Button, Input, AppBar, BottomNav...
❌ Missing — needs to be created: StepIndicator, WalletCard...
```

**Always wait for user OK before continuing**, whether components are missing or not.

### Step 4 — Create missing components (if any)

For each missing component:

1. **Bottom-up order** — create children before parents, never the reverse
2. Create `ComponentName.tsx`
3. Create `ComponentName.module.css` — zero hardcoded values, 100% `var(--token-name)`
4. Create `ComponentName.stories.tsx` — title must use `'Mobile/ComponentName'` prefix.
   Document with Default story + all variants + edge cases
5. Update `rules.md` with the new component section
6. Update `CLAUDE.md` if it exists in the storybook directory

If no components are missing, skip to Step 5.

### Step 5 — Audit page-mobile.css

Read `shared/page-mobile.css` in full. For every layout/structural element the screen needs:

| Situation | Action |
|-----------|--------|
| Class already exists | Use it — write nothing new |
| Not found | Add a new class with a descriptive comment |

Rules for new classes in `page-mobile.css`:
- Zero hardcoded values — always `var(--token-name)`
- Safe area insets where needed: `env(safe-area-inset-bottom)`, `env(safe-area-inset-top)`
- Check for name conflicts with storybook component class names before naming
- Add a descriptive comment above each new group

### Step 6 — Build the screen

Create `screens/{screen-id}.html` following the Screen HTML Rules below.

### Step 7 — Build the partial

Create `partials/{screen-id}.html` — a minimal wrapper that loads the screen via iframe.

```html
<div class="screen" data-screen-id="{screen-id}" data-transition="{transition-type}">
  <iframe src="../screens/{screen-id}.html" frameborder="0"></iframe>
</div>
```

`data-transition` tells the router which animation to use when this screen enters.
Available types are defined in `shared/transitions.css`. If the right type does not exist,
add it to `transitions.css` — never hardcode animation values in the partial or the screen.

### Step 8 — Update prototipo.html

**Mandatory after every new screen.** A screen missing from `prototipo.html` is invisible.

The grouping structure and naming convention for flows come from the context the user provides
(usually a requirements file or spec). If this information is not present, ask the user before
creating or editing any group.

---

## Screen HTML rules (always apply)

### Structure

HTML files contain only: HTML tags, `<link>` references, and `<script>` tags.
No `<style>` blocks. No inline `style=""` attributes. No hardcoded CSS anywhere.

### Body layout class

Every screen sets a layout class on `<body>`:

```html
<!-- Standard mobile screen -->
<body class="layout-screen">

<!-- Full-bleed map or media screen -->
<body class="layout-fullbleed">
```

Both layouts are defined in `shared/page-mobile.css`.

### CSS loading order

```html
<link rel="stylesheet" href="../storybook/src/tokens/tokens.css" />
<link rel="stylesheet" href="../shared/page-mobile.css" />
<link rel="stylesheet" href="../storybook/src/components/AppBar/AppBar.module.css" />
<link rel="stylesheet" href="../storybook/src/components/Button/Button.module.css" />
<!-- one <link> per component actually used on this screen -->
```

### No hardcoded values

Every color, spacing, radius, shadow, font, and transition must use a CSS custom property.

```css
/* correct */
color: var(--color-text-primary);
gap: var(--spacing-md);
padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));

/* wrong */
color: #f9fafb;
gap: 16px;
padding-bottom: 32px;
```

### Icons

Use Lucide only. Never use emoji or invented icons.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<!-- page content -->
<script>lucide.createIcons();</script>
```

```html
<i data-lucide="zap" width="20" height="20"></i>
```

Never use inline SVG for icons.

### Logos and brand SVGs

Load via CSS classes from `Logo.module.css` — never paste `<svg>` inline.

```html
<!-- correct -->
<span class="logoDefault logoSm" aria-label="Project name" role="img"></span>

<!-- wrong -->
<svg>...</svg>
```

### Theming

```html
<html lang="pt-BR" data-theme="dark">
```

### Accessibility

- Semantic HTML elements
- `aria-label` on all icon-only buttons
- `for` / `id` pairs on all form fields

---

## Transitions

All transition types are defined in `shared/transitions.css`. The file is the single source of
truth for animations — never define animation values anywhere else.

Default types (defined in transitions.css from the start):

| Type | When to use |
|---|---|
| `push` | Navigate to child / detail screen |
| `pop` | Back button |
| `replace` | After completing a flow (no back) |
| `modal` | Confirmations, bottom sheets |
| `tab` | Switching bottom navbar tabs |

**Adding a new transition type:**
1. Add the animation definition to `shared/transitions.css`
2. Use the new type name in `data-transition` on the partial

The router reads `data-transition` from the partial and applies the matching CSS class.

---

## Updating existing components

When the user asks to change a component:

1. Edit `.tsx` and `.module.css` in the storybook
2. Update the story file
3. Update `rules.md` and `CLAUDE.md`
4. Do not touch the screen files — the CSS link propagates the change automatically

---

## Key principles

- **One source per concern** — storybook for components, `page-mobile.css` for layout/structure, `transitions.css` for animations
- **No CSS in HTML** — ever, for any reason
- **Screens are standalone** — every `screens/*.html` works without the router or frame
- **Partials are wrappers only** — 5 lines, no content, just an iframe pointing to the screen
- **Bottom-up component creation** — children before parents
- **rules.md stays current** — update whenever a component is added or changed
- **prototipo.html is mandatory** — every new screen must be registered there
- **Transitions are extensible** — new types go in transitions.css, never inline
