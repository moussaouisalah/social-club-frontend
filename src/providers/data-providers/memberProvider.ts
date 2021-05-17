import { members } from "../../temporaryData.json";
import { Member } from "../../types/Member";

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
};
