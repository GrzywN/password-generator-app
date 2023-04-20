import { StateManager } from './state/state-manager';
import {
  handleSelectedLengthChange,
  handleCheckboxOptionChange,
  handleGeneratePassword,
} from './state/onEventHandlers';
import { handleStateChange } from './state/onStateChangeHandlers';
import './styles/main.css';

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
  throw new Error('main.ts: One of the elements is null. At this point, app would break anyway.');
}

const stateManager: StateManager = StateManager.getInstance();

const handleStateChangeWithElements = handleStateChange({
  passwordPreview,
  lengthIndicator,
  includesUppercaseCheckbox,
  includesLowercaseCheckbox,
  includesNumbersCheckbox,
  includesSymbolsCheckbox,
  lengthRangeInput,
  strengthIndicatorContainer,
});

const handleStateOnInit = (): void => {
  handleStateChangeWithElements(stateManager.currentState);
};

handleStateOnInit();
stateManager.subscribe(handleStateChangeWithElements);

lengthRangeInput.addEventListener('input', handleSelectedLengthChange(stateManager));
includesUppercaseCheckbox.addEventListener('input', handleCheckboxOptionChange(stateManager));
includesLowercaseCheckbox.addEventListener('input', handleCheckboxOptionChange(stateManager));
includesNumbersCheckbox.addEventListener('input', handleCheckboxOptionChange(stateManager));
includesSymbolsCheckbox.addEventListener('input', handleCheckboxOptionChange(stateManager));
generatePasswordButton.addEventListener('click', handleGeneratePassword(stateManager));
