import { PasswordGeneratorState } from '../../types/interfaces/PasswordGeneratorState';

export function handlePasswordPreviewView(state: PasswordGeneratorState, element: HTMLElement): void {
  if (state.currentPassword.length > 0) {
    element.innerText = state.currentPassword;
  }
}
