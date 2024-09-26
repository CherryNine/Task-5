import { Random } from 'random-js';

const random = new Random();

export const generateAddress = (faker: any, region: string): string => {
  const components: string[] = [];
  
  switch (region) {
    case "CA":
      components.push(faker.location.streetAddress(), faker.location.city(), faker.location.buildingNumber());
      break;
    case "DE":
      components.push(faker.location.streetAddress(), faker.location.city());
      break;
    case "PL":
      components.push(faker.location.city(), faker.location.street());
      break;
    default:
      components.push(faker.location.streetAddress());
      break;
  }

  const count = random.integer(1, components.length);
  const shuffledComponents = random.shuffle(components);
  const selectedComponents = shuffledComponents.slice(0, count);

  return selectedComponents.join(', ');
};
