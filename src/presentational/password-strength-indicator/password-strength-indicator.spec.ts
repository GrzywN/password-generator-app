/**
 * @jest-environment jsdom
 */

import { describe, beforeEach, it, expect } from 'vitest'
import { PasswordStrengths } from '../../types/enums/PasswordStrengths'
import { PasswordStrengthIndicator } from './password-strength-indicator'

describe('PasswordStrengthIndicator', () => {
  let indicatorElement: HTMLDivElement
  let indicator: PasswordStrengthIndicator

  beforeEach(() => {
    indicatorElement = document.createElement('div')
    indicatorElement.innerHTML = `
      <template data-pg-password-strength="too-weak">
        <div class="too-weak-indicator"></div>
      </template>
      <template data-pg-password-strength="weak">
        <div class="weak-indicator"></div>
      </template>
      <template data-pg-password-strength="medium">
        <div class="medium-indicator"></div>
      </template>
      <template data-pg-password-strength="strong">
        <div class="strong-indicator"></div>
      </template>
    `

    const initialState = {
      selectedLength: 4,
      includesUppercase: true,
      includesLowercase: true,
      includesNumbers: true,
      includesSymbols: true,
      currentPassword: '',
      passwordStrength: PasswordStrengths.TOO_WEAK,
    }

    indicator = new PasswordStrengthIndicator(indicatorElement, initialState)
    indicator.setup()
  })

  describe('handleStateChange', () => {
    it('should set the password strength indicator to "too weak"', () => {
      const templateElement = indicatorElement.querySelector(
        '[data-pg-password-strength="too-weak"]',
      ) as HTMLTemplateElement
      const expectedContent = templateElement.content.cloneNode(true)
      const expectedIndicator = document.createElement('div')
      expectedIndicator.appendChild(expectedContent)

      const newState = {
        selectedLength: 4,
        includesUppercase: true,
        includesLowercase: true,
        includesNumbers: true,
        includesSymbols: true,
        currentPassword: '',
        passwordStrength: PasswordStrengths.TOO_WEAK,
      }
      indicator.handleStateChange(newState)

      expect(indicatorElement.innerHTML).toEqual(expectedIndicator.innerHTML)
    })

    it('should set the password strength indicator to "weak"', () => {
      const templateElement = indicatorElement.querySelector(
        '[data-pg-password-strength="weak"]',
      ) as HTMLTemplateElement
      const expectedContent = templateElement.content.cloneNode(true)
      const expectedIndicator = document.createElement('div')
      expectedIndicator.appendChild(expectedContent)

      const newState = {
        selectedLength: 7,
        includesUppercase: true,
        includesLowercase: true,
        includesNumbers: true,
        includesSymbols: false,
        currentPassword: '',
        passwordStrength: PasswordStrengths.WEAK,
      }
      indicator.handleStateChange(newState)

      expect(indicatorElement.innerHTML).toEqual(expectedIndicator.innerHTML)
    })

    it('should set the password strength indicator to "medium"', () => {
      const templateElement = indicatorElement.querySelector(
        '[data-pg-password-strength="medium"]',
      ) as HTMLTemplateElement
      const expectedContent = templateElement.content.cloneNode(true)
      const expectedIndicator = document.createElement('div')
      expectedIndicator.appendChild(expectedContent)

      const newState = {
        selectedLength: 10,
        includesUppercase: true,
        includesLowercase: true,
        includesNumbers: true,
        includesSymbols: false,
        currentPassword: '',
        passwordStrength: PasswordStrengths.MEDIUM,
      }
      indicator.handleStateChange(newState)

      expect(indicatorElement.innerHTML).toEqual(expectedIndicator.innerHTML)
    })

    it('should set the password strength indicator to "strong"', () => {
      const templateElement = indicatorElement.querySelector(
        '[data-pg-password-strength="strong"]',
      ) as HTMLTemplateElement
      const expectedContent = templateElement.content.cloneNode(true)
      const expectedIndicator = document.createElement('div')
      expectedIndicator.appendChild(expectedContent)

      const newState = {
        selectedLength: 10,
        includesUppercase: true,
        includesLowercase: true,
        includesNumbers: true,
        includesSymbols: true,
        currentPassword: '',
        passwordStrength: PasswordStrengths.STRONG,
      }
      indicator.handleStateChange(newState)

      expect(indicatorElement.innerHTML).toEqual(expectedIndicator.innerHTML)
    })

    it('should throw an error if an invalid password strength is provided', () => {
      const newState = {
        selectedLength: 10,
        includesUppercase: true,
        includesLowercase: true,
        includesNumbers: true,
        includesSymbols: true,
        currentPassword: '',
        passwordStrength: 'invalid-strength' as PasswordStrengths,
      }

      expect(() => {
        indicator.handleStateChange(newState)
      }).toThrow('password-strength-indicator: Wrong password strength provided.')
    })
  })
})
