import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { StateManager } from './state-manager'
import { PasswordGeneratorState } from '../types/interfaces/PasswordGeneratorState'
import { PasswordStrengths } from '../types/enums/PasswordStrengths'

describe('StateManager', () => {
  let stateManager: StateManager
  let initialState: PasswordGeneratorState

  beforeEach(() => {
    stateManager = StateManager.getInstance()
    initialState = stateManager.currentState
  })

  afterEach(() => {
    stateManager.updateState(initialState)
  })

  describe('getInstance', () => {
    it('should return a singleton instance of StateManager', () => {
      const instance1 = StateManager.getInstance()
      const instance2 = StateManager.getInstance()

      expect(instance1).toBeInstanceOf(StateManager)
      expect(instance2).toBeInstanceOf(StateManager)
      expect(instance1).toBe(instance2)
    })
  })

  describe('currentState', () => {
    it('should return the current state of the StateManager', () => {
      const currentState = stateManager.currentState

      expect(currentState).toEqual(initialState)
    })
  })

  describe('subscribe', () => {
    it('should call the provided callback whenever the state changes', () => {
      const callback = vi.fn()

      stateManager.subscribe(callback)
      stateManager.handleLengthChange(15)

      expect(callback).toHaveBeenCalled()
      expect(callback).toHaveBeenCalledWith({ ...initialState, selectedLength: 15 })
    })
  })

  describe('updateState', () => {
    it('should update the state of the StateManager', () => {
      stateManager.updateState({ includesUppercase: false })

      expect(stateManager.currentState.includesUppercase).toBe(false)
    })

    it('should publish the updated state to subscribers', () => {
      const callback = vi.fn()

      stateManager.subscribe(callback)
      stateManager.updateState({ includesNumbers: false })

      expect(callback).toHaveBeenCalled()
      expect(callback).toHaveBeenCalledWith({ ...initialState, includesNumbers: false })
    })

    it('should update the passwordStrength field of the state', () => {
      stateManager.updateState({ currentPassword: 'q2]UC0@' })

      expect(stateManager.currentState.passwordStrength).toBe(PasswordStrengths.MEDIUM)
    })
  })

  describe('handleLengthChange', () => {
    it('should update the selectedLength field of the state', () => {
      stateManager.handleLengthChange(12)

      expect(stateManager.currentState.selectedLength).toBe(12)
    })
  })

  describe('handleOptionChange', () => {
    it('should update the specified option in the state', () => {
      stateManager.handleOptionChange('includesSymbols', false)

      expect(stateManager.currentState.includesSymbols).toBe(false)
    })
  })

  describe('handleGeneratePassword', () => {
    it('should update the currentPassword field of the state', () => {
      stateManager.handleGeneratePassword('newpassword')

      expect(stateManager.currentState.currentPassword).toBe('newpassword')
    })
  })
})
