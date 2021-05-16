import { members } from "../../temporaryData.json";

export const getManyByUser = (userId: number) => {
  return new Promise((resolve, reject) => {
    const membersList = members.filter((member) => userId === member.userId);
    resolve(membersList);
  });
};

export const getManyByClub = (clubId: number) => {
  return new Promise((resolve, reject) => {
    const membersList = members.filter((member) => clubId === member.clubId);
    resolve(membersList);
  });
};

export const createMember = () => {
  // TODO
};
