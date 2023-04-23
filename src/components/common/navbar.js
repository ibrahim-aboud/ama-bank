import React, {useState} from 'react';
import style from '@/styles/navbar.module.css';
import Image from "next/image";
import siteLogo from '../../../public/assets/logos/logo.png';
import Link from 'next/link';

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
    <nav className={style.nav} id ="top">
      <div className={style.navbarLogo}>
        <Image className={style.img} src={siteLogo} alt="Amabank Logo"/>
        <h1>amaBank</h1>
      </div>
      <ul className={`${style.navbarLinks} ${active ? style.active : ''}`}>
        <li><Link href="#">Accueil</Link></li>
        <li><Link href="#">Consulter</Link></li>
        <li><Link href="#">Comparer</Link></li>
        <li><Link href="#">Trouver une agence</Link></li>
        <li><Link href="#">À propos</Link></li>
        <li><Link href="#">Besoin d'aide?</Link></li>
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
