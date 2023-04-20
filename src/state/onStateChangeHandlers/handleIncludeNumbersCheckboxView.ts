import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState';

export function handleIncludeNumbersCheckboxView(state: PasswordGeneratorState, element: HTMLInputElement): void {
  element.checked = state.includesNumbers;
}
