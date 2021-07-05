import React, { useState } from "react";
import { Role } from "../../types/Role";
import { primaryColor } from "../../theme.json";
import "./invite-member-card.css";
import { User } from "../../types/User";
import { SearchResult } from "../../types/SearchResult";
import { miscProvider } from "../../providers/data-providers/miscProvider";
import defaultProfile from "../../assets/default-profile.jpg";
import { memberProvider } from "../../providers/data-providers/memberProvider";
import { Member, MemberType } from "../../types/Member";

type InviteMemberCardProps = {
  clubId: number;
  members: Member[];
  clubRoles: Role[];
  color?: string;
  addMemberToList: (newMember: Member) => void;
};

const makeStyles = (color: string) => ({
  color: {
    color,
  } as React.CSSProperties,
  borderColor: {
    borderColor: color,
  } as React.CSSProperties,
  border: {
    border: "solid 1px " + color,
  } as React.CSSProperties,
  backgroundColor: {
    backgroundColor: color,
  } as React.CSSProperties,
  removeSpan: { cursor: "pointer", color: "red" } as React.CSSProperties,
});

const InviteMemberCard = ({
  clubId,
  members,
  clubRoles,
  color = primaryColor,
  addMemberToList,
}: InviteMemberCardProps) => {
  const [selectedUser, setSelectedUser] = useState<SearchResult | undefined>(
    undefined
  );
  const [isDropDownEnabled, setDropDownEnabled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // TODO: useCallback
  const handleSearch = () => {
    miscProvider
      .searchUsers(searchInput)
      .then((searchResults) =>
        setSearchResults(
          searchResults.filter(
            (searchResult) =>
              !members.some((member) => searchResult.id === member.user.id)
          )
        )
      );
  };

  const handleSearchInputChange = (newValue: string) => {
    setSearchInput(newValue);
    if (newValue === "") setSearchResults([]);
    else {
      handleSearch();
    }
  };

  const handleSelectedUserChange = (newSelected: SearchResult) => {
    setSelectedUser(newSelected);
    setSearchInput("");
    setSearchResults([]);
  };

  const handleRemoveSelectedUser = () => {
    setSelectedUser(undefined);
  };

  const handleInvite = () => {
    if (!selectedUser) return;
    memberProvider
      .changeMember(selectedUser?.id, clubId, MemberType.invited)
      .then((newMember) => {
        addMemberToList(newMember);
      });
  };

  const styles = makeStyles(color);
  return (
    <div className="invite-user-card" style={styles.border}>
      {selectedUser ? (
        <div>
          {selectedUser.name}{" "}
          <span onClick={handleRemoveSelectedUser} style={styles.removeSpan}>
            X
          </span>
        </div>
      ) : (
        <input
          className="invite-user-input"
          placeholder="Rechercher"
          value={searchInput}
          onChange={(event) => handleSearchInputChange(event.target.value)}
        />
      )}
      {searchResults.length > 0 && (
        <div className="invite-member-search-results">
          {searchResults.map((searchResult, key) => (
            <div
              className="navbar-search-item"
              key={key}
              onClick={() => handleSelectedUserChange(searchResult)}
            >
              <img
                className="nav-search-image"
                src={searchResult?.profileImage || defaultProfile}
                alt="profile"
              />
              <div className="nav-search-name">{searchResult.name}</div>
            </div>
          ))}
        </div>
      )}

      <select
        className="invite-user-select"
        style={{ ...styles.borderColor, ...styles.color }}
      >
        <option value="role">Role</option>
        {clubRoles.map((clubRole, key) => (
          <option value={clubRole.id} key={key}>
            {clubRole.name}
          </option>
        ))}
      </select>
      <button
        className="invite-user-button"
        style={styles.backgroundColor}
        disabled={!selectedUser}
        onClick={handleInvite}
      >
        Inviter
      </button>
    </div>
  );
};

export default InviteMemberCard;
