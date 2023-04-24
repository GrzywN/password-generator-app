/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PasswordStrengths } from '../../types/enums/PasswordStrengths';
import { AppState } from '../../types/interfaces/State';
import { CopyToClipboardButton } from './copy-to-clipboard-button';

describe('CopyToClipboardButton', () => {
  let buttonElement: HTMLButtonElement;
  let copyToClipboardButton: CopyToClipboardButton;
  let state: AppState;

  beforeEach(() => {
    buttonElement = document.createElement('button');
    state = {
      selectedLength: 10,
      includesUppercase: true,
      includesLowercase: true,
      includesNumbers: true,
      includesSymbols: true,
      currentPassword: '',
      passwordStrength: PasswordStrengths.STRONG,
      clipboard: {
        copied: false,
        copyingFailed: false,
      },
    };

    copyToClipboardButton = new CopyToClipboardButton(buttonElement, state);
  });

  describe('setup', () => {
    it('should call a setup method', () => {
      const spySetupStyling = vi.spyOn(copyToClipboardButton, 'setup');

      copyToClipboardButton.setup();

      expect(spySetupStyling).toHaveBeenCalled();
    });
  });

  describe('getElement', () => {
    it('should return the button element', () => {
      const result = copyToClipboardButton.getElement();

      expect(result).toBe(buttonElement);
    });
  });
});
