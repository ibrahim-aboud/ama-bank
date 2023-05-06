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
import Link from 'next/link';
import axios from 'axios';

export default function AboutUS ({ infos }) {

    return (

      <section className={style.section}>

            <div className={style.container}>
                <Image src={exploreImg} alt="Someonediscoveringbanks" className={style.finding}/>
                <div className={style.content}>
                    <p className={style.decouvrir}>Découvrez la totalité des banques actives en Algérie et consulter leurs conditions tarifaires.</p>
                    <Link href="/" target="_blank" className={style.btnGreen}>
                        <Image src={searchImg} alt="SearchIcon" className={style.srcIcon}/>
                        <span className={style.btnText}>Explorer les banques</span></Link>
                </div>
            </div>

            <div className={style.container2}>
                <Image src={confusedPerson} alt="confused-person" className={style.confused}/>
                <div className={style.content2}>
                    <p className={style.comparer}>
                        Vous trouvez des difficultés à choisir entre deux banques différentes ?
                        Nous vous aidons à prendre une décision en comparant les prestations de deux banques de votre choix.   
                    </p>
                    <Link href="/comparer" target="_blank" className={style.btnGreen2}>
                        <Image src={cmpImg} alt="Someonediscoveringbanks" className={style.cmpIcon}/><span className={style.btnText2}>Comparer entre deux banques</span>
                    </Link>
                </div>
            </div>

            <div className={style.container}>
                <Image src={map} alt="findingAgency" className={style.finding}/>
                <div className={style.content}>
                    <p className={style.decouvrir}>
                        Vous avez pu trouver la banque qui répond à vos exigences?
                        Commencez à cherchez l’agence la plus proche de votre domicile.
                    </p>
                    <Link href="/agences" target="_blank" className={style.btnGreen}>
                        <Image src={locationIcon} alt="LocationIcon" className={style.srcIcon}/>
                        <span className={style.btnText}>Trouver une agence</span></Link>
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
                            <p className={style.adjust}>{infos.phone}</p>
                        </div>
                        <div className={style.mail}>
                            <Image src={greenMailIcon} alt="mail" className={style.coordsimgs}/>
                            <p>{infos.email}</p>
                        </div>
                        <div>
                            <Image src={greenFaxIcon} alt="fax" className={style.coordsimgs}/>
                            <p className={style.adjust}>{infos.fax}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.container5}>
                <Image src={socials} alt="checkingSocials" className={style.socialMedia}/>
                <div className={style.content5}>
                    <p className={style.soutenir}>Soutenez-nous et maintenez le site web actif en nous suivant sur les réseaux sociaux.</p>
                    <div className={style.socials}>
                        <Link href={infos.facebook_link} target="_blank"><Image src={fbIcon} alt="FacebookIcon" className={style.socialsImgs}/></Link>
                        <Link href={infos.instagram_link} target="_blank"><Image src={igIcon} alt="InstagramIcon" className={style.socialsImgs}/></Link>
                        <Link href={infos.twitter_link} target="_blank"><Image src={twitterIcon} alt="TwitterIcon" className={style.socialsImgs}/></Link>
                        <Link href={infos.linkedin_link} target="_blank"><Image src={linkedInIcon} alt="LinkedInIcon" className={style.socialsImgs}/></Link>
                    </div>
                </div>
            </div>

        </section>
    );
}

export async function getServerSideProps(context) {

    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/website"
      );
  
      var infos = response.data.infos[0];
    } catch (e) {
      console.error(e.response.data.error.message);
    }
  
    return {
      props: { infos },
    };
  }