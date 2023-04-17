import React, {useState} from 'react';
import style from '@/styles/navbar.module.css';
import Image from "next/image";
import siteLogo from '../../../public/assets/logos/logo.png';

function Navbar() {

  const [active, setActive] = useState(false);
  function toggleMenu() {
    setActive(!active);
    if (active) {
      document.body.classList.remove("nav-open");
    } else {
      document.body.classList.add("nav-open");
    }
  }
  
  return (
    <nav className={style.nav}>
      <div className={style.navbarLogo}>
        <Image className={style.img} src={siteLogo} alt="Amabank Logo"/>
        <h1>amaBank</h1>
      </div>
      <ul className={`${style.navbarLinks} ${active ? style.active : ''}`}>
        <li><a href="#">Accueil</a></li>
        <li><a href="#">Consulter</a></li>
        <li><a href="#">Comparer</a></li>
        <li><a href="#">Trouver une agence</a></li>
        <li><a href="#">À propos</a></li>
        <li><a href="#">Besoin d'aide?</a></li>
      </ul>
      <div className={style.navbarHelp}>
        <a href="#">Besoin d'aide?</a>
      </div>
      <div className={`${style.navbarToggle} ${active ? style.active : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
   </nav>
  );

}

export default Navbar;
