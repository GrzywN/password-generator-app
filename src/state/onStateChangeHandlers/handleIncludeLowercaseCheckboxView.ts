import { AppState } from '../../types/interfaces/State';

export function handleIncludeLowercaseCheckboxView(state: AppState, element: HTMLInputElement): void {
  element.checked = state.includesLowercase;
}
