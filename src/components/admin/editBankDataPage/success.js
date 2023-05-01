import React from "react"
import Image from "next/image"
import successPopUpCross from "public/assets/modificationsPage/successPopUpCross.svg"
import successPopUpCheck from "public/assets/modificationsPage/succesPopUpCheck.svg"
import styles from "src/styles/agenciesModificaitonStyles/success.module.css"

function Success({handleAnnuler}){
    return(
        <div className={styles.containerSuccess} >
            <div className={styles.successWhiteSide}>
               <div className={styles.sucessCheckDiv}>
                    <Image src={successPopUpCheck} alt="Check"></Image>
                    <span className={styles.SuccessCheckSpan}>Succès!</span>
                    <span className={styles.SuccesChackSpanBlack}>Opération efféctuée avec succès</span>
               </div>
               <div className={styles.crossDiv}  >
                    <button onClick={handleAnnuler}>
                        <Image src={successPopUpCross} alt="Cross"></Image>
                    </button>
                </div> 
            </div>
            <div className={styles.successWhiteSquare}>

            </div>
            <div className={styles.successGreenSide}>
                <button className={styles.poursuivreNav} onClick={handleAnnuler} >
                    <span className={styles.buttonText}>Poursuivre la navigation</span>
                </button>
            </div>
        </div>
    )
}

export default Success