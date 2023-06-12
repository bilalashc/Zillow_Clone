import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import ProfileButton from "./ProfileButton";
import Signup from "../Auth/Tabs/Index";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { signin } from "../../store/auth/auth.actions";
import "./Header.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  height: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  borderRadius: "10px",
};

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);
  const sessionUser = JSON.parse(localStorage.getItem("current_user"));

  const handleDemoLogin = async () => {
    dispatch(signin("bilal@gmail.com", "ashfaque"));
  };

  const handleSell = () => {
    if (!sessionUser) {
      alert("Please login first");
    } else {
      navigate("/sell");
    }
  };

  const navigateFavorites = () => {
    navigate("/favorites");
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <div className="session-links">
          <span style={{ cursor: "pointer" }} onClick={() => handleDemoLogin()}>
            Demo User
          </span>
          {/* <div style={{ cursor: "pointer" }} onClick={handleOpenSignIn}>
            Sign In
          </div> */}
          <Modal
            open={openSignIn}
            onClose={handleCloseSignIn}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <log />
            </Box>
          </Modal>
          <div
            style={{ marginLeft: "25px", cursor: "pointer" }}
            onClick={handleOpenSignUp}
          >
            Sign In
          </div>
          <Modal
            open={openSignUp}
            onClose={handleCloseSignUp}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Signup />
            </Box>
          </Modal>
        </div>
      </>
    );
  }

  return (
    <header className="header">
      <div className="header-links">
        <span style={{ cursor: "pointer" }} onClick={handleSell}>
          Sell
        </span>
        {sessionUser && (
          <>
            <span
              style={{ marginLeft: "25px", cursor: "pointer" }}
              onClick={navigateFavorites}
            >
              Favorites
            </span>
            <span
              style={{ marginLeft: "25px", cursor: "pointer" }}
              onClick={ () => navigate("/user_list")}
            >
              User List
            </span>
          </>
        )}
      </div>
      <div className="logo-container">
        <NavLink exact to="/">
          <img
            style={{ height: "30px" }}
            src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
            className="logo"
            alt="Logo"
          />
        </NavLink>
      </div>
      {sessionLinks}
    </header>
  );
}

export default Header;
