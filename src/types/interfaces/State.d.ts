import { PasswordStrengths } from '../enums/PasswordStrengths';

export type AppState = PasswordGeneratorState & withCurrentPassword & withPasswordStrength & withClipboard;

export interface PasswordGeneratorState {
  selectedLength: number;
  includesUppercase: boolean;
  includesLowercase: boolean;
  includesNumbers: boolean;
  includesSymbols: boolean;
}

export interface withCurrentPassword {
  currentPassword: string;
}

export interface withPasswordStrength {
  passwordStrength: PasswordStrengths;
}

export interface withClipboard {
  clipboard: {
    copied: boolean;
    copyingFailed: boolean;
  };
}
