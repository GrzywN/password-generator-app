import { copyToClipboard } from '../../libs/clipboard-util';
import { CLIPBOARD_MESSAGE_TIMEOUT } from '../../utils/constants';
import { type StateManager } from '../state-manager';

const partialClipboardStateOnSuccess = { clipboard: { copied: true, copyingFailed: false } };
const partialClipboardStateOnFailure = { clipboard: { copied: false, copyingFailed: true } };
const partialClipboardStateOnReset = { clipboard: { copied: false, copyingFailed: false } };
export function handleCopyToClipboard(stateManager: StateManager): () => Promise<boolean> {
  return async () => {
    const { currentPassword } = stateManager.currentState;

    const didCopy = await copyToClipboard(currentPassword);

    if (didCopy) {
      stateManager.updateState(partialClipboardStateOnSuccess);
    } else {
      stateManager.updateState(partialClipboardStateOnFailure);
    }

    setTimeout(() => {
      stateManager.updateState(partialClipboardStateOnReset);
    }, CLIPBOARD_MESSAGE_TIMEOUT);

    return didCopy;
  };
}
