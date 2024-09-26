import { User } from "./user";

export interface UsersState {
  users: User[];
  pending: boolean;
  error: string | null;
}