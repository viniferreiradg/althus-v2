---
name: prototype-desktop
description: >
  Use this skill whenever the user wants to create high-fidelity desktop HTML screens from a
  design system, build or update a clickable prototype, create or update storybook components,
  or update prototipo.html navigation.

  Trigger on: "criar tela", "criar página", "criar componente", "protótipo", "screen",
  "adicionar componente", "atualizar componente", requests to build any .html page, or any
  mention of using or extending the component library.
---

# prototype-desktop

Turns a design system into a living high-fidelity HTML prototype. Every screen consumes
styles from two sources only: component CSS files from the storybook, and `shared/page.css`
for everything that is not a component. No CSS is ever written directly in an HTML file.

---

## Reference files — always read first

Before acting on any request, read:

- `rules.md` — snapshot of the design system: available components, tokens, page.css classes
- `CLAUDE.md` — project-specific behavior rules and conventions

**`rules.md`** = what exists in the design system  
**`CLAUDE.md`** = how to behave in this project

---

## Operating rule — Proceed or Ask

**All information available → act immediately, no confirmation needed.**  
**Anything ambiguous or missing → ask before acting, never assume.**

---

## Step-by-step workflow

### Step 1 — Understand the screen

The user describes the screen: purpose, data shown, actions available. If the description is
incomplete or ambiguous, ask for clarification before proceeding.

### Step 2 — List required components

Analyze the screen and list every UI element needed. For each element, apply this test:

> "Would a designer name and document this in a styleguide?"

- **Yes** → it is a component → comes from the storybook
- **No** → it is layout/structure → comes from `page.css`

Present the full list to the user before moving on.

### Step 3 — Check storybook availability

Read `rules.md` and cross-reference the component list against what exists in the storybook.

Present the result clearly:

```
✅ Already in storybook: Button, Input, Table, Sidebar...
❌ Missing — needs to be created: StepIndicator, MetricCard...
```

**Always wait for user OK before continuing**, whether components are missing or not.

### Step 4 — Create missing components (if any)

For each missing component:

1. **Bottom-up order** — create children before parents, never the reverse
2. Create `ComponentName.tsx`
3. Create `ComponentName.module.css` — zero hardcoded values, 100% `var(--token-name)`
4. Create `ComponentName.stories.tsx` — document with Default story + all variants + edge cases
5. Update `rules.md` with the new component section
6. Update `CLAUDE.md` if it exists in the storybook directory

If no components are missing, skip to Step 5.

### Step 5 — Audit page.css

Read `shared/page.css` in full. For every layout/structural element the screen needs:

| Situation | Action |
|-----------|--------|
| Class already exists in `page.css` | Use it — write nothing new |
| Not found | Add a new class with a descriptive comment |

Rules for new classes in `page.css`:
- Zero hardcoded values — always `var(--token-name)`
- Check for name conflicts with storybook component class names before naming
- Add a descriptive comment above each new group

### Step 6 — Build the HTML screen

Create the `.html` file in the correct directory. Follow all HTML rules below.

### Step 7 — Update prototipo.html

**Mandatory after every new screen.** A screen missing from `prototipo.html` is invisible.

The grouping structure and naming convention for flows come from the context the user provides
(usually a requirements file or spec). If this information is not present, ask the user before
creating or editing any group.

---

## HTML rules (always apply)

### Structure

HTML files contain only: HTML tags, `<link>` references, and `<script>` tags.  
No `<style>` blocks. No inline `style=""` attributes. No hardcoded CSS anywhere.

### Body layout class

Every page sets a layout class on `<body>` to control the page structure:

```html
<!-- Dashboard with sidebar -->
<body class="layout-dashboard">

<!-- Auth / login pages -->
<body class="layout-auth">
```

Both layouts are defined in `shared/page.css`. This replaces any per-page style exceptions.

### CSS loading order

```html
<link rel="stylesheet" href="../storybook/src/tokens/tokens.css" />
<link rel="stylesheet" href="shared/page.css" />
<link rel="stylesheet" href="../storybook/src/components/Sidebar/Sidebar.module.css" />
<link rel="stylesheet" href="../storybook/src/components/Button/Button.module.css" />
<!-- one <link> per component actually used on this page -->
```

### No hardcoded values

Every color, spacing, radius, shadow, font, and transition must use a CSS custom property.

```css
/* correct */
color: var(--color-text-primary);
gap: var(--spacing-md);
border-radius: var(--radius-sm);

/* wrong */
color: #f9fafb;
gap: 16px;
border-radius: 8px;
```

### Icons

Use Lucide only. Never use emoji or invented icons.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<!-- page content -->
<script>lucide.createIcons();</script>
```

```html
<i data-lucide="mail" width="16" height="16"></i>
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

Use semantic tokens so the page adapts automatically if the theme changes.

### Accessibility

- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<header>`)
- `aria-label` on all icon-only buttons
- `for` / `id` pairs on all form fields

---

## Updating existing components

When the user asks to change a component:

1. Edit `.tsx` and `.module.css` in the storybook
2. Update the story file
3. Update `rules.md` and `CLAUDE.md`
4. Do not touch the HTML pages — the CSS link propagates the change automatically

---

## Key principles

- **One CSS source per concern** — storybook for components, `page.css` for layout/structure
- **No CSS in HTML** — ever, for any reason
- **Bottom-up component creation** — children before parents
- **rules.md stays current** — update it whenever a component is added or changed
- **prototipo.html is mandatory** — every new screen must be registered there
