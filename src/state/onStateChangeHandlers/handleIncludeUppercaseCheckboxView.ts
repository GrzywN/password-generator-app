import { AppState } from '../../types/interfaces/State';

export function handleIncludeUppercaseCheckboxView(state: AppState, element: HTMLInputElement): void {
  element.checked = state.includesUppercase;
}
