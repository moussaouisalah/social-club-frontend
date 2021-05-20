import { members } from "../../temporaryData.json";
import { Member } from "../../types/Member";
import { Pagination } from "../../types/Pagination";

export const memberProvider = {
  getManyByUser: (userId: number): Promise<Member[]> => {
    return new Promise((resolve, reject) => {
      const membersList = members.filter((member) => userId === member.userId);
      resolve(membersList);
    });
  },
  getManyByClub: (clubId: number): Promise<Member[]> => {
    return new Promise((resolve, reject) => {
      const membersList = members.filter((member) => clubId === member.clubId);
      resolve(membersList);
    });
  },
  createMember: () => {
    // TODO
  },
  updateMember: (userId: number, clubId: number, newRoleId: number) => {
    return new Promise((resolve, reject) => {
      resolve("membersList");
    });
  },
  deleteMember: (userId: number, clubId: number) => {
    return new Promise((resolve, reject) => {
      resolve("membersList");
    });
  },
};
