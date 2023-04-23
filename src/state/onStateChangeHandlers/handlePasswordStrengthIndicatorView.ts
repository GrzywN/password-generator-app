import { PasswordStrengthIndicator } from '../../presentational/password-strength-indicator';
import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState';

let indicator: PasswordStrengthIndicator | null = null;

export function handlePasswordStrengthIndicatorView(state: PasswordGeneratorState, element: HTMLDivElement): void {
  if (indicator == null) {
    indicator = new PasswordStrengthIndicator(element, state);
    indicator.setup();
  }

  indicator.handleStateChange(state);
}
