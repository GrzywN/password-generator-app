import setupRangeInputStyling from "./modules/setup-range-input-styling";
import displayPasswordStrength, {
  PasswordStrengths,
} from "./modules/display-password-strength";
import "./style.css";

const rangeInputSelector = "[data-input-range]";
const passwordStrengthHtmlDataset = "data-password-strength";

setupRangeInputStyling(rangeInputSelector);
displayPasswordStrength(passwordStrengthHtmlDataset, PasswordStrengths.MEDIUM);
