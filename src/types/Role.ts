export type Role = {
  id: number;
  name: string;
  // TODO: cans
  canInvite: boolean;
  canRemove: boolean;
  canPost: boolean;
  canEdit: boolean;
};
