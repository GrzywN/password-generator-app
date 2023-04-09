import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState'
import { handleIncludeLowercaseCheckboxView } from './handleIncludeLowercaseCheckboxView'
import { handleIncludeNumbersCheckboxView } from './handleIncludeNumbersCheckboxView'
import { handleIncludeSymbolsCheckboxView } from './handleIncludeSymbolsCheckboxView'
import { handleIncludeUppercaseCheckboxView } from './handleIncludeUppercaseCheckboxView'
import { handleLengthIndicatorView } from './handleLengthIndicatorView'
import { handlePasswordPreviewView } from './handlePasswordPreviewView'
import { handleRangeInputView } from './handleRangeInputView'
import { handlePasswordStrengthIndicatorView } from './handlePasswordStrengthIndicatorView'

export interface DomElements {
  passwordPreview: HTMLElement
  lengthIndicator: HTMLElement
  lengthRangeInput: HTMLInputElement
  includesUppercaseCheckbox: HTMLInputElement
  includesLowercaseCheckbox: HTMLInputElement
  includesNumbersCheckbox: HTMLInputElement
  includesSymbolsCheckbox: HTMLInputElement
}

export function handleStateChange(domElements: DomElements): (state: PasswordGeneratorState) => void {
  const {
    passwordPreview,
    lengthIndicator,
    lengthRangeInput,
    includesUppercaseCheckbox,
    includesLowercaseCheckbox,
    includesNumbersCheckbox,
    includesSymbolsCheckbox,
  } = domElements

  return (state: PasswordGeneratorState) => {
    handlePasswordPreviewView(state, passwordPreview)
    handleLengthIndicatorView(state, lengthIndicator)
    handleRangeInputView(state, lengthRangeInput)
    handleIncludeUppercaseCheckboxView(state, includesUppercaseCheckbox)
    handleIncludeLowercaseCheckboxView(state, includesLowercaseCheckbox)
    handleIncludeNumbersCheckboxView(state, includesNumbersCheckbox)
    handleIncludeSymbolsCheckboxView(state, includesSymbolsCheckbox)

    // TODO:    refactor PasswordStrengthIndicator to a presentational component
    //          and make it consistent (also pass an element)
    handlePasswordStrengthIndicatorView(state)
  }
}
