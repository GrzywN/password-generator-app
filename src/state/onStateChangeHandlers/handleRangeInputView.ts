import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState'

let timeout: ReturnType<typeof setTimeout>

export function handleRangeInputView(state: PasswordGeneratorState, element: HTMLInputElement): void {
  element.value = (state.selectedLength * 5).toString()

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    element.dispatchEvent(new Event('input'))
  }, 60)
}
