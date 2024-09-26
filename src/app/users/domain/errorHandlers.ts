import { Random } from 'random-js';

const random = new Random();

export const applyErrors = (value: string, errorCount: number, faker: any, isPhone: boolean = false): string => {
  let faultyValue = value;
  for (let j = 0; j < errorCount; j++) {
    const errorType = random.integer(0, isPhone ? 1 : 2);
    if (errorType === 0) {
      faultyValue = removeRandomCharacter(faultyValue);
    } else if (!isPhone) {
      faultyValue = addRandomCharacter(faultyValue, faker);
    } else {
      faultyValue = swapAdjacentCharacters(faultyValue);
    }
  }
  return faultyValue;
};

const removeRandomCharacter = (str: string): string => {
  const index = random.integer(0, str.length - 1);
  return str.slice(0, index) + str.slice(index + 1);
};

const addRandomCharacter = (str: string, faker: any): string => {
  const randomChar = faker.string.alpha();
  const index = random.integer(0, str.length);
  return str.slice(0, index) + randomChar + str.slice(index);
};

const swapAdjacentCharacters = (str: string): string => {
  if (str.length < 2) return str;
  const index = random.integer(0, str.length - 2);
  return (
    str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2)
  );
};
