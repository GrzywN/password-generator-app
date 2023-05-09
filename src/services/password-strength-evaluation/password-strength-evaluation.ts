import { evaluatePasswordStrengthBasedOnState } from '../../libs/password-strength-evaluator';
import { PasswordStrengths } from '../../types/enums/PasswordStrengths';
import type { AppState } from '../../types/interfaces/State';

export class PasswordStrengthEvaluation {
  public evaluatePasswordStrength(state: AppState): PasswordStrengths {
    const { includesUppercase, includesLowercase, includesNumbers, includesSymbols } = state;
    const doesNotIncludeCharacters =
      !includesUppercase && !includesLowercase && !includesNumbers && !includesSymbols;

    if (doesNotIncludeCharacters) {
      return PasswordStrengths.EMPTY;
    }

    return evaluatePasswordStrengthBasedOnState(state);
  }
}
