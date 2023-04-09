import { PubSub } from './pubsub'
import type { PasswordGeneratorState } from '../types/interfaces/PasswordGeneratorState'

export class StateManager {
  private static instance: StateManager | null = null
  private state: PasswordGeneratorState
  private readonly pubsub: PubSub

  private constructor() {
    this.pubsub = new PubSub()
    this.state = new Proxy(
      {
        selectedLength: 10,
        includesUppercase: true,
        includesLowercase: true,
        includesNumbers: true,
        includesSymbols: true,
        currentPassword: '',
      },
      {
        set: (state, prop, value) => {
          state[prop] = value
          this.pubsub.publish({ ...state, [prop]: value })

          return true
        },
      },
    )
  }

  public static getInstance(): StateManager {
    if (StateManager.instance === null) {
      StateManager.instance = new StateManager()
    }

    return StateManager.instance
  }

  public get currentState(): PasswordGeneratorState {
    return { ...this.state }
  }

  public subscribe(callback: (state: PasswordGeneratorState) => void): void {
    this.pubsub.subscribe(callback)
  }

  public updateState(newState: Partial<PasswordGeneratorState>): void {
    for (const prop in newState) {
      this.state[prop] = newState[prop]
    }
  }

  public handleLengthChange(newLength: number): void {
    this.updateState({ selectedLength: newLength })
  }

  public handleOptionChange(
    optionName: keyof PasswordGeneratorState,
    isChecked: boolean,
  ): void {
    this.updateState({ [optionName]: isChecked })
  }

  public handleGeneratePassword(newPassword: string): void {
    this.updateState({ currentPassword: newPassword })
  }
}
