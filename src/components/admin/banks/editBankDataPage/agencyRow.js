import React, {useState} from "react"
import Image from "next/image"
import telIcone from "public/assets/modificationsPage/telGreenIcon.svg"
import faxIcon from "public/assets/modificationsPage/faxGreenIcon.svg"
import penIcone from "public/assets/modificationsPage/penIcon.svg"
import basketIcon from "public/assets/modificationsPage/deleteBasketIcon.svg"
import styles from "src/styles/agenciesModificaitonStyles/agencyRow.module.css"

function AgencyRow(props){
   
    let style = {}, phone = "indisponible", fax = "indisponible"
    let deleteStyle = {display : "block"}
    if(props.record.id < 0){
        deleteStyle = {display : "none"}
    }
    if(props.record.fax != "null" && props.record.fax != null){
        fax = props.record.fax
    }
    if(props.record.phone != "null" && props.record.phone != null ){
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
            <div className={styles.agencyRowAdressLocalisation} >
                <span >
                    <span>{props.isDg}</span>
                    <span>{props.record.address}</span>
                </span>
                {/* <a href={props.record.localisationMaps}>Localisation GPS</a> */}
                <a href={props.record.location_link}>Localisation GPS</a>
            </div>
            <div className={styles.agencyRowTelFax}>
                <span>
                    <Image src={telIcone} alt = "icone"></Image>
                    <span>Téléphone : </span>
                    <span>{phone}</span>
                </span>
                <span>
                    <Image src={faxIcon} alt = "icone"></Image>
                    <span>Fax : </span>
                    <span>{fax}</span>
                </span>
            </div>
            <div className={styles.agencyRowModifyDelete}>
                <button onClick={() => props.handleEditAgencyInfo(props.record)} >
                    <Image src={penIcone} alt = "icone"></Image>
                </button>
                <button onClick={() => props.handleDeleteAgency(props.record.id)} style={deleteStyle} >
                    <Image src={basketIcon} alt = "icone"></Image>
                </button>
            </div>
        </span>
    )
}
export default AgencyRow