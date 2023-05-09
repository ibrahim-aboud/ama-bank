import React, {useState} from 'react';
import style from '@/styles/navbar.module.css';
import Image from "next/image";
import siteLogo from '../../../public/assets/logos/logo.png';
import Link from 'next/link';
import { CgMenu, CgClose } from 'react-icons/cg'

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
      <Link href={`/`}>
        <div className={style.navbarLogo}>
          <Image className={style.img} src={siteLogo} alt="Amabank Logo"/>
          <h1>amaBank</h1>
        </div>
      </Link>
      
      <ul className={`${style.navbarLinks} ${active ? style.active : ''}`}>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/consulter">Consulter</Link></li>
        <li><Link href="/comparer">Comparer</Link></li>
        <li><Link href="/agences">Trouver une agence</Link></li>
        <li><Link href="/about">À propos</Link></li>
        <li><Link href="https://www.youtube.com/watch?v=sdeDD6i6VWw" target='_blank'>Besoin d{"'"}aide?</Link></li>
      </ul>
      <div className={style.navbarHelp}>
        <Link href="https://www.youtube.com/watch?v=sdeDD6i6VWw" target='_blank'>Besoin d{"'"}aide?</Link>
      </div>
      <div onClick={toggleMenu}>
        <CgMenu className={`text-white mr-3 lg:hidden ${active ? "hidden" : ""}`} size={30} />
        <CgClose className={`text-white mr-3 ${active ? "" : "hidden"}`} size={30} />
      </div>
   </nav>
  );
  
}

export default Navbar;
