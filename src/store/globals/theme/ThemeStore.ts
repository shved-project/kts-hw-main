import { makeObservable, observable, action, computed } from 'mobx';

export type Theme = 'light' | 'dark';

type PrivateFields = '_theme';

export class ThemeStore {
  private _theme: Theme = 'light';

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _theme: observable,
      theme: computed,
      toggle: action,
      init: action,
    });
  }

  get theme(): Theme {
    return this._theme;
  }

  init = (): void => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const preferred: Theme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    this._theme = saved ?? preferred;
    document.documentElement.dataset.theme = this._theme;
  };

  toggle = (): void => {
    this._theme = this._theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = this._theme;
    localStorage.setItem('theme', this._theme);
  };
}
