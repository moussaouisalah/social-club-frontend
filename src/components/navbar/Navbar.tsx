import React, { useState } from "react";
import "./navbar.css";
import defaultImage from "../../assets/default-profile.jpg";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { User } from "../../types/User";
import { ClickAwayListener } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { authProvider } from "../../providers/authProvider";
import defaultUserProfile from "../../assets/default-profile.jpg";
import defaultClubProfile from "../../assets/default-club.png";
import { SearchResult, SearchResultTypes } from "../../types/SearchResult";
import { miscProvider } from "../../providers/data-providers/miscProvider";

type NavbarProps = {
  user: User | undefined;
};

const Navbar = ({ user }: NavbarProps) => {
  const [isDropDownEnabled, setDropDownEnabled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const history = useHistory();

  // TODO: useCallback
  const handleSearch = () => {
    miscProvider
      .search(searchInput)
      .then((searchResults) => setSearchResults(searchResults));
  };

  const handleSearchInputChange = (newValue: string) => {
    setSearchInput(newValue);
    if (newValue === "") setSearchResults([]);
    else {
      handleSearch();
    }
  };

  const handleSearchRedirect = (
    itemId: number,
    itemType: SearchResultTypes
  ) => {
    setSearchInput("");
    setSearchResults([]);
    if (itemType === SearchResultTypes.User) history.push("/user/" + itemId);
    else history.push("/club/" + itemId);
  };

  const handleRedirectToProfile = () => {
    setDropDownEnabled(false);
    user && history.push("/user/" + user.id);
  };

  const handleLogout = () => {
    setDropDownEnabled(false);
    authProvider.logout();
    history.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo"></div>
      <div>
        <input
          type="text"
          placeholder="Rechercher"
          className="text-input"
          value={searchInput}
          onChange={(event) => handleSearchInputChange(event.target.value)}
        />
        {searchResults.length > 0 && (
          <div className="navbar-search-results">
            {searchResults.map((searchResult, key) => (
              <div
                className="navbar-search-item"
                key={key}
                onClick={() =>
                  handleSearchRedirect(searchResult.id, searchResult.type)
                }
              >
                <img
                  className="nav-search-image"
                  src={
                    searchResult?.profileImage ||
                    searchResult.type === SearchResultTypes.User
                      ? defaultUserProfile
                      : defaultClubProfile
                  }
                  alt="profile"
                />
                <div className="nav-search-name">{searchResult.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="nav-user">
          {user && (
            <>
              <img
                className="user-image"
                src={(user.profileImage || defaultImage) as string}
                alt="user"
              />
              <div className="user-name">
                {user.firstName} {user.lastName}
              </div>
              <div
                className="user-dropdown"
                onClick={() => setDropDownEnabled(!isDropDownEnabled)}
              >
                <KeyboardArrowDownIcon />
              </div>
            </>
          )}
          {isDropDownEnabled && (
            <ClickAwayListener onClickAway={() => setDropDownEnabled(false)}>
              <div className="user-dropdown-modal">
                <div
                  className="user-dropdown-modal-item"
                  onClick={handleRedirectToProfile}
                >
                  Profil
                </div>
                <div
                  className="user-dropdown-modal-item"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </div>
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
