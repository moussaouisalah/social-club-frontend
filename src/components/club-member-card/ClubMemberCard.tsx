import React, { useState } from "react";
import { Role } from "../../types/Role";
import defaultProfile from "../../assets/default-profile.jpg";
import "./club-member-card.css";
import { Check, Close, Create, Delete } from "@material-ui/icons";
import { primaryColor } from "../../theme.json";
import { useHistory } from "react-router-dom";
import EditMemberCard from "../edit-member-card/EditMemberCard";
import { memberProvider } from "../../providers/data-providers/memberProvider";
import { Member, MemberType } from "../../types/Member";

type ClubMemberCardProps = {
  userId: number;
  clubId: number;
  profileImage?: string;
  firstName: string;
  lastName: string;
  role?: Role;
  member?: Member;
  currentUserRole?: Role;
  currentUserMember?: Member;
  color?: string;
  clubRoles: Role[];
  editMemberInList: (userId: number, newMemberData: Member) => void;
  deleteMemberFromList: (userId: number) => void;
};

const makeStyles = (color: string) => ({
  color: {
    color,
  } as React.CSSProperties,
  border: {
    border: "solid 1px " + color,
  } as React.CSSProperties,
  clickable: {
    cursor: "pointer",
  } as React.CSSProperties,
});

const ClubMemberCard = ({
  userId,
  clubId,
  profileImage = defaultProfile,
  firstName,
  lastName,
  role,
  member,
  currentUserRole,
  currentUserMember,
  color = primaryColor,
  clubRoles,
  editMemberInList,
  deleteMemberFromList,
}: ClubMemberCardProps) => {
  const [isEdited, setEdited] = useState(false);
  const history = useHistory();

  const handleRedirectToUser = () => {
    history.push("/user/" + userId);
  };

  const editMemberRole = (newRoleId: number) => {
    memberProvider.updateMember(userId, clubId, newRoleId).then((data) => {
      // TODO update data.
      setEdited(false);
    });
  };

  const deleteMember = () => {
    memberProvider.deleteMember(userId, clubId).then((data) => {
      // TODO update data
    });
  };

  const handleAcceptMember = () => {
    memberProvider
      .changeMember(userId, clubId, MemberType.member)
      .then((newMemberData) => {
        editMemberInList(userId, newMemberData);
      });
  };

  const handleRefuseMember = () => {
    memberProvider.changeMember(userId, clubId, MemberType.refused).then(() => {
      deleteMemberFromList(userId);
    });
  };

  const styles = makeStyles(color);
  if (isEdited)
    return (
      <EditMemberCard
        profileImage={profileImage}
        firstName={firstName}
        lastName={lastName}
        clubRoles={clubRoles}
        currentRoleId={currentUserRole?.id || 0}
        color={color}
        editHandler={editMemberRole}
        cancelHandler={() => setEdited(false)}
      />
    );
  return (
    <div className="member-card" style={styles.border}>
      <div className="member-data-container">
        <img
          className="member-image"
          src={profileImage || defaultProfile}
          alt="profile"
        />
        <div className="member-data">
          <div
            className="member-name"
            style={{ ...styles.color, ...styles.clickable }}
            onClick={handleRedirectToUser}
          >
            {firstName} {lastName}
          </div>
          <div className="member-role">
            {role?.name}{" "}
            {(member?.type === MemberType.invited ||
              member?.type === MemberType.requested) &&
              " (en attente)"}
          </div>
        </div>
      </div>
      <div className="member-buttons">
        {currentUserMember &&
        currentUserMember.type === MemberType.member &&
        member?.type === MemberType.member
          ? currentUserRole?.canEdit && (
              <div
                className="member-edit-button"
                onClick={() => setEdited(true)}
              >
                <Create />
              </div>
            )
          : member?.type === MemberType.requested &&
            currentUserRole?.canInvite && (
              <div
                className="member-edit-button"
                onClick={() => handleAcceptMember()}
              >
                <Check />
              </div>
            )}
        {currentUserMember &&
        currentUserMember.type === MemberType.member &&
        member?.type === MemberType.member
          ? currentUserRole?.canRemove && (
              <div className="member-delete-button">
                <Delete onClick={handleRefuseMember} />
              </div>
            )
          : member?.type === MemberType.requested &&
            currentUserRole?.canInvite && (
              <div
                className="member-delete-button"
                onClick={handleRefuseMember}
              >
                <Close />
              </div>
            )}
      </div>
    </div>
  );
};

export default ClubMemberCard;
