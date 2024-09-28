import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "types/error.type";
import seedrandom from 'seedrandom';
import { getFakerInstance } from "../domain/fakerInstance";
import { generateAddress } from "../domain/addressGenerator";
import { applyErrors } from "../domain/errorHandlers";

export const generateUsers = createAsyncThunk(
  "users/generate",
  async (
    {
      region,
      errorCount,
      seed,
      page,
    }: { region: string; errorCount: number; seed: number; page: number },
    { rejectWithValue }
  ) => {
    try {
      const faker = getFakerInstance(region);
      faker.seed(seed + page);

      const rng = seedrandom((seed + page).toString());
      const users: { id: string; name: string; address: string; phone: string }[] = [];

      for (let i = 0; i < 20; i++) {
        const name = faker.person.fullName();
        const address = generateAddress(faker, region, (seed + page).toString());
        const phone = faker.phone.number();

        const totalErrors = Math.floor(errorCount);
        
        let adjustedErrors;
        if (errorCount % 1 !== 0) {
          adjustedErrors = Math.floor(rng() * 2) === 0  ? totalErrors : totalErrors + 1;
        } else {
          adjustedErrors = totalErrors;
        }

        const nameErrors = Math.floor(rng() * (adjustedErrors + 1));
        const addressErrors = Math.floor(rng() * (adjustedErrors - nameErrors + 1));
        const phoneErrors = adjustedErrors - nameErrors - addressErrors;

        const faultyName = applyErrors(name, nameErrors, faker, false, (seed + page).toString());
        const faultyAddress = applyErrors(address, addressErrors, faker, false, (seed + page).toString());
        const faultyPhone = applyErrors(phone, phoneErrors, faker, true, (seed + page).toString());

        users.push({
          id: faker.string.uuid(),
          name: faultyName,
          address: faultyAddress,
          phone: faultyPhone,
        });
      }

      return users;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);
