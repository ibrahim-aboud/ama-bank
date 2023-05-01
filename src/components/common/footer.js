import style from '@/styles/footer.module.css';
import Image from "next/image";
import siteLogo from '../../../public/assets/logos/logo.png';
import about from '../../../public/assets/figures/AboutIcon.svg';
import fbIcon from '../../../public/assets/figures/FacebookIcon.svg';
import twtIcon from '../../../public/assets/figures/TwitterIcon.svg';
import igIcon from '../../../public/assets/figures/InstagramIcon.svg';
import lkdIcon from '../../../public/assets/figures/LinkedInIcon.svg';
import phneIcon from '../../../public/assets/figures/PhoneIcon.svg';
import mailIcon from '../../../public/assets/figures/EmailIcon.svg';
import faxIcon from '../../../public/assets/figures/FaxIcon.svg';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

function Footer() {
  var infos;
  useEffect(async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/website"
      );
  
      infos = response.data.infos[0];
      console.log(infos);
    } catch (e) {
      console.error(e.response.data.error.message);
    }
  }, [])

  // const[phoneNumber,setPhoneNumber] = useState("+213 21 98 53 99");
  // const[faxNumber,setFaxNumber] = useState("+213 21 98 53 99");
  // const[mail,setMail] = useState("Support@amaBank.com");
  // const [fbLink, setFbLink] = useState("https://www.facebook.com");
  // const [igLink, setIgLink] = useState("https://www.instagram.com");
  // const [twitterLink, setTwitterLink] = useState("https://twitter.com");
  // const [linkedInLink, setLinkedInLink] = useState("https://www.linkedin.com");

  function getCurrentYear() {
    return new Date().getFullYear();
  }

  return (
    <div className={style.footerContainer}>
      <footer className={style.footer}>
        <Link className={style.backToTop} href="#top"></Link>
        <div className={style.propos}>
          <div className={style.plateformeInfo} id={style.proposID}>
            <Image src={about} alt="Propos" className={style.proposImg}></Image>
            <p>À propos de la plateforme</p>
          </div>
          <div>
            <p>
                amaBank est une plateforme de comparaison des offres de prestataires
                bancaires actifs en Algérie. Elle offre la possibilité de consulter toutes les informations relatives à
                l’ouverture, la fermeture et la gestion d’un compte bancaire.  
            </p>
          </div>
        </div>
        <div className={style.contactInfo}>
          <div>
            <Image src={phneIcon} alt="Phone" className={style.contactInfoImg}></Image>
            <p>{infos.phone}</p>
          </div>
          <div>
            <Image src={mailIcon} alt="Email" className={style.contactInfoImg} id={style.mail}></Image>
            <p>{infos.email}</p>
          </div>
          <div>
            <Image src={faxIcon} alt="Fax" className={style.contactInfoImg}></Image>
            <p>{infos.fax}</p>   
          </div>
        </div>
        <div className={style.socialMedia}>
          <div className={style.followUs}>
            <p>Suivez nous sur nos</p>
            <p>réseaux sociaux</p>
          </div>
          <div className={style.socialIcons}>
            <Link href={infos.facebook_link} target="_blank"><Image src={fbIcon} alt="Facebook" className={style.socialIconsImg}></Image></Link>
            <Link href={infos.twitter_link} target="_blank"><Image src={twtIcon} alt="Twitter" className={style.socialIconsImg}></Image></Link>
            <Link href={infos.instagram_link} target="_blank"><Image src={igIcon} alt="Instagram" className={style.socialIconsImg}></Image></Link>
            <Link href={infos.linkedin_link} target="_blank"><Image src={lkdIcon} alt="LinkedIn" className={style.socialIconsImg}></Image></Link>
          </div>
        </div>
        <hr className={style.line}/>
        <div className={style.container}>
          <div className={style.footerContent}>
            <div className={style.footerLogo}>
              <Image className={style.amaBank} src={siteLogo} alt='amaBankLogo'></Image>
              <div className={style.companyInfo}>
                <h4>amaBank</h4>
                <p>&copy;{getCurrentYear()} Tous droits réservés</p>
              </div>
            </div>
            <ul className={style.footerLinks}>
              <li><Link href="#">Accueil</Link></li>
              <li><Link href="#">Consulter</Link></li>
              <li><Link href="#">Comparer</Link></li>
              <li><Link href="#">Trouver une agence</Link></li>
              <li><Link href="#">À propos</Link></li>
              <li><Link href="#">Besoin d'aide?</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
