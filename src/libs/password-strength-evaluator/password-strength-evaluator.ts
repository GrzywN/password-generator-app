import { PasswordStrengths } from '../../types/enums/PasswordStrengths';
import { PasswordGeneratorState, withCurrentPassword } from '../../types/interfaces/State';

const PASSWORD_LENGTH_WEAK = 6;
const PASSWORD_LENGTH_MEDIUM = 10;

export function evaluatePasswordStrengthBasedOnState(
  state: PasswordGeneratorState & withCurrentPassword
): PasswordStrengths {
  const {
    selectedLength,
    currentPassword,
    includesLowercase,
    includesUppercase,
    includesNumbers,
    includesSymbols,
  } = state;

  const includesAllTypesOfCharacters =
    includesLowercase && includesUppercase && includesNumbers && includesSymbols;
  const passwordLength = currentPassword.length > 0 ? currentPassword.length : selectedLength;

  if (passwordLength < PASSWORD_LENGTH_WEAK) {
    return PasswordStrengths.TOO_WEAK;
  }

  if (passwordLength < PASSWORD_LENGTH_MEDIUM && !includesAllTypesOfCharacters) {
    return PasswordStrengths.WEAK;
  }

  if (passwordLength < PASSWORD_LENGTH_MEDIUM && includesAllTypesOfCharacters) {
    return PasswordStrengths.MEDIUM;
  }

  if (passwordLength >= PASSWORD_LENGTH_MEDIUM && !includesAllTypesOfCharacters) {
    return PasswordStrengths.MEDIUM;
  }

  if (passwordLength >= PASSWORD_LENGTH_MEDIUM && includesAllTypesOfCharacters) {
    return PasswordStrengths.STRONG;
  }
}

export function evaluatePasswordStrengthBasedOnPassword(password: string): PasswordStrengths {
  const state: PasswordGeneratorState & withCurrentPassword = {
    selectedLength: password.length,
    includesLowercase: hasLowercaseLetter(password),
    includesUppercase: hasUppercaseLetter(password),
    includesNumbers: hasNumber(password),
    includesSymbols: hasSymbol(password),
    currentPassword: password,
  };

  return evaluatePasswordStrengthBasedOnState(state);
}

export function hasLowercaseLetter(password: string): boolean {
  const lowercaseLetterRegex = /[a-z]/;

  return lowercaseLetterRegex.test(password);
}

export function hasUppercaseLetter(password: string): boolean {
  const uppercaseLetterRegex = /[A-Z]/;

  return uppercaseLetterRegex.test(password);
}

export function hasNumber(password: string): boolean {
  const numberRegex = /[0-9]/;

  return numberRegex.test(password);
}

export function hasSymbol(password: string): boolean {
  const symbolRegex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  return symbolRegex.test(password);
}

export default evaluatePasswordStrengthBasedOnState;
