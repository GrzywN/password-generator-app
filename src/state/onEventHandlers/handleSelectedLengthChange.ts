import { RANGE_INPUT_SCALE_BASED_ON_HUNDRED_DIVISION } from '../../utils/constants';
import { StateManager } from '../state-manager';

export function handleSelectedLengthChange(stateManager: StateManager): (event: Event) => void {
  return (event: Event): void => {
    const inputValue: number = parseInt((event.target as HTMLInputElement).value);

    if (isNaN(inputValue)) {
      return;
    }

    const newLength = parseInt((inputValue / RANGE_INPUT_SCALE_BASED_ON_HUNDRED_DIVISION).toString()) + 1;
    stateManager.handleLengthChange(newLength);
  };
}
