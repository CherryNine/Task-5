import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse } from "types/error.type";
import { Random } from 'random-js';
import { getFakerInstance } from "../domain/fakerInstance";
import { generateAddress } from "../domain/addressGenerator";
import { applyErrors } from "../domain/errorHandlers";

const random = new Random();

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
      const users: { id: string; name: string; address: string; phone: string }[] = [];

      for (let i = 0; i < 20; i++) {
        const name = faker.person.fullName();
        const address = generateAddress(faker, region);
        const phone = faker.phone.number();

        const totalErrors = Math.floor(errorCount);
        const nameErrors = random.integer(0, totalErrors + 1);
        const addressErrors = random.integer(0, totalErrors - nameErrors + 1);
        const phoneErrors = totalErrors - nameErrors - addressErrors;

        const faultyName = applyErrors(name, nameErrors, faker);
        const faultyAddress = applyErrors(address, addressErrors, faker);
        const faultyPhone = applyErrors(phone, phoneErrors, faker, true);

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
