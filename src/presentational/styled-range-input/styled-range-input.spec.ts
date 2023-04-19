/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { StyledRangeInput } from './styled-range-input'
import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState'
import { PasswordStrengths } from '../../types/enums/PasswordStrengths'

describe('StyledRangeInput', () => {
  let inputElement: HTMLInputElement
  let styledRangeInput: StyledRangeInput
  let state: PasswordGeneratorState

  beforeEach(() => {
    inputElement = document.createElement('input')
    inputElement.type = 'range'
    state = {
      selectedLength: 10,
      includesUppercase: true,
      includesLowercase: true,
      includesNumbers: true,
      includesSymbols: true,
      currentPassword: '',
      passwordStrength: PasswordStrengths.STRONG,
    }

    styledRangeInput = new StyledRangeInput(inputElement, state)
  })

  describe('setup', () => {
    it('should call a setup method', () => {
      const spySetupStyling = vi.spyOn(styledRangeInput, 'setup')

      styledRangeInput.setup()

      expect(spySetupStyling).toHaveBeenCalled()
    })

    it('should set up styling', () => {
      styledRangeInput.setup()

      expect(inputElement.style).not.toBeNull()
    })
  })

  describe('getElement', () => {
    it('should return the input element', () => {
      const result = styledRangeInput.getElement()

      expect(result).toBe(inputElement)
    })
  })
})
