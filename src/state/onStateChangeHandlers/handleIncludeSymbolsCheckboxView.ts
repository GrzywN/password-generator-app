import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState'

export function handleIncludeSymbolsCheckboxView(
  state: PasswordGeneratorState,
  element: HTMLInputElement,
): void {
  element.checked = state.includesSymbols
}
