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
      <h5>About</h5>
      </div>
      <div >
        <a  style={{ marginRight: "20px" }} target="_blank" href="https://www.linkedin.com/in/bilal-c-838805b4"><LinkedInIcon htmlColor={"black"}/></a>
        <a href="https://github.com/bilalashc" target="_blank"><GitHubIcon htmlColor={"black"}/></a>
      </div>
    </div>
  );
}
