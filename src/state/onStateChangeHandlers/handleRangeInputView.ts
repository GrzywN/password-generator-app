import { StyledRangeInput } from '../../presentational/styled-range-input';
import { AppState } from '../../types/interfaces/State';

let styledRangeInput: StyledRangeInput | null = null;

export function handleRangeInputView(state: AppState, element: HTMLInputElement): void {
  if (styledRangeInput == null) {
    styledRangeInput = new StyledRangeInput(element, state);
    styledRangeInput.setup();
  }

  styledRangeInput.handleStateChange(state);
}
