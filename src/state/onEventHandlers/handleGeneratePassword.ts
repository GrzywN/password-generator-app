import { generatePassword } from '../../libs/password-generator';
import { PasswordStrengths } from '../../types/enums/PasswordStrengths';
import { type StateManager } from '../state-manager';

export function handleGeneratePassword(stateManager: StateManager): () => void {
  return () => {
    if (stateManager.currentState.passwordStrength === PasswordStrengths.EMPTY) {
      return;
    }

    const newPassword = generatePassword(stateManager.currentState);

    stateManager.handleGeneratePassword(newPassword);
  };
}
