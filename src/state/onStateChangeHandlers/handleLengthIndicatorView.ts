import { AppState } from '../../types/interfaces/State';

export function handleLengthIndicatorView(state: AppState, element: HTMLElement): void {
  element.innerText = state.selectedLength.toString();
}
