import React, { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import userFallbackImage from "../../assets/userImage.jpg";

import "./style.scss";

import logo from "../../assets/filmFlare-logo.png";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUser, signOut } from "firebase/auth";
import { auth, database, refdb } from "../../firebase";
import { remove } from "firebase/database";
import { AuthContext } from "../../context/authContext";

const Header = ({ noHeader }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileCondition, setMobileCondition] = useState("");
  const [show, setShow] = useState("top");
  const [query, setQuery] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const headerHandler = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      if (currentScrollY > lastScrollY) {
        setShow("hide");
        setMobileCondition("");
      } else {
        setShow("show");
      }

      setLastScrollY(currentScrollY);
    } else {
      setShow("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerHandler);

    return () => {
      window.removeEventListener("scroll", headerHandler);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileCondition("");
    setShowProfile(false);
  };

  const openMobileMenu = () => {
    setShowSearch(false);
    setShowProfile(false);
    setMobileCondition("showMobileMenu");
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length !== 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileCondition("");
  };

  const profileHandler = () => {
    setShowProfile((previous) => !previous);
    setMobileCondition("");
    setShowSearch(false);
  };

  const deleteUserHandler = () => {
    deleteUser(user)
      .then(async () => {
        await remove(refdb(database, `users/` + user.uid));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    noHeader || (
      <header className={`header ${mobileCondition} ${show}`}>
        <ContentWrapper>
          <div className="logo" onClick={() => navigate("/home")}>
            <img src={logo} />
            <span>FILMFLARE</span>
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={() => navigationHandler("movie")}>
              Movies
            </li>
            <li className="menuItem" onClick={() => navigationHandler("tv")}>
              TV Shows
            </li>
            <li className="menuItem">
              <HiOutlineSearch onClick={() => openSearch()} />
            </li>
            {user && (
              <div className="profileSection">
                <div
                  className="userImage"
                  onClick={() => setShowProfile((previous) => !previous)}
                >
                  <img src={user?.photoURL || userFallbackImage} />
                </div>
              </div>
            )}
          </ul>

          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={() => openSearch()} />
            {mobileCondition === "showMobileMenu" ? (
              <VscChromeClose
                onClick={() => {
                  setMobileCondition("hideMobileMenu");
                }}
              />
            ) : (
              <SlMenu onClick={() => openMobileMenu()} />
            )}
            {user && (
              <div className="profileSection">
                <div
                  className="userImage"
                  onClick={() => {
                    profileHandler();
                  }}
                >
                  <img src={user?.photoURL || userFallbackImage} />
                </div>
              </div>
            )}
          </div>
        </ContentWrapper>

        {showSearch && (
          <div className="searchBar">
            <ContentWrapper>
              <div className="searchInput">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for movies or TV shows"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => searchQueryHandler(e)}
                />
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </ContentWrapper>
          </div>
        )}

        {showProfile && (
          <div className="profileBanner">
            <div className="profileImageSection">
              <img src={user?.photoURL || userFallbackImage} />
              <span>{user?.displayName}</span>
            </div>
            <div className="profileBannerItems">
              <div className="profileBannerItem">WatchList</div>
              <div
                className="profileBannerItem"
                onClick={() => {
                  signOut(auth);
                  navigate(`/`);
                }}
              >
                Logout
              </div>
              <div
                className="profileBannerItem"
                onClick={() => deleteUserHandler()}
              >
                DeleteAccount
              </div>
            </div>
          </div>
        )}
      </header>
    )
  );
};

export default Header;
