import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState'

export function handleLengthIndicatorView(state: PasswordGeneratorState, element: HTMLElement): void {
  element.innerText = state.selectedLength.toString()
}
