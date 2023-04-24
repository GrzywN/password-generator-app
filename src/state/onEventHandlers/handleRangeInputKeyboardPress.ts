import { RANGE_INPUT_SCALE_BASED_ON_HUNDRED_DIVISION } from '../../utils/constants';
import { StateManager } from '../state-manager';

const UP = 'ArrowUp';
const RIGHT = 'ArrowRight';
const DOWN = 'ArrowDown';
const LEFT = 'ArrowLeft';

export function handleRangeInputKeyboardPress(stateManager: StateManager): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent): void => {
    const minSelectedLength = 1;
    const maxSelectedLength = 100 / RANGE_INPUT_SCALE_BASED_ON_HUNDRED_DIVISION + 1;

    if (event.key === DOWN || event.key === LEFT) {
      event.preventDefault();
      decreaseSelectedLength(stateManager, minSelectedLength);
    } else if (event.key === UP || event.key === RIGHT) {
      event.preventDefault();
      increaseSelectedLength(stateManager, maxSelectedLength);
    }
  };
}

function decreaseSelectedLength(stateManager: StateManager, minSelectedLength: number): void {
  const currentStateSnapshot = stateManager.currentState;
  const newLength = currentStateSnapshot.selectedLength - 1;

  if (newLength >= minSelectedLength) {
    stateManager.handleLengthChange(newLength);
  }
}

function increaseSelectedLength(stateManager: StateManager, maxSelectedLength: number): void {
  const currentStateSnapshot = stateManager.currentState;
  const newLength = currentStateSnapshot.selectedLength + 1;

  if (newLength <= maxSelectedLength) {
    stateManager.handleLengthChange(newLength);
  }
}
