import { User } from "./user";

export interface UserTableProps {
    uniqueUsers: User[];
    loading: boolean;
    error: string | null;
  }