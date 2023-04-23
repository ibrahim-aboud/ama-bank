import style from '@/styles/aboutUs.module.css';
import Image from "next/image";
import exploreImg from "../../public/assets/figures/Explorer.svg";
import searchImg from "../../public/assets/figures/searchIcon.svg";
import cmpImg from "../../public/assets/figures/compareIcon.svg";
import confusedPerson from "../../public/assets/figures/Comparer.svg";
import map from "../../public/assets/figures/Agence.svg";
import locationIcon from "../../public/assets/figures/locationIcon.svg";
import helpDesk from "../../public/assets/figures/ContactUs.svg";
import greenPhoneIcon from "../../public/assets/figures/greenPhone.svg";
import greenFaxIcon from "../../public/assets/figures/greenFax.svg"
import greenMailIcon from "../../public/assets/figures/greenMail.svg";
import fbIcon from "../../public/assets/figures/greenFb.svg";
import igIcon from "../../public/assets/figures/greenIg.svg";
import twitterIcon from "../../public/assets/figures/greenTwitter.svg";
import linkedInIcon from "../../public/assets/figures/greenLinkedIn.svg";
import socials from "../../public/assets/figures/Socials.svg";
import { useState } from 'react';

export default function AboutUS () {

    const[phoneNumber,setPhoneNumber] = useState("+213 21 98 53 99");
    const[faxNumber,setFaxNumber] = useState("+213 21 98 53 99");
    const[mail,setMail] = useState("Support@amaBank.com");
    const [fbLink, setFbLink] = useState("https://www.facebook.com");
    const [igLink, setIgLink] = useState("https://www.instagram.com");
    const [twitterLink, setTwitterLink] = useState("https://twitter.com");
    const [linkedInLink, setLinkedInLink] = useState("https://www.linkedin.com");

    return (

      <section className={style.section}>

            <div className={style.container}>
                <Image src={exploreImg} alt="Someonediscoveringbanks" className={style.finding}/>
                <div className={style.content}>
                    <p className={style.decouvrir}>Découvrez la totalité des banques actives en Algérie et consulter leurs conditions tarifaires.</p>
                    <a href="#" target="_blank" className={style.btnGreen}>
                        <Image src={searchImg} alt="SearchIcon" className={style.srcIcon}/>
                        <span className={style.btnText}>Explorer les banques</span></a>
                </div>
            </div>

            <div className={style.container2}>
                <Image src={confusedPerson} alt="confused-person" className={style.confused}/>
                <div className={style.content2}>
                    <p className={style.comparer}>
                        Vous trouvez des difficultés à choisir entre deux banques différentes ?
                        Nous vous aidons à prendre une décision en comparant les prestations de deux banques de votre choix.   
                    </p>
                    <a href="#" target="_blank" className={style.btnGreen2}>
                        <Image src={cmpImg} alt="Someonediscoveringbanks" classname={style.cmpIcon}/><span className={style.btnText2}>Comparer entre deux banques</span>
                    </a>
                </div>
            </div>

            <div className={style.container}>
                <Image src={map} alt="findingAgency" className={style.finding}/>
                <div className={style.content}>
                    <p className={style.decouvrir}>
                        Vous avez pu trouver la banque qui répond à vos exigences?
                        Commencez à cherchez l’agence la plus proche de votre domicile.
                    </p>
                    <a href="#" target="_blank" className={style.btnGreen}>
                        <Image src={locationIcon} alt="LocationIcon" className={style.srcIcon}/>
                        <span className={style.btnText}>Trouver une agence</span></a>
                </div>
            </div>

            <div className={style.container4}>
                <Image src={helpDesk} alt="helpDesk" className={style.helpDesk}/>
                <div className={style.content4}>
                    <p className={style.contactezNous}>
                        Vous rencontrez des difficultés lors de l’utilisation du site ou bien vous avez des suggestions à nous proposer, 
                        n’hèsitez surtout pas à nous contacter.
                    </p>
                    <div className={style.coordonnees}>
                        <div>
                            <Image src={greenPhoneIcon} alt="phone" className={style.coordsimgs}/>
                            <p className={style.adjust}>{phoneNumber}</p>
                        </div>
                        <div className={style.mail}>
                            <Image src={greenMailIcon} alt="mail" className={style.coordsimgs}/>
                            <p>{mail}</p>
                        </div>
                        <div>
                            <Image src={greenFaxIcon} alt="fax" className={style.coordsimgs}/>
                            <p className={style.adjust}>{faxNumber}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.container5}>
                <Image src={socials} alt="checkingSocials" className={style.socialMedia}/>
                <div className={style.content5}>
                    <p className={style.soutenir}>Soutenez-nous et maintenez le site web actif en nous suivant sur les réseaux sociaux.</p>
                    <div className={style.socials}>
                        <a href={fbLink} target="_blank"><Image src={fbIcon} alt="FacebookIcon" className={style.socialsImgs}/></a>
                        <a href={igLink} target="_blank"><Image src={igIcon} alt="InstagramIcon" className={style.socialsImgs}/></a>
                        <a href={twitterLink} target="_blank"><Image src={twitterIcon} alt="TwitterIcon" className={style.socialsImgs}/></a>
                        <a href={linkedInLink} target="_blank"><Image src={linkedInIcon} alt="LinkedInIcon" className={style.socialsImgs}/></a>
                    </div>
                </div>
            </div>

        </section>
    );
}