import { StyledRangeInput } from '../../presentational/styled-range-input';
import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState';

let styledRangeInput: StyledRangeInput | null = null;

export function handleRangeInputView(state: PasswordGeneratorState, element: HTMLInputElement): void {
  if (styledRangeInput == null) {
    styledRangeInput = new StyledRangeInput(element, state);
    styledRangeInput.setup();
  }

  styledRangeInput.handleStateChange(state);
}
