import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState';

export function handleIncludeLowercaseCheckboxView(
  state: PasswordGeneratorState,
  element: HTMLInputElement
): void {
  element.checked = state.includesLowercase;
}
