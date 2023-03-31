import setupRangeInputStyling from './modules/setup-range-input-styling'
import displayPasswordStrength, {
  PasswordStrengths,
} from './modules/display-password-strength'
import generatePassword from './modules/generate-password'
import './style.css'

const rangeInputSelector = '[data-input-range]'
// TODO: change to make it consistent
const passwordStrengthHtmlDataset = 'data-password-strength'
const buttonSelector = '[data-password-button]'

const button = document.querySelector<HTMLButtonElement>(buttonSelector)!

button.addEventListener('click', handleGenerate)

const handleGenerate = () => {}

setupRangeInputStyling(rangeInputSelector)
displayPasswordStrength(passwordStrengthHtmlDataset, PasswordStrengths.MEDIUM)
