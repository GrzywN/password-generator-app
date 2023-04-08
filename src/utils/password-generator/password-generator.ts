const UPPERCASE_CHARS = 'QWERTYUIOPASDFGHJKLZXCVBNM'
const LOWERCASE_CHARS = 'qwertyuiopasdfghjklzxcvbnm'
const NUMBER_CHARS = '0123456789'
const SYMBOL_CHARS = '~`!@#$%^&*()-_=+[{]};:\'"\\|,<.>/?'

const PASSWORD_ERRORS = Object.freeze({
  SELECTED_LENGTH_LESS_OR_EQUAL_ZERO: 'Selected length is less or equal zero.',
  DOES_NOT_INCLUDE_CHARACTERS: 'Password does not include characters.',
  LENGTH_IS_GREATER_THAN_SELECTED:
    'Generated password cannot include all required characters due to short length.',
})

interface PasswordGeneratorState {
  selectedLength: number
  includesUppercase: boolean
  includesLowercase: boolean
  includesNumbers: boolean
  includesSymbols: boolean
}

/**
 * Generates a password based on the given state.
 *
 * @param {PasswordGeneratorState} state The state to use to generate the password.
 * @returns {string} The generated password.
 *
 * @throws {Error} If the state is invalid or there is an error during password generation.
 */
function generatePassword(state: PasswordGeneratorState): string {
  throwErrorIfInvalidState(state)

  const {
    selectedLength,
    includesUppercase,
    includesLowercase,
    includesNumbers,
    includesSymbols,
  } = state

  let passwordCharacters = getRequiredIncludedCharacters(state)

  const allSelectedCharacters = [
    ...(includesUppercase ? [...UPPERCASE_CHARS] : []),
    ...(includesLowercase ? [...LOWERCASE_CHARS] : []),
    ...(includesNumbers ? [...NUMBER_CHARS] : []),
    ...(includesSymbols ? [...SYMBOL_CHARS] : []),
  ].join('')

  const getRandomCharacter = getRandomCharacterFromSet(allSelectedCharacters)

  while (passwordCharacters.length < selectedLength) {
    const randomCharacter = getRandomCharacter()

    passwordCharacters.push(randomCharacter)
  }

  passwordCharacters = shuffle(passwordCharacters)

  const password = passwordCharacters.join('')
  return password
}

function throwErrorIfInvalidState(state: PasswordGeneratorState): void {
  const errorMessages = getErrorMessagesFromState(state)

  if (errorMessages.length > 0) {
    const errorMessage = errorMessages.reduce(
      (acc, curr) => acc + '\n' + curr,
      '',
    )
    throw new Error(errorMessage)
  }
}

function getErrorMessagesFromState(state: PasswordGeneratorState): string[] {
  const {
    includesUppercase,
    includesLowercase,
    includesNumbers,
    includesSymbols,
    selectedLength,
  } = state

  const errorMessages: string[] = []

  const howManyCharactersIncluded =
    Number(includesUppercase) +
    Number(includesLowercase) +
    Number(includesNumbers) +
    Number(includesSymbols)

  if (selectedLength <= 0) {
    errorMessages.push(PASSWORD_ERRORS.SELECTED_LENGTH_LESS_OR_EQUAL_ZERO)
  } else if (selectedLength < howManyCharactersIncluded) {
    errorMessages.push(PASSWORD_ERRORS.LENGTH_IS_GREATER_THAN_SELECTED)
  }

  if (
    !includesUppercase &&
    !includesLowercase &&
    !includesNumbers &&
    !includesSymbols
  ) {
    errorMessages.push(PASSWORD_ERRORS.DOES_NOT_INCLUDE_CHARACTERS)
  }

  return errorMessages
}

function getRequiredIncludedCharacters(
  state: PasswordGeneratorState,
): string[] {
  const {
    includesUppercase,
    includesLowercase,
    includesNumbers,
    includesSymbols,
  } = state

  const randomUppercase = getRandomCharacterFromSet(UPPERCASE_CHARS)
  const randomLowercase = getRandomCharacterFromSet(LOWERCASE_CHARS)
  const randomNumber = getRandomCharacterFromSet(NUMBER_CHARS)
  const randomSymbol = getRandomCharacterFromSet(SYMBOL_CHARS)

  const requiredCharacters: string[] = []

  includesUppercase && requiredCharacters.push(randomUppercase())
  includesLowercase && requiredCharacters.push(randomLowercase())
  includesNumbers && requiredCharacters.push(randomNumber())
  includesSymbols && requiredCharacters.push(randomSymbol())

  return requiredCharacters
}

function getRandomCharacterFromSet(characters: string): () => string {
  return () => {
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters.charAt(randomIndex)
  }
}

/**
 * Shuffle the elements of an array randomly and return the shuffled array.
 * This function does not mutate the original array.
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} The shuffled array.
 * @template T
 */
function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}

export { PASSWORD_ERRORS, generatePassword, PasswordGeneratorState, shuffle }
