const setupRangeInputStyling = (elementSelector: string): void => {
  const inputRange = document.querySelector<HTMLInputElement>(elementSelector)

  window.addEventListener('load', () => handlePageLoad(inputRange))
  inputRange.addEventListener('input', handleRangeInputChange)
}

const handlePageLoad = (inputElement: HTMLInputElement): void => {
  setBackgroundBasedOnInputValue(inputElement)
}

const setBackgroundBasedOnInputValue = (
  inputElement: HTMLInputElement,
): void => {
  inputElement.style.backgroundImage = `
	linear-gradient(to right,
	var(--color-primary-400) 0%,
	var(--color-primary-400) ${inputElement.value}%,
	var(--color-neutral-700) ${inputElement.value}%,
	var(--color-neutral-700) 100%)
	`
}

const handleRangeInputChange = (e: Event): void => {
  if (e.target == null) return

  const { target } = e
  setBackgroundBasedOnInputValue(target as HTMLInputElement)
}

export default setupRangeInputStyling

export {
  handlePageLoad,
  setBackgroundBasedOnInputValue,
  handleRangeInputChange,
}
