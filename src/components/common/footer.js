import style from "@/styles/footer.module.css";
import Image from "next/image";
import siteLogo from "../../../public/assets/logos/logo.png";
import about from "../../../public/assets/figures/AboutIcon.svg";
import fbIcon from "../../../public/assets/figures/FacebookIcon.svg";
import twtIcon from "../../../public/assets/figures/TwitterIcon.svg";
import igIcon from "../../../public/assets/figures/InstagramIcon.svg";
import lkdIcon from "../../../public/assets/figures/LinkedInIcon.svg";
import phneIcon from "../../../public/assets/figures/PhoneIcon.svg";
import mailIcon from "../../../public/assets/figures/EmailIcon.svg";
import faxIcon from "../../../public/assets/figures/FaxIcon.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { HiArrowNarrowUp } from 'react-icons/hi'

function Footer() {
  const [infos, setinfos] = useState({
    id: "",
    phone: "",
    email: "",
    fax: "",
    description: "",
    facebook_link: "",
    linkedin_link: "",
    instagram_link: "",
    twitter_link: "",
  });

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/website")
      .then((response) => {
        setinfos(response.data.infos[0]);
      })
      .catch((err) =>
        console.error(err.response?.data.error?.message || err.message)
      );
  }, []);

  function getCurrentYear() {
    return new Date().getFullYear();
  }

  return (
    <div className={style.footerContainer}>
      <footer className={style.footer}>
        <Link className={style.backToTop} href="#top"><HiArrowNarrowUp className="ml-[13px] mt-[12px]" size={25} /></Link>
        <div className={style.flexContainer}>
          <div className={style.propos}>
            <div className={style.plateformeInfo} id={style.proposID}>
              <Image src={about} alt="Propos" className={style.proposImg}></Image>
              <p>À propos de la plateforme</p>
            </div>
            <div>
              <p>
                {infos?.description}
              </p>
            </div>
          </div>
          <div className={style.contactInfo}>
            <div>
              <Image
                src={phneIcon}
                alt="Phone"
                className={style.contactInfoImg}
              ></Image>
              <p>{infos?.phone}</p>
            </div>
            <div>
              <Image
                src={mailIcon}
                alt="Email"
                className={style.contactInfoImg}
                id={style.mail}
              ></Image>
              <p>{infos?.email}</p>
            </div>
            <div>
              <Image
                src={faxIcon}
                alt="Fax"
                className={style.contactInfoImg}
              ></Image>
              <p>{infos?.fax}</p>
            </div>
          </div>
          <div className={style.socialMedia}>
            <div className={style.followUs}>
              <p>Suivez nous sur nos</p>
              <p>réseaux sociaux</p>
            </div>
            <div className={style.socialIcons}>
              <Link href={infos?.facebook_link} target="_blank">
                <Image
                  src={fbIcon}
                  alt="Facebook"
                  className={style.socialIconsImg}
                ></Image>
              </Link>
              <Link href={infos?.twitter_link} target="_blank">
                <Image
                  src={twtIcon}
                  alt="Twitter"
                  className={style.socialIconsImg}
                ></Image>
              </Link>
              <Link href={infos?.instagram_link} target="_blank">
                <Image
                  src={igIcon}
                  alt="Instagram"
                  className={style.socialIconsImg}
                ></Image>
              </Link>
              <Link href={infos?.linkedin_link} target="_blank">
                <Image
                  src={lkdIcon}
                  alt="LinkedIn"
                  className={style.socialIconsImg}
                ></Image>
              </Link>
            </div>
          </div>
        </div>
      
        <hr className={style.line} />
        <div className={style.container}>
          <div className={style.footerContent}>
            <div className={style.footerLogo}>
              <Image
                className={style.amaBank}
                src={siteLogo}
                alt="amaBankLogo"
              ></Image>
              <div className={style.companyInfo}>
                <h4>amaBank</h4>
                <p>&copy;{getCurrentYear()} Tous droits réservés</p>
              </div>
            </div>
            <ul className={style.footerLinks}>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="/consulter">Consulter</Link>
              </li>
              <li>
                <Link href="/comparer">Comparer</Link>
              </li>
              <li>
                <Link href="/agences">Trouver une agence</Link>
              </li>
              <li>
                <Link href="/about">À propos</Link>
              </li>
              <li>
                <Link href="#">Besoin d{"'"}aide?</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
