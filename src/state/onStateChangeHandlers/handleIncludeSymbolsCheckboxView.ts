import { AppState } from '../../types/interfaces/State';

export function handleIncludeSymbolsCheckboxView(state: AppState, element: HTMLInputElement): void {
  element.checked = state.includesSymbols;
}
