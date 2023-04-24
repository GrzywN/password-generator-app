import { AppState } from '../../types/interfaces/State';
import { handleCopyToClipboardView } from './handleCopyToClipboardView';
import { handleIncludeLowercaseCheckboxView } from './handleIncludeLowercaseCheckboxView';
import { handleIncludeNumbersCheckboxView } from './handleIncludeNumbersCheckboxView';
import { handleIncludeSymbolsCheckboxView } from './handleIncludeSymbolsCheckboxView';
import { handleIncludeUppercaseCheckboxView } from './handleIncludeUppercaseCheckboxView';
import { handleLengthIndicatorView } from './handleLengthIndicatorView';
import { handlePasswordPreviewView } from './handlePasswordPreviewView';
import { handlePasswordStrengthIndicatorView } from './handlePasswordStrengthIndicatorView';
import { handleRangeInputView } from './handleRangeInputView';

export interface DomElements {
  copyToClipboardButton: HTMLButtonElement;
  passwordPreview: HTMLElement;
  lengthIndicator: HTMLElement;
  lengthRangeInput: HTMLInputElement;
  includesUppercaseCheckbox: HTMLInputElement;
  includesLowercaseCheckbox: HTMLInputElement;
  includesNumbersCheckbox: HTMLInputElement;
  includesSymbolsCheckbox: HTMLInputElement;
  strengthIndicatorContainer: HTMLDivElement;
}

export function handleStateChange(domElements: DomElements): (state: AppState) => void {
  const {
    copyToClipboardButton,
    passwordPreview,
    lengthIndicator,
    lengthRangeInput,
    includesUppercaseCheckbox,
    includesLowercaseCheckbox,
    includesNumbersCheckbox,
    includesSymbolsCheckbox,
    strengthIndicatorContainer,
  } = domElements;

  return (state: AppState) => {
    handleCopyToClipboardView(state, copyToClipboardButton);
    handlePasswordPreviewView(state, passwordPreview);
    handleLengthIndicatorView(state, lengthIndicator);
    handleRangeInputView(state, lengthRangeInput);
    handleIncludeUppercaseCheckboxView(state, includesUppercaseCheckbox);
    handleIncludeLowercaseCheckboxView(state, includesLowercaseCheckbox);
    handleIncludeNumbersCheckboxView(state, includesNumbersCheckbox);
    handleIncludeSymbolsCheckboxView(state, includesSymbolsCheckbox);
    handlePasswordStrengthIndicatorView(state, strengthIndicatorContainer);
  };
}
