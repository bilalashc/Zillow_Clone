import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
import SignupFormPage from "../SignUpFormPage";
import LoginForm from "./LoginForm";
import "./LoginForm.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoginFormModal = ({ setOpen }) => {
  // const [showModal, setShowModal] = useState(false);
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <Box sx={style}>
      <Typography
        style={{
          fontWeight: 700,
          fontSize: "24px",
          lineHeight: "32px",
          textAlign: "center",
        }}
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        Welcome to Zillow
      </Typography>
      <div style={{ display: "flex", marginTop: "25px" }}>
        <div
          className={`${authMode === "signin" && "active"} `}
          style={{ marginRight: "10px", cursor: "pointer" }}
          onClick={changeAuthMode}
        >
          Sign In
        </div>
        <div
          className={`${authMode === "signup" && "active"} `}
          style={{ marginRight: "10px", cursor: "pointer" }}
          onClick={changeAuthMode}
        >
          New Account
        </div>
      </div>
      <hr />
      {authMode === "signin" ? (
        <LoginForm setOpen={setOpen} />
      ) : (
        <SignupFormPage setOpen={setOpen} />
      )}
    </Box>
  );
};

export default LoginFormModal;
