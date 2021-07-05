import { Club } from "./Club";
import { Role } from "./Role";
import { User } from "./User";

export enum MemberType {
  member = "member",
  requested = "requested",
  invited = "invited",
  refused = "refused",
}

export type Member = {
  userId: number;
  clubId: number;
  memberType: string; // TODO: change to enum
  roleId: number;

  user: User;
  role: Role;
  club: Club;
};
