import { StatefulComponentStrategy } from '../../types/interfaces/ComponentStrategy';
import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState';
import { RANGE_INPUT_SCALE_BASED_ON_HUNDRED_DIVISION } from '../../utils/constants';

export class StyledRangeInput implements StatefulComponentStrategy<HTMLInputElement> {
  private readonly element: HTMLInputElement;
  private state: PasswordGeneratorState;

  constructor(element: HTMLInputElement, state: PasswordGeneratorState) {
    this.element = element;
    this.state = state;
  }

  public setup(): void {
    this.setupStyling();
  }

  public getElement(): HTMLInputElement {
    return this.element;
  }

  public handleStateChange(newState: PasswordGeneratorState): void {
    this.state = newState;

    this.setBackgroundBasedOnState();
    this.setElementValueBasedOnState();
  }

  private setupStyling(): void {
    this.setupStylingOnInit();
  }

  private setupStylingOnInit(): void {
    this.setBackgroundBasedOnState();
  }

  private setBackgroundBasedOnState(): void {
    this.element.style.backgroundImage = `
	    linear-gradient(to right,
	    var(--color-primary-400) 0%,
    	var(--color-primary-400) ${(this.state.selectedLength - 1) * RANGE_INPUT_SCALE_BASED_ON_HUNDRED_DIVISION}%,
    	var(--color-neutral-700) ${(this.state.selectedLength - 1) * RANGE_INPUT_SCALE_BASED_ON_HUNDRED_DIVISION}%,
    	var(--color-neutral-700) 100%)`;
  }

  private setElementValueBasedOnState(): void {
    this.element.value = (
      (this.state.selectedLength - 1) *
      RANGE_INPUT_SCALE_BASED_ON_HUNDRED_DIVISION
    ).toString();
  }
}

export default StyledRangeInput;
