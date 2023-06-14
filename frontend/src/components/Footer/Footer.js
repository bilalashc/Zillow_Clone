import React from "react";
import "./footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate()
  return (
    <div className="footer_container">
      <div className="footer_company_details">
        <img
          style={{ height: "30px", marginBottom: "20px" }}
          src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
          className="logo"
          alt="Logo"
        />

        <h5>copyright@2023</h5>
      </div>
      <div className="footer_about">

        <h5>About</h5>
        <p style={{cursor: "pointer"}} onClick={()=> navigate("/sell")}>Sell</p>
      </div>
      <div >
        <a  style={{ marginRight: "20px" }} target="_blank" href="https://www.facebook.com"><FacebookIcon htmlColor={"black"}/></a>
        <a  style={{ marginRight: "20px" }} target="_blank" href="https://linkedin.com"><LinkedInIcon htmlColor={"black"}/></a>
        <a href="https://github.com" target="_blank"><GitHubIcon htmlColor={"black"}/></a>
      </div>
    </div>
  );
}
