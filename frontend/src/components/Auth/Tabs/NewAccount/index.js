import React, { useState } from "react";
import "./NewAccount.css";
import { useDispatch } from "react-redux";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { signup } from "../../../../store/auth/auth.actions";

function NewAmount() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password == null || confirmPassword == null || email == null){
      alert("Information is missing please enter the correct information!")
    }else{
      if (password === confirmPassword) {
        dispatch(signup(email, password));
      }else{
        alert("Password must be macth!")
      }
    }
  };

  return (
    <div>
      <div className="NewAmount__form" >
        {/* <ul>
          {errors.map((error) => (
            <p className="error" key={error}>
              {error}
            </p>
          ))}
        </ul> */}
        <div className="NewAmount__form__email__container">
          <div className="NewAmount__form__email__container__label">
            <label className="email">Email</label>
          </div>
          <div className="NewAmount__form__email__container__textfield">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="NewAmount__form__password__container">
          <div className="NewAmount__form__password__container_label">
            <label>Password</label>
          </div>
          <div className="NewAmount__form__password__container_textfield">
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="NewAmount__form__password__container">
          <div className="NewAmount__form__password__container_label">
            <label> Confirm Password</label>
          </div>
          <div className="NewAmount__form__password__container_textfield">
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="NewAmount__form__button__submit">
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
export default NewAmount;
