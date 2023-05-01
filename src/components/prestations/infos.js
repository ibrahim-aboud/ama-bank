import Image from "next/image";
import styles from "@/styles/Infos.module.css"
const Infos = () => {
    return ( 
    <>
        <div className={styles.container}>
            <div className={styles.sub_container}>
                <div className={styles.text}>
                    Intéressé par les offres de la banque? Trouvez dès maintenant l’agence qui vous convient
                </div>
                <div className={styles.image}>
                    <Image src={"/assets/icons/map.svg"} height={50} width={50} alt="image"/>
                </div>
            </div>
            <div className={styles.sub_container}>
                <div className={styles.text}>
                    Consulter le site de la banque pour avoir plus de détails
                </div>
                <div className={styles.image}>
                    <Image src={"/assets/icons/web.svg"} height={50} width={50} alt="image"/>
                </div>

            </div>
        </div>
    </>
     );
}
 
export default Infos;