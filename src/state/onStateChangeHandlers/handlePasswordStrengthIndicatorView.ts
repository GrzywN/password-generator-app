import { PasswordStrengthIndicator } from '../../presentational/password-strength-indicator';
import { AppState } from '../../types/interfaces/State';

let indicator: PasswordStrengthIndicator | null = null;

export function handlePasswordStrengthIndicatorView(state: AppState, element: HTMLDivElement): void {
  if (indicator == null) {
    indicator = new PasswordStrengthIndicator(element, state);
    indicator.setup();
  }

  indicator.handleStateChange(state);
}
