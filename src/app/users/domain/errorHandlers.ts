import seedrandom from 'seedrandom';

export const applyErrors = (value: string, errorCount: number, faker: any, isPhone: boolean = false, seed: string): string => {
  const rng = seedrandom(seed);
  let faultyValue = value;

  const maxErrors = Math.min(errorCount, value.length);
  
  for (let j = 0; j < maxErrors; j++) {
    const errorType = Math.floor(rng() * (isPhone ? 2 : 3));

    if (errorType === 0) {
      faultyValue = removeRandomCharacter(faultyValue, rng);
    } else if (!isPhone) {
      faultyValue = addRandomCharacter(faultyValue, faker, rng);
    } else {
      faultyValue = swapAdjacentCharacters(faultyValue, rng);
    }
  }
  
  return faultyValue;
};

const removeRandomCharacter = (str: string, rng: seedrandom.PRNG): string => {
  const index = Math.floor(rng() * str.length);
  return str.slice(0, index) + str.slice(index + 1);
};

const addRandomCharacter = (str: string, faker: any, rng: seedrandom.PRNG): string => {
  const randomChar = faker.string.alpha();
  const index = Math.floor(rng() * (str.length + 1));
  return str.slice(0, index) + randomChar + str.slice(index);
};

const swapAdjacentCharacters = (str: string, rng: seedrandom.PRNG): string => {
  if (str.length < 2) return str;
  const index = Math.floor(rng() * (str.length - 1));
  return (
    str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2)
  );
};
