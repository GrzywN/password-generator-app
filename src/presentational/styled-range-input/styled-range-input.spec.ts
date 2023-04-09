/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { StyledRangeInput } from './styled-range-input'

describe('StyledRangeInput', () => {
  let inputElement: HTMLInputElement
  let styledRangeInput: StyledRangeInput

  beforeEach(() => {
    inputElement = document.createElement('input')
    inputElement.type = 'range'
    styledRangeInput = new StyledRangeInput()
  })

  afterEach(() => {
    inputElement.removeEventListener('input', styledRangeInput.handleChange)
  })

  it('should call the method to set up styling on init', () => {
    const spySetupStylingOnInit = vi.spyOn(styledRangeInput, 'setupStylingOnInit')

    styledRangeInput.setup(inputElement)

    expect(spySetupStylingOnInit).toHaveBeenCalled()
  })

  it('should call the method to set up styling on value change', () => {
    const spySetupStylingOnValueChange = vi.spyOn(styledRangeInput, 'setupStylingOnValueChange')

    styledRangeInput.setup(inputElement)

    expect(spySetupStylingOnValueChange).toHaveBeenCalled()
  })

  it('should return the element', () => {
    const result = styledRangeInput.setup(inputElement)

    expect(result).toBe(inputElement)
  })

  it('should get the element', () => {
    styledRangeInput.setup(inputElement)

    const result = styledRangeInput.getElement()

    expect(result).toBe(inputElement)
  })
})
