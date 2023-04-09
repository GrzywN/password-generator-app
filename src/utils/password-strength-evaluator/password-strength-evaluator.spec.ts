import { describe, it, expect } from 'vitest'
import { PasswordGeneratorState } from "../../types/interfaces/PasswordGeneratorState"
import { PasswordStrengths } from "../../types/enums/PasswordStrengths"
import {
  evaluatePasswordStrengthBasedOnState,
  evaluatePasswordStrengthBasedOnPassword,
  hasLowercaseLetter,
  hasUppercaseLetter,
  hasNumber,
  hasSymbol
} from "./password-strength-evaluator"

describe("Password Strength Evaluator", () => {
  describe("evaluatePasswordStrengthBasedOnState", () => {
    it("should return 'TOO_WEAK' for passwords with length less than 6", () => {
      const state: PasswordGeneratorState = {
        selectedLength: 5,
        currentPassword: "",
        includesLowercase: true,
        includesUppercase: true,
        includesNumbers: true,
        includesSymbols: true
      }

      const result = evaluatePasswordStrengthBasedOnState(state)

      expect(result).toEqual(PasswordStrengths.TOO_WEAK)
    })

    it("should return 'WEAK' for passwords with length less than 10 and not including all types of characters", () => {
      const state: PasswordGeneratorState = {
        selectedLength: 8,
        currentPassword: "",
        includesLowercase: true,
        includesUppercase: false,
        includesNumbers: true,
        includesSymbols: false
      }

      const result = evaluatePasswordStrengthBasedOnState(state)

      expect(result).toEqual(PasswordStrengths.WEAK)
    })

    it("should return 'MEDIUM' for passwords with length less than 10 and including all types of characters", () => {
      const state: PasswordGeneratorState = {
        selectedLength: 9,
        currentPassword: "",
        includesLowercase: true,
        includesUppercase: true,
        includesNumbers: true,
        includesSymbols: true
      }

      const result = evaluatePasswordStrengthBasedOnState(state)

      expect(result).toEqual(PasswordStrengths.MEDIUM)
    })

    it("should return 'MEDIUM' for passwords with length 10 or more and not including all types of characters", () => {
      const state: PasswordGeneratorState = {
        selectedLength: 10,
        currentPassword: "",
        includesLowercase: true,
        includesUppercase: true,
        includesNumbers: false,
        includesSymbols: false
      }

      const result = evaluatePasswordStrengthBasedOnState(state)

      expect(result).toEqual(PasswordStrengths.MEDIUM)
    })

    it("should return 'STRONG' for passwords with length 10 or more and including all types of characters", () => {
      const state: PasswordGeneratorState = {
        selectedLength: 12,
        currentPassword: "",
        includesLowercase: true,
        includesUppercase: true,
        includesNumbers: true,
        includesSymbols: true
      }

      const result = evaluatePasswordStrengthBasedOnState(state)

      expect(result).toEqual(PasswordStrengths.STRONG)
    })
  })

  describe("evaluatePasswordStrengthBasedOnPassword", () => {
    it("should return correct password strength based on given password", () => {
      const password = "Abcd1234!@#$"

      const result = evaluatePasswordStrengthBasedOnPassword(password)

      expect(result).toEqual(PasswordStrengths.STRONG)
    })
  })

  describe("hasLowercaseLetter", () => {
    it("should return true if password contains a lowercase letter", () => {
      const password = "Abc123!@#"

      const result = hasLowercaseLetter(password)

      expect(result).toEqual(true)
    })

    it("should return false if password does not contain a lowercase letter", () => {
      const password = "ABC123!@#"

      const result = hasLowercaseLetter(password)

      expect(result).toEqual(false)
    })

    it("should return false if password is empty", () => {
      const password = ""

      const result = hasLowercaseLetter(password)

      expect(result).toEqual(false)
    })
  })

  describe("hasUppercaseLetter", () => {
    it("should return true if password contains an uppercase letter", () => {
      const password = "Abc123!@#"

      const result = hasUppercaseLetter(password)

      expect(result).toEqual(true)
    })

    it("should return false if password does not contain an uppercase letter", () => {
      const password = "abc123!@#"

      const result = hasUppercaseLetter(password)

      expect(result).toEqual(false)
    })

    it("should return false if password is empty", () => {
      const password = ""

      const result = hasUppercaseLetter(password)

      expect(result).toEqual(false)
    })
  })

  describe("hasNumber", () => {
    it("should return true if password contains a number", () => {
      const password = "Abc123!@#"

      const result = hasNumber(password)

      expect(result).toEqual(true)
    })

    it("should return false if password does not contain a number", () => {
      const password = "Abc!@#"

      const result = hasNumber(password)

      expect(result).toEqual(false)
    })

    it("should return false if password is empty", () => {
      const password = ""

      const result = hasNumber(password)

      expect(result).toEqual(false)
    })
  })

  describe("hasSymbol", () => {
    it("should return true if password contains a symbol", () => {
      const password = "Abc123!@#"

      const result = hasSymbol(password)

      expect(result).toEqual(true)
    })

    it("should detect all the symbols which can be generated", () => {
      const SYMBOL_CHARS = '~`!@#$%^&*()-_=+[{]};:\'"\\|,<.>/?'

      Array.from(SYMBOL_CHARS).forEach((char: string) => {
        const result = hasSymbol(char)

        expect(result).toEqual(true)
      })
    })

    it("should return false if password does not contain a symbol", () => {
      const password = "Abc123"

      const result = hasSymbol(password)

      expect(result).toEqual(false)
    })

    it("should return false if password is empty", () => {
      const password = ""

      const result = hasSymbol(password)

      expect(result).toEqual(false)
    })
  })
})
