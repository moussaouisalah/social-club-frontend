import { members } from "../../temporaryData.json";
import { Member, MemberType } from "../../types/Member";
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
  changeMember: (
    userId: number,
    clubId: number,
    newType: MemberType
  ): Promise<Member> => {
    return new Promise((resolve, reject) => {
      // TODO
      const memberArray = members.filter(
        (member) => clubId === member.clubId && userId === member.userId
      );
      if (memberArray.length === 0) {
        resolve({
          clubId,
          userId,
          type: newType,
          roleId: 1,
        });
      } else {
        resolve({ ...memberArray[0], type: newType });
      }
    });
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
