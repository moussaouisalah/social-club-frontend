import { Club } from "./Club";
import { Role } from "./Role";
import { User } from "./User";

export type Member = {
  userId: number;
  clubId: number;
  type: string; // TODO: change to enum
  roleId: number;

  user?: User;
  role?: Role;
  club?: Club;
};
