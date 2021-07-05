import { members } from "../../temporaryData.json";
import { Member, MemberType } from "../../types/Member";
import { Pagination } from "../../types/Pagination";
import { axios } from "../localAxios";
import { SERVER_URL, MEMBERS_ENDPOINT } from "../../config.json";

export const memberProvider = {
  getManyByUser: (userId: number): Promise<Member[]> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + MEMBERS_ENDPOINT + `?userId=${userId}`)
        .then((response: any) => {
          resolve(response.data);
        });
    });
  },
  getManyByClub: (clubId: number): Promise<Member[]> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + MEMBERS_ENDPOINT + `?clubId=${clubId}`)
        .then((response: any) => {
          resolve(response.data);
        });
    });
  },
  changeMember: (
    userId: number,
    clubId: number,
    newType: MemberType
  ): Promise<Member> => {
    return new Promise((resolve, reject) => {
      axios
        .put(SERVER_URL + MEMBERS_ENDPOINT, {
          user: { id: userId },
          club: { id: clubId },
          memberType: newType.toString(),
        })
        .then((response: any) => {
          resolve(response.data);
        });
    });
  },
  updateMember: (userId: number, clubId: number, newRoleId: number) => {
    return new Promise((resolve, reject) => {
      axios
        .put(SERVER_URL + MEMBERS_ENDPOINT, {
          user: { id: userId },
          club: { id: clubId },
          role: { id: newRoleId },
        })
        .then((response: any) => {
          resolve(response.data);
        });
    });
  },
  deleteMember: (userId: number, clubId: number) => {
    return new Promise((resolve, reject) => {
      axios
        .put(SERVER_URL + MEMBERS_ENDPOINT, {
          user: { id: userId },
          club: { id: clubId },
          memberType: "refused",
        })
        .then((response: any) => {
          resolve(response.data);
        });
    });
  },
};
