import { evaluatePasswordStrengthBasedOnState } from '../libs/password-strength-evaluator';
import { PasswordStrengths } from '../types/enums/PasswordStrengths';
import type { PasswordGeneratorState } from '../types/interfaces/PasswordGeneratorState';
import { PubSub } from './pubsub';

export class StateManager {
  private static instance: StateManager | null = null;
  private readonly state: PasswordGeneratorState;
  private readonly pubsub: PubSub;

  private constructor(onInit: (state: PasswordGeneratorState) => void) {
    this.pubsub = new PubSub();
    this.state = new Proxy(
      {
        selectedLength: 10,
        includesUppercase: true,
        includesLowercase: true,
        includesNumbers: true,
        includesSymbols: true,
        currentPassword: '',
        passwordStrength: PasswordStrengths.STRONG,
      },
      {
        set: (state, prop, value) => {
          state[prop] = value;
          this.pubsub.publish({ ...state, [prop]: value });

          return true;
        },
      }
    );

    onInit({ ...this.state });
  }

  public static getInstance(onInit: (state: PasswordGeneratorState) => void = function () {}): StateManager {
    if (StateManager.instance === null) {
      StateManager.instance = new StateManager(onInit);
    }

    return StateManager.instance;
  }

  public get currentState(): PasswordGeneratorState {
    return { ...this.state };
  }

  public subscribe(callback: (state: PasswordGeneratorState) => void): void {
    this.pubsub.subscribe(callback);
  }

  public updateState(newState: Partial<PasswordGeneratorState>): void {
    for (const prop in newState) {
      this.state[prop] = newState[prop];
    }

    const passwordStrength = evaluatePasswordStrengthBasedOnState(this.state);
    if (passwordStrength !== this.state.passwordStrength) {
      this.state.passwordStrength = passwordStrength;
    }
  }

  public handleLengthChange(newLength: number): void {
    this.updateState({ selectedLength: newLength });
  }

  public handleOptionChange(optionName: keyof PasswordGeneratorState, isChecked: boolean): void {
    this.updateState({ [optionName]: isChecked });
  }

  public handleGeneratePassword(newPassword: string): void {
    this.updateState({ currentPassword: newPassword });
  }
}
