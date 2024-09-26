import { fakerEN_CA, fakerDE, fakerPL } from "@faker-js/faker";

export const getFakerInstance = (region: string) => {
  switch (region) {
    case "CA":
      return fakerEN_CA;
    case "DE":
      return fakerDE;
    case "PL":
      return fakerPL;
    default:
      return fakerEN_CA;
  }
};
