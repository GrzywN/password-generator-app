import { ComponentStrategy } from '../../types/interfaces/ComponentStrategy'

export class StyledRangeInput implements ComponentStrategy<HTMLInputElement> {
  private element: HTMLInputElement

  public setup(element: HTMLInputElement): HTMLInputElement {
    this.element = element
    this.setupStyling()

    return this.element
  }

  public getElement(): HTMLInputElement {
    return this.element
  }

  private setupStyling(): void {
    this.setupStylingOnInit()
    this.setupStylingOnValueChange()
  }

  private setupStylingOnInit(): void {
    this.setBackgroundBasedOnInputValue()
  }

  private setupStylingOnValueChange(): void {
    this.element.addEventListener('input', this.handleChange)
  }

  private readonly handleChange = (): void => {
    this.setBackgroundBasedOnInputValue()
  }

  private setBackgroundBasedOnInputValue(): void {
    this.element.style.backgroundImage = `
	    linear-gradient(to right,
	    var(--color-primary-400) 0%,
    	var(--color-primary-400) ${this.element.value}%,
    	var(--color-neutral-700) ${this.element.value}%,
    	var(--color-neutral-700) 100%)`
  }
}

export default StyledRangeInput
