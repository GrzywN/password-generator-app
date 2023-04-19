import { PasswordStrengths } from '../enums/PasswordStrengths'

export interface PasswordGeneratorState {
  selectedLength: number
  includesUppercase: boolean
  includesLowercase: boolean
  includesNumbers: boolean
  includesSymbols: boolean
  currentPassword: string
  passwordStrength: PasswordStrengths
}
