import { StateManager } from '../state-manager'

export function handleSelectedLengthChange(stateManager: StateManager): (event: Event) => void {
  return (event: Event): void => {
    const inputValue: number = parseInt((event.target as HTMLInputElement).value)

    if (isNaN(inputValue)) {
      return
    }

    const newLength = parseInt((inputValue / 5).toString())
    stateManager.handleLengthChange(newLength)
  }
}
