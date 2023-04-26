import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import * as sessionActions from "./../../store/session";
import "./Navigation.css";
import { Link, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";

function Navigation() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    dispatch(sessionActions.logout());
  };

  const handleMock = () => {
    return dispatch(
      sessionActions.login({
        credential: "bilal@gmail.com",
        password: "ashfaque",
      })
    );
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ul className="container">
      <li>
        <Link style={{ cursor: "pointer" }} to="/">
          Home
        </Link>
      </li>
      <li>
        <img src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"></img>
      </li>
      <div
        style={{
          display: "flex",
          marginRight: "45px",
          width: "150px",
          justifyContent: "space-between",
        }}
      >
        {sessionUser ? (
          <>
            <IconButton
              size="small"
              onClick={handleMenuClick}
              sx={{ cursor: "pointer" }}
            >
              <Avatar
                alt={sessionUser.username}
                src={sessionUser.profileImageUrl}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <div style={{ cursor: "pointer" }} onClick={handleMock}>
              Demo User
            </div>
            <div style={{ cursor: "pointer" }} onClick={handleOpen}>
              Sign In
            </div>
          </>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <LoginFormModal setOpen={setOpen} />
      </Modal>
    </ul>
  );
}

export default Navigation;
