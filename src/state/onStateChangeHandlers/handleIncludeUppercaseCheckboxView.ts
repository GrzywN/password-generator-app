import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState'

export function handleIncludeUppercaseCheckboxView(
  state: PasswordGeneratorState,
  element: HTMLInputElement,
): void {
  element.checked = state.includesUppercase
}
