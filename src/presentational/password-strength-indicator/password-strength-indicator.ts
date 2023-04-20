import type { StatefulComponentStrategy } from '../../types/interfaces/ComponentStrategy';
import type { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState';
import { PasswordStrengths } from '../../types/enums/PasswordStrengths';

export class PasswordStrengthIndicator implements StatefulComponentStrategy<HTMLDivElement> {
  private readonly element: HTMLDivElement;
  private state: PasswordGeneratorState;

  private tooWeakTemplateElement: HTMLTemplateElement;
  private weakTemplateElement: HTMLTemplateElement;
  private mediumTemplateElement: HTMLTemplateElement;
  private strongTemplateElement: HTMLTemplateElement;

  constructor(element: HTMLDivElement, state: PasswordGeneratorState) {
    this.element = element;
    this.state = state;
  }

  public setup(): void {
    this.setTemplateElements();
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }

  private setTemplateElements(): void {
    const tooWeakTemplateElement = this.element.querySelector('[data-pg-password-strength="too-weak"]');
    const weakTemplateElement = this.element.querySelector('[data-pg-password-strength="weak"]');
    const mediumTemplateElement = this.element.querySelector('[data-pg-password-strength="medium"]');
    const strongTemplateElement = this.element.querySelector('[data-pg-password-strength="strong"]');

    if (
      tooWeakTemplateElement == null ||
      weakTemplateElement == null ||
      mediumTemplateElement == null ||
      strongTemplateElement == null
    ) {
      throw new Error(
        'password-strength-indicator: One of the template elements is null. At this point, app would break anyway.'
      );
    }

    this.tooWeakTemplateElement = tooWeakTemplateElement.cloneNode(true) as HTMLTemplateElement;
    this.weakTemplateElement = weakTemplateElement.cloneNode(true) as HTMLTemplateElement;
    this.mediumTemplateElement = mediumTemplateElement.cloneNode(true) as HTMLTemplateElement;
    this.strongTemplateElement = strongTemplateElement.cloneNode(true) as HTMLTemplateElement;
  }

  public handleStateChange(state: PasswordGeneratorState): void {
    this.state = state;

    const templateElement = this.selectTemplateElementBasedOnState();
    this.displayProperIndicator(templateElement);
  }

  private selectTemplateElementBasedOnState(): HTMLTemplateElement {
    const { passwordStrength } = this.state;

    const strengthAndItsElement = {
      [PasswordStrengths.TOO_WEAK]: this.tooWeakTemplateElement,
      [PasswordStrengths.WEAK]: this.weakTemplateElement,
      [PasswordStrengths.MEDIUM]: this.mediumTemplateElement,
      [PasswordStrengths.STRONG]: this.strongTemplateElement,
    };

    if (strengthAndItsElement[passwordStrength] == null) {
      throw new Error('password-strength-indicator: Wrong password strength provided.');
    }

    const templateElement = strengthAndItsElement[passwordStrength];

    return templateElement;
  }

  private displayProperIndicator(templateElement: HTMLTemplateElement): void {
    const templateContent = PasswordStrengthIndicator.getTemplateNodeContent(templateElement);
    const node = this.element;

    PasswordStrengthIndicator.replaceElementsChildrenWithNode(node, templateContent);
  }

  private static getTemplateNodeContent(template: HTMLTemplateElement): Node {
    return template.content.cloneNode(true);
  }

  private static replaceElementsChildrenWithNode(node: HTMLElement, newChildren: Node): void {
    node.replaceChildren(newChildren);
  }
}

export default PasswordStrengthIndicator;
