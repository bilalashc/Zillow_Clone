import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { signin } from "../../../../store/auth/auth.actions";
import "./SignIn.css";

function SignIn() {
  const dispatch = useDispatch();
  const sessionUser = "";
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  if (sessionUser) navigate("/");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if(email == null || password == null){
      alert("Information is missing")
    }else{
      dispatch(signin(email, password));
    }
  };


  return (
    <div>
      <div className="signin__form">
        {/* <ul>
          {errors.map((error) => (
            <p className="error" key={error}>
              {error}
            </p>
          ))}
        </ul> */}
        <div className="email__container">
          <div className="email__container__label">
            <label className="email">Email</label>
          </div>
          <div className="email__container__textfield">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="password__container">
          <div className="password__container_label">
            <label>Password</label>
          </div>
          <div className="password__container_textfield">
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form__button__signin">
          <button type="submit" onClick={handleSubmit}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
