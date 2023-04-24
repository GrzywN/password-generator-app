import { AppState } from '../../types/interfaces/State';

export function handlePasswordPreviewView(state: AppState, element: HTMLElement): void {
  if (state.currentPassword.length > 0) {
    element.innerText = state.currentPassword;
  }
}
