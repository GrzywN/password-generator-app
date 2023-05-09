import { PasswordStrengthEvaluation } from '../services/password-strength-evaluation';
import { PasswordStrengths } from '../types/enums/PasswordStrengths';
import type { AppState } from '../types/interfaces/State';
import { PubSub } from './pubsub';

export class StateManager {
  private static instance: StateManager | null = null;
  private readonly state: AppState;
  private readonly pubsub: PubSub;
  private readonly passwordStrengthEvaluation: PasswordStrengthEvaluation;

  private constructor(onInit: (state: AppState) => void, passwordStrengthEvaluation: PasswordStrengthEvaluation) {
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
        clipboard: {
          copied: false,
          copyingFailed: false,
        },
      },
      {
        set: (state, prop, value) => {
          state[prop] = value;
          this.pubsub.publish({ ...state, [prop]: value });

          return true;
        },
      }
    );

    this.passwordStrengthEvaluation = passwordStrengthEvaluation;
    onInit({ ...this.state });
  }

  public static getInstance(
    onInit: (state: AppState) => void = function () {},
    passwordStrengthEvaluation: PasswordStrengthEvaluation = new PasswordStrengthEvaluation()
  ): StateManager {
    if (StateManager.instance === null) {
      StateManager.instance = new StateManager(onInit, passwordStrengthEvaluation);
    }

    return StateManager.instance;
  }

  public get currentState(): AppState {
    return { ...this.state };
  }

  public subscribe(callback: (state: AppState) => void): void {
    this.pubsub.subscribe(callback);
  }

  public updateState(newState: Partial<AppState>): void {
    for (const prop in newState) {
      this.state[prop] = newState[prop];
    }

    const passwordStrength = this.passwordStrengthEvaluation.evaluatePasswordStrength(this.state);

    if (passwordStrength !== this.state.passwordStrength) {
      this.state.passwordStrength = passwordStrength;
    }
  }

  public handleLengthChange(newLength: number): void {
    this.updateState({ selectedLength: newLength });
  }

  public handleOptionChange(optionName: keyof AppState, isChecked: boolean): void {
    this.updateState({ [optionName]: isChecked });
  }

  public handleGeneratePassword(newPassword: string): void {
    this.updateState({ currentPassword: newPassword });
  }
}
