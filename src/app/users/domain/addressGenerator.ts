import seedrandom from 'seedrandom';

export const generateAddress = (faker: any, region: string, seed: string): string => {
  const rng = seedrandom(seed);
  const components: string[] = [];

  switch (region) {
    case "CA":
      components.push(
        faker.location.streetAddress(),
        faker.location.city(),
        faker.location.buildingNumber()
      );
      break;
    case "DE":
      components.push(
        faker.location.streetAddress(),
        faker.location.city()
      );
      break;
    case "PL":
      components.push(
        faker.location.city(),
        faker.location.street()
      );
      break;
    default:
      components.push(faker.location.streetAddress());
      break;
  }

  const count = Math.floor(rng() * components.length) + 1;
  const shuffledComponents = components.sort(() => rng() - 0.5);
  const selectedComponents = shuffledComponents.slice(0, count);

  return selectedComponents.join(', ');
};
