/**
 * Базовый интерфейс для глобальных сторов.
 * rootStore типизирован как object для разрыва циклической зависимости
 * (IRootStore импортируется напрямую в местах использования).
 */
export interface IGlobalStore {
  readonly rootStore: object;

  init: (...args: never[]) => Promise<boolean>;

  destroy: VoidFunction;
}
