import { generatePassword } from '../../libs/password-generator';
import { StateManager } from '../state-manager';

export function handleGeneratePassword(stateManager: StateManager): () => void {
  return () => {
    const newPassword = generatePassword(stateManager.currentState);

    stateManager.handleGeneratePassword(newPassword);
  };
}
