import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState'
import { evaluatePasswordStrengthBasedOnState } from '../../utils/password-strength-evaluator'
import { displayPasswordStrength } from '../../modules/display-password-strength'

export function handlePasswordStrengthIndicatorView(state: PasswordGeneratorState): void {
  const passwordStrength = evaluatePasswordStrengthBasedOnState(state)
  displayPasswordStrength('data-pg-password-strength', passwordStrength)
}
