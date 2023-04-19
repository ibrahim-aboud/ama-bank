import React from "react"
import Image from "next/image"
import iconeInd from "public/assets/modificationsPage/indicationIcon.png"
import styles from "src/styles/agenciesModificaitonStylesClient/headerListeOfModificaiton.module.css"

 function  HeaderListeOfModification(){
    return(
        <div className={styles.container}>
            <span></span>
            <span>
                <Image src={iconeInd} alt="iconeInd"/>
                <h2>Informations relatives aux agences</h2>
            </span>
            <span></span>
        </div>
    )
}
export default HeaderListeOfModification