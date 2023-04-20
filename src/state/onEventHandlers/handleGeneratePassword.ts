import { StateManager } from '../state-manager';
import { generatePassword } from '../../libs/password-generator';

export function handleGeneratePassword(stateManager: StateManager): () => void {
  return () => {
    const newPassword = generatePassword(stateManager.currentState);

    stateManager.handleGeneratePassword(newPassword);
  };
}
