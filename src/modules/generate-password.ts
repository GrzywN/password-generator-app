enum CharacterTypes {
  UPPERCASE = 'QWERTYUIOPASDFGHJKLZXCVBNM',
  LOWERCASE = 'qwertyuiopasdfghjklzxcvbnm',
  NUMBERS = '0123456789',
  SYMBOLS = '~`!@#$%^&*()-_=+[{]};:\'"\\|,<.>/?',
}

enum PasswordGeneratorErrors {
  SELECTED_LENGTH_LESS_OR_EQUAL_ZERO = 'Selected length is less or equal zero.',
  DOES_NOT_INCLUDE_CHARACTERS = 'Password does not include characters.',
  LENGTH_IS_GREATER_THAN_SELECTED = "Generated password's length is greater than selected length.",
}

interface IPasswordGeneratorState {
  selectedLength: number
  includesUppercase: boolean
  includesLowercase: boolean
  includesNumbers: boolean
  includesSymbols: boolean
}

const generatePassword = (state: IPasswordGeneratorState): string => {
  throwErrorIfInvalidState(state)

  const {
    selectedLength,
    includesUppercase,
    includesLowercase,
    includesNumbers,
    includesSymbols,
  } = state

  let password = ''

  if (includesUppercase) password += getRandomUppercaseLetter()
  if (includesLowercase) password += getRandomLowercaseLetter()
  if (includesNumbers) password += getRandomNumberCharacter()
  if (includesSymbols) password += getRandomSymbolCharacter()

  while (password.length < selectedLength)
    password += getRandomCharacterBasedOnState(state)

  password = getShuffledPassword(password)

  return password
}

const throwErrorIfInvalidState = (state: IPasswordGeneratorState): void => {
  const {
    selectedLength,
    includesUppercase,
    includesLowercase,
    includesNumbers,
    includesSymbols,
  } = state

  if (selectedLength <= 0) {
    throw new Error(PasswordGeneratorErrors.SELECTED_LENGTH_LESS_OR_EQUAL_ZERO)
  } else if (
    !includesUppercase &&
    !includesLowercase &&
    !includesNumbers &&
    !includesSymbols
  ) {
    throw new Error(PasswordGeneratorErrors.DOES_NOT_INCLUDE_CHARACTERS)
  }
}

const getRandomUppercaseLetter = (): string => {
  return getRandomCharacter(CharacterTypes.UPPERCASE)
}

const getRandomLowercaseLetter = (): string => {
  return getRandomCharacter(CharacterTypes.LOWERCASE)
}

const getRandomNumberCharacter = (): string => {
  return getRandomCharacter(CharacterTypes.NUMBERS)
}

const getRandomSymbolCharacter = (): string => {
  return getRandomCharacter(CharacterTypes.SYMBOLS)
}

const getRandomCharacterBasedOnState = (
  state: IPasswordGeneratorState,
): string => {
  let allSelectedCharacters = ''

  const {
    includesUppercase,
    includesLowercase,
    includesNumbers,
    includesSymbols,
  } = state

  if (includesUppercase) allSelectedCharacters += CharacterTypes.UPPERCASE
  if (includesLowercase) allSelectedCharacters += CharacterTypes.LOWERCASE
  if (includesNumbers) allSelectedCharacters += CharacterTypes.NUMBERS
  if (includesSymbols) allSelectedCharacters += CharacterTypes.SYMBOLS

  return getRandomCharacter(allSelectedCharacters)
}

const getRandomCharacter = (str: string): string => {
  return str.charAt(Math.floor(Math.random() * str.length))
}

const getShuffledPassword = (password: string): string => {
  // TODO: zmienic zeby uwzglednialo przypadki kiedy są te same znaki i petla zeby skutecznie sie shufflowalo

  let shuffledPassword: string

  do {
    shuffledPassword = password
      .split('')
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .join()
  } while (shuffledPassword !== password)

  return shuffledPassword
}

export default generatePassword
export {
  IPasswordGeneratorState,
  CharacterTypes,
  PasswordGeneratorErrors,
  throwErrorIfInvalidState,
  getRandomUppercaseLetter,
  getRandomLowercaseLetter,
  getRandomNumberCharacter,
  getRandomSymbolCharacter,
  getRandomCharacter,
  getShuffledPassword,
}
