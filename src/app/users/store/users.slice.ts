import { createSlice } from '@reduxjs/toolkit';
import { generateUsers } from './users.actions';
import { UsersState } from '../types/user-state';



const initialState: UsersState = {
  users: [],
  pending: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateUsers.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(generateUsers.fulfilled, (state, action) => {
        state.pending = false;
        state.users = action.payload;
      })
      .addCase(generateUsers.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
