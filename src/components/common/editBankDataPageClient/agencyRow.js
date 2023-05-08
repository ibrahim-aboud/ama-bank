import React from "react"
import Image from "next/image"
import telIcone from "public/assets/modificationsPage/telGreenIcon.svg"
import faxIcon from "public/assets/modificationsPage/faxGreenIcon.svg" 
import styles from "src/styles/agenciesModificaitonStylesClient/agencyRow.module.css"

function AgencyRow(props){
    let style = {}, phone = "indisponible", fax = "indisponible"
    let deleteStyle = {display : "block"}
    if(props.record.id == -1){
        deleteStyle = {display : "none"}
    }
    if(props.record.fax != null){
        fax = props.record.fax
    }
    if(props.record.phone != null){
        phone = props.record.phone
    }
    if(props.style.border === true){
        style={borderBottom : "3px solid rgba(0, 0, 0, 0.1)"}
    } 

    return(
        
        <span className={styles.agencyRow} style={style}>
            <div className={styles.shadow}></div>
            <div className={styles.agencyRowBankLocalisation}>
                <Image src={props.agencyIcone} alt="icone"></Image>
                <span className={styles.agencyRowLocalisation}>{props.record.localisation}</span>
            </div>
            <div className={styles.agencyRowAdressLocalisation}>
                <span>
                    <span>{props.isDg}</span>
                    <span>{props.record.address}</span>
                </span>
                <a href={props.record.location_link} target="_blank" >Localisation GPS</a>
            </div>
            <div className={styles.agencyRowTelFax}>
                <span>
                    <Image src={telIcone} alt="icone"></Image>
                    <span>Téléphone : </span>
                    <span>{phone}</span>
                </span>
                <span>
                    <Image src={faxIcon} alt="icone"></Image>
                    <span>Fax : </span>
                    <span>{fax}</span>
                </span>
            </div>
        </span>
    )
}
export default AgencyRow