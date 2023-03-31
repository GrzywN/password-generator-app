import { describe, it, expect } from 'vitest'
import {
  shuffle,
  generatePassword,
  PasswordGeneratorState,
  PASSWORD_ERRORS,
} from './generate-password'

describe('generatePassword', () => {
  it('should generate a password with the correct length and characters', () => {
    const validState: PasswordGeneratorState = {
      selectedLength: 12,
      includesUppercase: true,
      includesLowercase: true,
      includesNumbers: true,
      includesSymbols: true,
    }
    const password = generatePassword(validState)

    expect(password).toHaveLength(12)
    expect(password).toMatch(/[A-Z]/)
    expect(password).toMatch(/[a-z]/)
    expect(password).toMatch(/[0-9]/)
    expect(password).toMatch(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/)
  })

  it('should throw an error if the state is invalid (selectedLength <= 0)', () => {
    const invalidState: PasswordGeneratorState = {
      selectedLength: 0,
      includesUppercase: false,
      includesLowercase: false,
      includesNumbers: false,
      includesSymbols: false,
    }
    expect(() => generatePassword(invalidState)).toThrowError(
      PASSWORD_ERRORS.SELECTED_LENGTH_LESS_OR_EQUAL_ZERO,
    )
  })

  it('should throw an error if the state is invalid (selectedLength < 0)', () => {
    const invalidState: PasswordGeneratorState = {
      selectedLength: -1,
      includesUppercase: false,
      includesLowercase: false,
      includesNumbers: false,
      includesSymbols: false,
    }
    expect(() => generatePassword(invalidState)).toThrowError(
      PASSWORD_ERRORS.SELECTED_LENGTH_LESS_OR_EQUAL_ZERO,
    )
  })

  it('should throw an error if the state is invalid (all includes are set to false)', () => {
    const invalidState: PasswordGeneratorState = {
      selectedLength: 5,
      includesUppercase: false,
      includesLowercase: false,
      includesNumbers: false,
      includesSymbols: false,
    }

    expect(() => generatePassword(invalidState)).toThrow(
      PASSWORD_ERRORS.DOES_NOT_INCLUDE_CHARACTERS,
    )
  })

  it('should throw an error if generated password cannot include all required characters due to short length', () => {
    const invalidState: PasswordGeneratorState = {
      selectedLength: 2,
      includesUppercase: false,
      includesLowercase: true,
      includesNumbers: true,
      includesSymbols: true,
    }

    expect(() => generatePassword(invalidState)).toThrow(
      PASSWORD_ERRORS.LENGTH_IS_GREATER_THAN_SELECTED,
    )
  })

  it('should not throw an error if the state is valid', () => {
    const validState: PasswordGeneratorState = {
      selectedLength: 5,
      includesUppercase: true,
      includesLowercase: true,
      includesNumbers: true,
      includesSymbols: true,
    }
    expect(() => {
      generatePassword(validState)
    }).not.toThrow()
  })
})

describe('shuffle', () => {
  it('should shuffle the array', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffledArr = shuffle(arr)

    expect(shuffledArr).not.toEqual(arr)
  })

  it('should return the same array with the same length', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffledArr = shuffle(arr)

    expect(arr.length).toEqual(shuffledArr.length)
    expect(arr).toContain(shuffledArr[0])
    expect(arr).toContain(shuffledArr[shuffledArr.length - 1])
  })

  it('should not mutate the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    shuffle(arr)

    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('should return an empty array if input is empty', () => {
    expect(shuffle([])).toEqual([])
  })

  it('should return an array with one element if input has only one element', () => {
    const arr = [1]

    expect(shuffle(arr)).toEqual(arr)
  })
})
