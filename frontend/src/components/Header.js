import React from "react";
import Logo from '../images/header/logo_around_RD_v2.png';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/signin');
  }
  
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="logo around the RD"/>
      <nav onClick={signOut} className="header__nav">cerrar sesión</nav>
      <hr className="header__line"/>
    </header>
  )
}

export default Header;