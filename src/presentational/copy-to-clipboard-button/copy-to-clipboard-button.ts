import type { Component, withState } from '../../types/interfaces/Component';
import { AppState, PasswordGeneratorState, withClipboard } from '../../types/interfaces/State';
export class CopyToClipboardButton implements Component<HTMLButtonElement>, withState {
  private readonly element: HTMLButtonElement;
  private state: PasswordGeneratorState & withClipboard;

  constructor(element: HTMLButtonElement, state: AppState) {
    this.element = element;
    this.state = state;
  }

  public setup(): void {}

  public getElement(): HTMLButtonElement {
    return this.element;
  }

  public handleStateChange(state: AppState): void {
    this.state = state;

    this.updateDatasetAttributes();
  }

  private updateDatasetAttributes(): void {
    const {
      clipboard: { copied, copyingFailed },
    } = this.state;

    if (copied) {
      this.setTemporaryDatasetAttributeOnSuccess();
    } else if (copyingFailed) {
      this.setTemporaryDatasetAttributeOnFailure();
    } else {
      this.setTemporaryDatasetAttributeOnReset();
    }
  }

  private setTemporaryDatasetAttributeOnSuccess(): void {
    this.element.dataset.copied = String(true);
    this.element.dataset.copyingFailed = String(false);
  }

  private setTemporaryDatasetAttributeOnFailure(): void {
    this.element.dataset.copied = String(false);
    this.element.dataset.copyingFailed = String(true);
  }

  private setTemporaryDatasetAttributeOnReset(): void {
    this.element.dataset.copied = String(false);
    this.element.dataset.copyingFailed = String(false);
  }
}

export default CopyToClipboardButton;
