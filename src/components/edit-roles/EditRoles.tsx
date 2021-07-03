import { Check, Close } from "@material-ui/icons";
import React, { useState } from "react";
import { roleProvider } from "../../providers/data-providers/roleProvider";
import { primaryColor } from "../../theme.json";
import { Role } from "../../types/Role";
import "./edit-roles.css";

type EditRolesProps = {
  color?: string;
  clubId: number | undefined;
  roles: Role[];
  addRoleToList: (newRole: Role) => void;
};

const EditRoles = ({
  color = primaryColor,
  clubId,
  roles,
  addRoleToList,
}: EditRolesProps) => {
  const [isBeingCreated, setBeingCreated] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [canInvite, setCanInvite] = useState(false);
  const [canPost, setCanPost] = useState(false);
  const [canRemove, setCanRemove] = useState(false);

  const handleCreateRole = () => {
    if (!clubId) return;
    roleProvider
      .create(clubId, roleName, canEdit, canInvite, canPost, canRemove)
      .then((newRole) => {
        setRoleName("");
        setCanEdit(false);
        setCanInvite(false);
        setCanPost(false);
        setCanRemove(false);
        setBeingCreated(false);
        addRoleToList(newRole);
      });
  };

  return (
    <>
      <h1 className="role-title">Roles</h1>
      <button
        className="edit-roles-button"
        style={{ backgroundColor: isBeingCreated ? "red" : "green" }}
        onClick={() => setBeingCreated(!isBeingCreated)}
      >
        {isBeingCreated ? "Annuler" : "Ajouter"}
      </button>
      {isBeingCreated && (
        <div>
          <table>
            <tr>
              <td>
                <input
                  className="sign-up-input"
                  type="text"
                  placeholder="Nom"
                  value={roleName}
                  onChange={(event) => setRoleName(event.target.value)}
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name">can Edit</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={canEdit}
                  onChange={() => setCanEdit(!canEdit)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name">can Invite</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={canInvite}
                  onChange={() => setCanInvite(!canInvite)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name">can Post</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={canPost}
                  onChange={() => setCanPost(!canPost)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name">can Remove</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={canRemove}
                  onChange={() => setCanRemove(!canRemove)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  className="edit-roles-button"
                  style={{ backgroundColor: "green" }}
                  onClick={handleCreateRole}
                >
                  Ajouter
                </button>
              </td>
              <td></td>
            </tr>
          </table>
        </div>
      )}
      <div className="table">
        <div className="row header" style={{ backgroundColor: color }}>
          <div className="cell">Nom</div>
          <div className="cell">Can Edit</div>
          <div className="cell">Can Invite</div>
          <div className="cell">Can Post</div>
          <div className="cell">Can Remove</div>
        </div>

        {roles.map((role, key) => (
          <div className="row" key={key}>
            <div className="cell">{role.name}</div>
            <div className="cell">{role.canEdit ? <Check /> : <Close />}</div>
            <div className="cell">{role.canInvite ? <Check /> : <Close />}</div>
            <div className="cell">{role.canPost ? <Check /> : <Close />}</div>
            <div className="cell">{role.canRemove ? <Check /> : <Close />}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditRoles;
