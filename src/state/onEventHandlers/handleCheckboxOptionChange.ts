import { StateManager } from '../state-manager';

export function handleCheckboxOptionChange(stateManager: StateManager): (event: Event) => void {
  return (event: Event) => {
    const optionName = (event.target as HTMLInputElement).name;
    const isChecked = (event.target as HTMLInputElement).checked;

    if (
      isChecked != null &&
      (optionName === 'includesUppercase' ||
        optionName === 'includesLowercase' ||
        optionName === 'includesSymbols' ||
        optionName === 'includesNumbers')
    ) {
      stateManager.handleOptionChange(optionName, isChecked);
    }
  };
}
