import { type PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState'

export interface ComponentStrategy<T extends HTMLElement> {
  setup: () => void
  getElement: () => T
}

export interface StatefulComponentStrategy<T extends HTMLElement> {
  setup: () => void
  getElement: () => T
  handleStateChange: (newState: PasswordGeneratorState) => void
}
