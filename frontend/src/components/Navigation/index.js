import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../NewSignupFormModal';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  console.log('hello');

  const handleDemoLogin = async () => {
    try {
      dispatch(sessionActions.login({credential:"bilal@gmail.com", password: "ashfaque"}));
    } catch (error) {
      console.error(error);
    }
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className="session-links">
           <span className="demo" onClick={()=> handleDemoLogin()}>Demo User</span> 
           <LoginFormModal />
           <SignUpFormModal />
        </div> 
      </>
    );
  }

  return (
    <ul>
        <div className="home">
          <NavLink exact to="/">
          <div className="logo-container">
            <img src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg" className = "logo"></img>
          </div>
          </NavLink>
          
        </div>
        {sessionLinks}
    </ul>
  );
}

export default Navigation;