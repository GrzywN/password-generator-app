export interface ComponentStrategy<T extends HTMLElement> {
  setup: (element: T) => T
  getElement: () => T
}
