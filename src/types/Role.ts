export type Role = {
  roleId: number;
  name: string;
  // TODO: cans
  canInvite: boolean;
  canRemove: boolean;
  canPost: boolean;
  canEdit: boolean;
};
