import React from "react"
import Image from "next/image"
import telIcone from "../../../public/assets/modificationsPage/telGreenIcon.svg"
import faxIcon from "../../../public/assets/modificationsPage/faxGreenIcon.svg"
import styles from "src/styles/agenciesModificaitonStylesClient/agencyRow.module.css"

function AgencyRow(props){
    let style = {}
    if(props.style.border === true){
        style={borderBottom : "3px solid rgba(0, 0, 0, 0.1)"}
    } 
    return(
        <span className={styles.agencyRow} style={style}>
            <div className={styles.agencyRowBankLocalisation}>
                <Image src={props.agencyIcone}></Image>
                <span className={styles.agencyRowLocalisation}>{props.record.localisation}</span>
            </div>
            <div className={styles.agencyRowAdressLocalisation}>
                <span>
                    <span>{props.isDg}</span>
                    <span>{props.record.adress}</span>
                </span>
                <a href={props.record.localisationMaps} >Localisation GPS</a>
            </div>
            <div className={styles.agencyRowTelFax}>
                <span>
                    <Image src={telIcone}></Image>
                    <span>Téléphone : </span>
                    <span>{props.record.tel}</span>
                </span>
                <span>
                    <Image src={faxIcon}></Image>
                    <span>Fax : </span>
                    <span>{props.record.fax}</span>
                </span>
            </div>
        </span>
    )
}
export default AgencyRow