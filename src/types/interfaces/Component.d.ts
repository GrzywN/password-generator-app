import { type AppState } from './State';

export interface Component<T extends HTMLElement> {
  setup: () => void;
  getElement: () => T;
}

export interface withState {
  handleStateChange: (newState: AppState) => void;
}
