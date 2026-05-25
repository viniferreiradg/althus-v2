---
name: storybook
description: >
  Use this skill whenever the user wants to create HTML screens or pages from a design system,
  build high-fidelity prototypes, work with a Storybook component library, create or update
  components, or maintain a rules.md that reflects the storybook as source of truth.

  Trigger on: "criar tela", "criar página", "criar componente", "storybook", "design system",
  "protótipo", "screen", "adicionar componente", "atualizar componente", requests to build any
  .html page, or any mention of using or extending the component library.

  There are two distinct modes — detect which one applies:
  1. **First time** — no rules.md exists yet → analyze the storybook and generate rules.md
  2. **Screen creation** — rules.md already exists → use it to build the requested screen
---

# Storybook Skill

This skill turns a Storybook design system into a living prototyping engine. Every HTML screen
consumes components directly from the storybook (via CSS links), so changing a component in the
storybook automatically updates every page that uses it.

---

## Operating Rule — Proceed or Ask

**If you have all the information needed: proceed directly, without asking for confirmation.**
**If anything is ambiguous or missing: ask the user before acting — never assume or guess.**

This prevents unnecessary interruptions on clear tasks, and prevents wrong assumptions on
unclear ones. Apply this rule at every decision point across all phases.

---

## Step 0 — Always do this first

Before doing anything else, check whether `rules.md` exists in the project root (or wherever the
user's storybook lives). Its presence tells you which mode to use.

```
rules.md exists?  → Mode 2 (Screen Creation)
rules.md missing? → Mode 1 (First Time)
```

Also read `CLAUDE.md` inside the storybook directory if it exists — it is the canonical source of
truth for component APIs, tokens, and conventions and will save you a lot of reading.

Also check whether `prototipo.html` exists in the page directory (e.g., `dashboard-rede/`):

```
prototipo.html exists?  → Phase 5: add the new page to the correct FLOW group
prototipo.html missing? → Phase 5: create prototipo.html from scratch, then add the page
```

---

## Mode 1 — First Time: Generate rules.md

**Goal:** Produce a `rules.md` that is a complete, human-readable snapshot of the design system.
This file becomes the reference for every future screen. Keep it up to date as new components are
added.

### What to read

Read all of the following in parallel:

- `src/tokens/tokens.css` — full token inventory (colors, spacing, typography, radius, shadow, motion)
- `src/stories/Introduction.mdx` — project intro and stated conventions
- Every `src/components/*/ComponentName.stories.tsx` — props, variants, usage examples
- Every `src/components/*/ComponentName.module.css` — CSS class names that HTML pages will use
- `CLAUDE.md` if present — may already contain a lot of this; incorporate rather than duplicate
- Any foundation stories (Colors, Typography, Spacing, etc.) for token documentation

### What to write in rules.md

Structure the file clearly so any future conversation can load it and immediately know what is
available without re-reading the storybook.

```
# Design System Rules — <ProjectName>
_Last updated: <date>_

## Stack & Setup
- Framework, icon library, how CSS is loaded

## Absolute Rules
- (e.g. never use raw values, always use tokens, never duplicate components)

## Theming
- How dark/light mode works (data-theme attribute, default mode)

## Components
For each component:
### ComponentName
- CSS file path (for HTML pages: ../storybook/src/components/Name/Name.module.css)
- CSS classes available
- Variants and sizes
- Usage example (HTML snippet using the CSS classes)

## Design Tokens
### Colors (semantic — prefer these)
### Typography
### Spacing
### Border Radius
### Shadows
### Motion / Transitions
### Opacity

## Layout Patterns
- Common page layouts with class/token references

## HTML Page Rules
- How to link CSS (one <link> per component)
- How icons work (Lucide CDN + data-lucide + lucide.createIcons())
- Logo/SVG loading rules
```

### When done

Tell the user: "rules.md criado. Agora você pode me pedir qualquer tela e eu vou criá-la usando
100% os componentes e tokens do storybook."

---

## Mode 2 — Screen Creation

### Phase 1: Analyze requirements

Read `rules.md` first. Then understand what the screen should contain: purpose, sections,
actions, data shown.

### Phase 2: Map components

From the requirements, list every UI element needed. Cross-reference with `rules.md`:

```
✅ Já existe no storybook: Button, Input, Table, Sidebar...
❌ Precisa criar: StepIndicator, MetricCard...
```

Show this list to the user clearly before proceeding.

### Phase 3: Create missing components (ask first)

Ask: "Preciso criar os seguintes componentes que ainda não existem: [list]. Posso criar?"

If yes, for each missing component:

1. **Children first** — if the component contains sub-components, create the deepest child first
   and work upward. Never create a parent before its children exist.
2. Create `ComponentName.tsx`
3. Create `ComponentName.module.css` — zero hardcoded values, 100% `var(--token-name)`
4. Create `ComponentName.stories.tsx` with at least Default, variants, and edge cases
5. Update `rules.md` with the new component's section
6. Update `CLAUDE.md` if it exists in the storybook directory

### Phase 3.5: CSS audit — before writing any HTML

Read `shared/page.css` in full. For every visual element the page needs, classify it:

| Situation | Action |
|-----------|--------|
| Class already exists in `page.css` | Use it — write nothing new |
| Already a storybook component | Link its CSS file — write nothing new |
| Not found in either | Apply the decision below |

**Decision for new CSS:**
- "Would a designer name this thing in Figma?" (Timeline, DetailCard, MetricCard…) → Storybook component — go back to Phase 3
- Structural / layout / page-level pattern → add to `page.css` with a descriptive comment

**Never write CSS directly in the HTML page** (see `<style>` block rules below).

### Phase 4: Create the HTML screen

Build the `.html` file following the rules below. Place it in the correct directory
(e.g., `dashboard-rede/`, `dashboard-adm/`, `app/`) as the user instructs.

### Phase 5: Update prototipo.html

**This step is mandatory after every new HTML page. A page missing from `prototipo.html` is
invisible to reviewers.**

- **`prototipo.html` exists** → find the FLOWS array, locate the correct RF group, append the
  screen entry in logical order (see `## prototipo.html Rules` below).
- **`prototipo.html` does not exist** → create it from scratch using the canonical template
  (see `## prototipo.html Rules`), then add the new page as the first entry.

---

## HTML Screen Rules (apply always)

### CSS loading

Link one file per component used. Never embed component styles inline.

```html
<link rel="stylesheet" href="../storybook/src/tokens/tokens.css" />
<link rel="stylesheet" href="../storybook/src/components/Button/Button.module.css" />
<link rel="stylesheet" href="../storybook/src/components/Input/Input.module.css" />
<!-- one <link> per component actually used on this page -->
```

**Dashboard pages — `<style>` blocks are forbidden.**
All CSS lives in exactly one of two places:
1. `shared/page.css` — layout, structural, and page-level patterns
2. A storybook component CSS file — named UI components

**Exception — auth pages** (login, criar-senha, redefinir-senha, etc.):
The `body` rule in `page.css` uses `display:flex; height:100vh; overflow:hidden` for the
sidebar + main layout. This is incompatible with auth page layout (AuthCard, full-page centering).
Auth pages keep a minimal `<style>` block containing only:
- Box-sizing reset
- `body` reset without flex/overflow
- `.logo-img` filter (since page.css is not linked)
- Any page-unique classes (e.g. `.forgot-link`, `.hidden`)

Always add this comment at the top of an auth `<style>`:
```css
/* Auth layout — incompatível com page.css (body sem flex/overflow do dashboard) */
```

### shared/page.css — fonte única de CSS para páginas dashboard

Location: `dashboard-rede/shared/page.css`  
Link order: after `tokens.css`, before any component CSS.

```html
<link rel="stylesheet" href="../storybook/src/tokens/tokens.css" />
<link rel="stylesheet" href="shared/page.css" />
<link rel="stylesheet" href="../storybook/src/components/Sidebar/Sidebar.module.css" />
<!-- remaining component links -->
```

**What lives in `page.css`:** body, .main, .pageHeader, .pageTitle, .pageSubtitle, .pageContent
(+ scrollbar), .tabNav, .toolbar and width variants (.searchWrap, .filterWrap, .filterWrapSm,
.periodWrap), table helpers (.thFirst, .tdFirst, .tdMono, .tdMuted, .tdStrong, .tdDesc,
.cellUser, .cellDateTime, .cellDate, .cellTime, .cellLocation, .cellLocationName, .cellCharger),
.formSection, .sectionTitle, .sectionSubtitle, .formGrid, .grid2, .grid3, .grid4, .formFooter,
.metaGrid, .metaField, .metaLabel, .metaValue, .metaValueMono, .feedbackWrap, .tableFooter,
.titleRow, .avatarSection, .avatarXl, .avatarMeta, .avatarName, .avatarRole,
sidebar collapsed state, logo visibility, and every other structural/layout class.

**What does NOT live in `page.css`:**
- Named UI components with a distinct visual identity → storybook
- Auth page CSS → minimal `<style>` block in each auth page

**Rules when adding a new class to `page.css`:**
1. Zero hardcoded values — always `var(--token-name)`
2. Add a descriptive comment above each new group of classes
3. Before naming a class, check for conflicts with storybook component class names.
   If a conflict exists, rename: e.g. `.detailGrid` exists in `DetailCard.module.css` —
   use `.detailWithSidebar` instead.

### No hardcoded values

Every color, size, spacing, radius, shadow, font, and transition must use a CSS custom property.

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

Load Lucide from CDN and call `lucide.createIcons()` after the DOM loads.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<!-- page content -->
<script>lucide.createIcons();</script>
```

Use icons via `data-lucide` attribute — never inline SVG code for icons.

```html
<i data-lucide="mail" width="16" height="16"></i>
```

### Logos and brand SVGs

Always load logo SVGs as external files via CSS classes — never paste SVG code inline.

```html
<!-- correct — uses CSS classes from Logo.module.css -->
<span class="logoDefault logoSm" aria-label="Althus" role="img"></span>

<!-- wrong — never paste raw <svg> for logos -->
```

### Theming

```html
<html lang="pt-BR" data-theme="dark">
```

Use semantic tokens so the page adapts automatically if the theme changes.

---

## Updating existing components

When the user asks to change any component:

1. Edit `.tsx` and `.module.css` in the storybook
2. Update the story file
3. Update `rules.md` and `CLAUDE.md`
4. Do not touch the HTML pages — CSS links mean the change propagates automatically

Tell the user: "Alterei o componente no storybook. Todas as páginas que o usam já estão
atualizadas automaticamente."

---

## prototipo.html — Prototype Navigation

### Purpose

`prototipo.html` is the single entry point for reviewing the prototype. It renders every screen
as a live thumbnail (scaled iframe) organized in collapsible flow groups. Reviewers click a
thumbnail to load the full screen in the preview area — no need to know file names.

### Location

One file per page directory — never shared across directories:

- `dashboard-rede/prototipo.html`
- `dashboard-adm/prototipo.html`
- `app/prototipo.html`

### FLOWS array structure

```javascript
const FLOWS = [
  {
    label: 'RF201 — Nome do Requisito',   // RF number + em dash + feature name
    screens: [
      { label: 'Nome da Tela – Jornada X.X.X', file: 'filename.html' },
    ],
  },
];
```

### Grouping rules

- **One group per RF.** Never mix RFs in the same group.
- **Group label format:** `'RF201 — Nome do Requisito'` (RF number + `—` + feature name in Portuguese)
- **Auth pages** (login, criar-senha, redefinir-senha) belong to the Login/Auth RF group — never mixed with dashboard flows
- **Groups in ascending RF order** throughout the array

### Screen naming and ordering

- **Label format:** `'Nome da Tela – Jornada X.X.X'`
- **Order within a group:** logical user journey — list → detail → create → edit; or ascending jornada number when ambiguous
- **Never alphabetical order**

### Adding a screen to an existing group

Find the group by RF label, insert at the correct position:

```javascript
{ label: 'Nova Tela – Jornada 2.X.X', file: 'jornada-2-x-x-nova-tela.html' },
```

### Adding a new group

When no group exists for the page's RF, add a new object in FLOWS at the correct ascending-RF position:

```javascript
{
  label: 'RF211 — Nome do Novo Requisito',
  screens: [
    { label: 'Primeira Tela – Jornada 2.X.X', file: 'jornada-2-x-x-primeira-tela.html' },
  ],
},
```

### First-time creation

When `prototipo.html` does not exist in the directory, create it using
`dashboard-rede/prototipo.html` as the canonical template. The template provides:

- **Left sidebar** — collapsible flow groups, thumbnail cards (scaled iframes at 0.25×), expand-all toolbar, footer
- **Right preview area** — mock address bar + full-size iframe + floating re-open button
- All groups start collapsed; clicking a group label expands its screen cards

---

## Key principles

- **Proceed or ask** — all information available → act. Anything missing or ambiguous → ask first, never guess
- **Component hierarchy** — bottom-up always: children before parents
- **Source of truth** — `rules.md` must reflect the current storybook state at all times
- **No duplication** — never recreate an existing component; link or import it
- **Icons** — Lucide only, via `data-lucide` in HTML or `<IconName />` in React
- **Accessibility** — semantic HTML, `aria-label` on icon-only buttons, `for`/`id` on all form fields
