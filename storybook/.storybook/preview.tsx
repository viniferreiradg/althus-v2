import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { DocsContainer } from '@storybook/blocks';
import React from 'react';
import '../src/tokens/tokens.css';

// Reads initial theme from URL (?globals=theme:light) as fallback
function getThemeFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  const g = params.get('globals') ?? '';
  return g.includes('theme:light') ? 'light' : 'dark';
}

function ThemedDocsContainer({ children, context }: React.ComponentProps<typeof DocsContainer>) {
  const [themeName, setThemeName] = React.useState<string>(
    () => (window as any).__sbTheme ?? getThemeFromUrl(),
  );

  React.useEffect(() => {
    const handler = (e: Event) => setThemeName((e as CustomEvent<string>).detail);
    window.addEventListener('sb-theme-change', handler);
    return () => window.removeEventListener('sb-theme-change', handler);
  }, []);

  return React.createElement(
    DocsContainer,
    { context, theme: themeName === 'light' ? themes.light : themes.dark },
    children,
  );
}

function applyTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  const root = document.getElementById('storybook-root');
  if (root) root.setAttribute('data-theme', theme);
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / Dark mode',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (StoryFn, context) => {
      const theme = (context.globals['theme'] as string) ?? 'dark';
      applyTheme(theme);
      // Notify ThemedDocsContainer about the change
      if ((window as any).__sbTheme !== theme) {
        (window as any).__sbTheme = theme;
        window.dispatchEvent(new CustomEvent('sb-theme-change', { detail: theme }));
      }
      return StoryFn();
    },
  ],

  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    docs: {
      container: ThemedDocsContainer,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
