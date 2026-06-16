# stuard.dev — Portfolio

Personal portfolio of Stuard Carrillo, software engineer. A terminal-flavored,
single-page site built with [Astro](https://astro.build) and React islands.

## Stack

- **Astro 6** — static output, zero JS by default
- **React 19** — small interactive islands only (typing effect, project list,
  status bar, command palette)
- **Vanilla CSS** — design tokens + component-scoped styles, no framework

## Architecture

```text
src/
├── data/portfolio.ts     # All site content, typed. Rendered server-side;
│                         # islands receive what they need via props.
├── styles/global.css     # Design tokens (palettes), reset, shared primitives.
├── layouts/Layout.astro  # Document shell, fonts, meta.
├── pages/index.astro     # Page composition.
└── components/
    ├── *.astro           # Static components, styled with scoped <style>.
    └── *.tsx             # React islands, styled with co-located *.module.css.
```

### Styling convention

- `src/styles/global.css` holds only what is genuinely global: design tokens
  (the four palettes), the base reset, and cross-component primitives
  (`.glitch`, `.cursor`).
- Everything else lives next to the component that uses it — a scoped
  `<style>` block in `.astro` files, a `*.module.css` file for React islands.
- Colors and fonts are always referenced through CSS custom properties so the
  palette switcher (⌘K → `theme · …`) works everywhere.

## Commands

| Command        | Action                                    |
| :------------- | :---------------------------------------- |
| `pnpm install` | Install dependencies                      |
| `pnpm dev`     | Start the dev server at `localhost:4321`  |
| `pnpm check`   | Type-check `.astro` and `.tsx` sources    |
| `pnpm build`   | Build the production site to `./dist/`    |
| `pnpm preview` | Preview the production build locally      |
