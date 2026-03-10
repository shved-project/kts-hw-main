const script = () => {
  try {
    const saved = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1];
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    document.documentElement.dataset.theme = saved ?? preferred;
  } catch (_) {}
};

export const themeScript = `(${script.toString()})()`;
