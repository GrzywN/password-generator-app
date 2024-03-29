import { PasswordStrengthEvaluation } from './services/password-strength-evaluation';
import {
  handleCheckboxOptionChange,
  handleCopyToClipboard,
  handleGeneratePassword,
  handleRangeInputKeyboardPress,
  handleSelectedLengthChange,
} from './state/onEventHandlers';
import { handleStateChange } from './state/onStateChangeHandlers';
import { StateManager } from './state/state-manager';
import './styles/main.css';
import type { AppState } from './types/interfaces/State';

const copyToClipboardButton = document.querySelector<HTMLButtonElement>('[data-pg-copy-to-clipboard]');
const passwordPreview = document.querySelector<HTMLHeadingElement>('[data-pg-generated-password]');
const lengthIndicator = document.querySelector<HTMLSpanElement>('[data-pg-length-indicator]');
const includesUppercaseCheckbox = document.querySelector<HTMLInputElement>('[name="includesUppercase"]');
const includesLowercaseCheckbox = document.querySelector<HTMLInputElement>('[name="includesLowercase"]');
const includesNumbersCheckbox = document.querySelector<HTMLInputElement>('[name="includesNumbers"]');
const includesSymbolsCheckbox = document.querySelector<HTMLInputElement>('[name="includesSymbols"]');
const generatePasswordButton = document.querySelector<HTMLButtonElement>('[data-pg-password-generate-button]');
const lengthRangeInput = document.querySelector<HTMLInputElement>('[data-pg-length-range-input]');
const strengthIndicatorContainer = document.querySelector<HTMLDivElement>('[data-pg-password-strength-indicator]');

if (
  copyToClipboardButton == null ||
  passwordPreview == null ||
  lengthIndicator == null ||
  includesUppercaseCheckbox == null ||
  includesLowercaseCheckbox == null ||
  includesNumbersCheckbox == null ||
  includesSymbolsCheckbox == null ||
  generatePasswordButton == null ||
  lengthRangeInput == null ||
  strengthIndicatorContainer == null
) {
  throw new Error('main.ts: One of the elements is null. At this point, this app would break anyway.');
}

const handleStateChangeWithElements = handleStateChange({
  copyToClipboardButton,
  passwordPreview,
  lengthIndicator,
  includesUppercaseCheckbox,
  includesLowercaseCheckbox,
  includesNumbersCheckbox,
  includesSymbolsCheckbox,
  lengthRangeInput,
  strengthIndicatorContainer,
});

const handleStateOnInit = (state: AppState): void => {
  handleStateChangeWithElements(state);
};

const stateManager: StateManager = StateManager.getInstance(handleStateOnInit, new PasswordStrengthEvaluation());
stateManager.subscribe(handleStateChangeWithElements);

copyToClipboardButton.addEventListener('click', handleCopyToClipboard(stateManager));
lengthRangeInput.addEventListener('input', handleSelectedLengthChange(stateManager));
lengthRangeInput.addEventListener('keydown', handleRangeInputKeyboardPress(stateManager));
includesUppercaseCheckbox.addEventListener('input', handleCheckboxOptionChange(stateManager));
includesLowercaseCheckbox.addEventListener('input', handleCheckboxOptionChange(stateManager));
includesNumbersCheckbox.addEventListener('input', handleCheckboxOptionChange(stateManager));
includesSymbolsCheckbox.addEventListener('input', handleCheckboxOptionChange(stateManager));
generatePasswordButton.addEventListener('click', handleGeneratePassword(stateManager));
