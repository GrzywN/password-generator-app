import { beforeEach, describe, expect, it } from 'vitest';
import { PasswordStrengths } from '../../types/enums/PasswordStrengths';
import type { AppState } from '../../types/interfaces/State';
import { PasswordStrengthEvaluation } from './password-strength-evaluation';

describe('PasswordStrengthEvaluation', () => {
  let passwordStrengthEvaluation: PasswordStrengthEvaluation;

  beforeEach(() => {
    passwordStrengthEvaluation = new PasswordStrengthEvaluation();
  });

  describe('evaluatePasswordStrength', () => {
    it('should return PasswordStrengths.EMPTY if no character type is selected', () => {
      const state: AppState = {
        selectedLength: 8,
        includesUppercase: false,
        includesLowercase: false,
        includesNumbers: false,
        includesSymbols: false,
        currentPassword: '',
        passwordStrength: PasswordStrengths.TOO_WEAK,
        clipboard: {
          copied: false,
          copyingFailed: false,
        },
      };

      const passwordStrength = passwordStrengthEvaluation.evaluatePasswordStrength(state);

      expect(passwordStrength).toEqual(PasswordStrengths.EMPTY);
    });
  });
});
