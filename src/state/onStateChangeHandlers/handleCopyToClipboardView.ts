import { CopyToClipboardButton } from '../../presentational/copy-to-clipboard-button';
import type { AppState } from '../../types/interfaces/State';

let copyToClipboardButton: CopyToClipboardButton | null = null;

export function handleCopyToClipboardView(state: AppState, element: HTMLButtonElement): void {
  if (copyToClipboardButton == null) {
    copyToClipboardButton = new CopyToClipboardButton(element, state);
    copyToClipboardButton.setup();
  }

  copyToClipboardButton.handleStateChange(state);
}
