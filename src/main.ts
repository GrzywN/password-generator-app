import './style.css';

const inputRange = document.querySelector<HTMLInputElement>('[data-input-range]')!;

const changeRangeInputBackgroundOnValueChange = (inputElement: HTMLInputElement) => {
		inputElement.style.backgroundImage = `linear-gradient(to right, var(--color-neon-green) 0%, var(--color-neon-green) ${inputElement.value}%, var(--color-very-dark-grey) ${inputElement.value}%, var(--color-very-dark-grey) 100%)`;
}

const handlePageLoad = (rangeInput: HTMLInputElement) => {
		changeRangeInputBackgroundOnValueChange(rangeInput);
}

const handleRangeInputChange = (e: InputEvent) => {
		if (e.target == null) return;

		const { target } = e;
		changeRangeInputBackgroundOnValueChange(target as HTMLInputElement);
}

window.addEventListener("load", () => handlePageLoad(inputRange));
inputRange?.addEventListener("input", handleRangeInputChange);

