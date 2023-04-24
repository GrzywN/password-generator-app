import { AppState } from '../../types/interfaces/State';

export function handleIncludeNumbersCheckboxView(state: AppState, element: HTMLInputElement): void {
  element.checked = state.includesNumbers;
}
