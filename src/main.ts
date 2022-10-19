import setupRangeInputStyling from "./functions/setupRangeInputStyling";
import displayPasswordStrength, {
  PasswordStrengths,
} from "./functions/displayPasswordStrength";
import "./style.css";

const rangeInputSelector = "[data-input-range]";
const passwordStrengthHtmlDataset = "data-password-strength";

setupRangeInputStyling(rangeInputSelector);
displayPasswordStrength(passwordStrengthHtmlDataset, PasswordStrengths.MEDIUM);
