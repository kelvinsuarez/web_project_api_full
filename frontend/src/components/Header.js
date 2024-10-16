import React from "react";
import Logo from '../images/header/Vector.svg';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/signin');
  }
  
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="logo around the U.S"/>
      <nav onClick={signOut} className="header__nav">cerrar sesión</nav>
      <hr className="header__line"/>
    </header>
  )
}

export default Header;