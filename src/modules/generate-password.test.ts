import { describe, it, expect } from "vitest";
import generatePassword, {
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
} from "./generate-password";

const validState: IPasswordGeneratorState = {
  selectedLength: 5,
  includesUppercase: true,
  includesLowercase: true,
  includesNumbers: true,
  includesSymbols: true,
};

const lengthIsLessThanZeroState: IPasswordGeneratorState = {
  selectedLength: -1,
  includesUppercase: true,
  includesLowercase: true,
  includesNumbers: true,
  includesSymbols: true,
};

const allIncludesFalseState: IPasswordGeneratorState = {
  selectedLength: 5,
  includesUppercase: false,
  includesLowercase: false,
  includesNumbers: false,
  includesSymbols: false,
};

const uppercaseCharacterRegexp = /[A-Z]/;
const lowercaseCharacterRegexp = /[a-z]/;
const numberCharacterRegexp = /[0-9]/;
const symbolCharacterRegexp = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

describe.concurrent("generatePassword", () => {
  it("generates a password based on state", () => {
    const password = generatePassword(validState);

    const isValid =
      uppercaseCharacterRegexp.test(password) &&
      lowercaseCharacterRegexp.test(password) &&
      numberCharacterRegexp.test(password) &&
      symbolCharacterRegexp.test(password);

    expect(isValid).toBeTruthy();
  });

  it("throws an error if state is invalid (selectedLength <= 0)", () => {
    expect(() => {
      generatePassword(lengthIsLessThanZeroState);
    }).toThrow(PasswordGeneratorErrors.SELECTED_LENGTH_LESS_OR_EQUAL_ZERO);
  });

  it("throws an error if state is invalid (all includes are set to false)", () => {
    expect(() => {
      generatePassword(allIncludesFalseState);
    }).toThrow(PasswordGeneratorErrors.DOES_NOT_INCLUDE_CHARACTERS);
  });
});

describe.concurrent("throwErrorIfInvalidState", () => {
  it("throws an error if the length is less or equal 0", () => {
    expect(() => {
      throwErrorIfInvalidState(lengthIsLessThanZeroState);
    }).toThrow(PasswordGeneratorErrors.SELECTED_LENGTH_LESS_OR_EQUAL_ZERO);
  });

  it("throws an error if password does not include characters", () => {
    expect(() => {
      generatePassword(allIncludesFalseState);
    }).toThrow(PasswordGeneratorErrors.DOES_NOT_INCLUDE_CHARACTERS);
  });

  it("does not throw an error if the state is valid", () => {
    expect(() => {
      generatePassword(validState);
    }).not.toThrow();
  });
});

describe.concurrent("generates random characters properly", () => {
  it("gets random uppercase character based on CharacterTypes", () => {
    const character = getRandomUppercaseLetter();
    const stringIncludesCharacter =
      CharacterTypes.UPPERCASE.includes(character);

    expect(stringIncludesCharacter).toBeTruthy();
  });

  it("gets random lowercase character based on CharacterTypes", () => {
    const character = getRandomLowercaseLetter();
    const stringIncludesCharacter =
      CharacterTypes.LOWERCASE.includes(character);

    expect(stringIncludesCharacter).toBeTruthy();
  });

  it("gets random number character based on CharacterTypes", () => {
    const character = getRandomNumberCharacter();
    const stringIncludesCharacter = CharacterTypes.NUMBERS.includes(character);

    expect(stringIncludesCharacter).toBeTruthy();
  });

  it("gets random symbol character based on CharacterTypes", () => {
    const character = getRandomSymbolCharacter();
    const stringIncludesCharacter = CharacterTypes.SYMBOLS.includes(character);

    expect(stringIncludesCharacter).toBeTruthy();
  });

  it("gets random uppercase character", () => {
    const randomCharacter = getRandomUppercaseLetter();

    const isValid = uppercaseCharacterRegexp.test(randomCharacter);

    expect(isValid).toBeTruthy();
  });

  it("gets random lowercase character", () => {
    const randomCharacter = getRandomLowercaseLetter();

    const isValid = lowercaseCharacterRegexp.test(randomCharacter);

    expect(isValid).toBeTruthy();
  });

  it("gets random number character", () => {
    const randomCharacter = getRandomNumberCharacter();

    const isValid = numberCharacterRegexp.test(randomCharacter);

    expect(isValid).toBeTruthy();
  });

  it("gets random symbol character", () => {
    const randomCharacter = getRandomSymbolCharacter();

    const isValid = symbolCharacterRegexp.test(randomCharacter);

    expect(isValid).toBeTruthy();
  });

  it("gets random character", () => {
    const testCharactersString = "aB1!";
    const randomCharacter = getRandomCharacter(testCharactersString);
    const testRegexp = /[aB1!]/;

    const isValid = testRegexp.test(randomCharacter);

    expect(isValid).toBeTruthy();
  });
});

describe.concurrent("getShuffledPassword", () => {
  it("returns string which contains all characters included in password", () => {
    const testPassword = "aB1!";
    const shuffledTestPassword = getShuffledPassword(testPassword);

    const includesCharacters =
      shuffledTestPassword.includes(testPassword[0]) &&
      shuffledTestPassword.includes(testPassword[1]) &&
      shuffledTestPassword.includes(testPassword[2]) &&
      shuffledTestPassword.includes(testPassword[3]);

    expect(includesCharacters).toBeTruthy();
  });
});
