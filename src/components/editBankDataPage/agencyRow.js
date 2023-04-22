import React, {useState} from "react"
import Image from "next/image"
import telIcone from "../../../public/assets/modificationsPage/telGreenIcon.svg"
import faxIcon from "../../../public/assets/modificationsPage/faxGreenIcon.svg"
import penIcone from "../../../public/assets/modificationsPage/penIcon.svg"
import basketIcon from "../../../public/assets/modificationsPage/deleteBasketIcon.svg"
import styles from "src/styles/agenciesModificaitonStyles/agencyRow.module.css"

function AgencyRow(props){
    const[styleMap, setStyleMap] = useState(null);
    let style = {}, phone = "indisponible", fax = "indisponible"
    let deleteStyle = {display : "block"}
    if(props.record.id == -1){
        deleteStyle = {display : "none"}
    }
    if(props.record.fax != "null"){
        fax = props.record.fax
    }
    if(props.record.phone != "null"){
        phone = props.record.phone
    }
    if(props.style.border === true){
        style={borderBottom : "3px solid rgba(0, 0, 0, 0.1)"}
    } 

    const handleMpasClick = () => {
        setStyleMap({
            display : "block"
        })
    }

    return(
        
        <span className={styles.agencyRow} style={style}>
            <div className={styles.shadow}></div>
            <iframe
                    title="Google Map"
                    width="100%"
                    height="400"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155.5392875830294!2d-122.41941609872165!3d37.77492982554027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e1dbf8307bd%3A0x2823f547fb470304!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1619456701572!5m2!1sen!2sus"
                    frameBorder="0"
                    allowFullScreen
                    className={styles.mapsApi}
                    style={styleMap}
                ></iframe>
            <div className={styles.agencyRowBankLocalisation}>
                <Image src={props.agencyIcone} alt="icone"></Image>
                <span className={styles.agencyRowLocalisation}>{props.record.localisation}</span>
            </div>
            <div className={styles.agencyRowAdressLocalisation}>
                <span>
                    <span>{props.isDg}</span>
                    <span>{props.record.address}</span>
                </span>
                {/* <a href={props.record.localisationMaps}>Localisation GPS</a> */}
                <button onClick={handleMpasClick}>Localisation GPS</button>
            </div>
            <div className={styles.agencyRowTelFax}>
                <span>
                    <Image src={telIcone}></Image>
                    <span>Téléphone : </span>
                    <span>{phone}</span>
                </span>
                <span>
                    <Image src={faxIcon}></Image>
                    <span>Fax : </span>
                    <span>{fax}</span>
                </span>
            </div>
            <div className={styles.agencyRowModifyDelete}>
                <button onClick={() => props.handleEditAgencyInfo(props.record.id)} >
                    <Image src={penIcone}></Image>
                </button>
                <button onClick={() => props.handleDeleteAgency(props.record.id)} style={deleteStyle} >
                    <Image src={basketIcon}></Image>
                </button>
            </div>
        </span>
    )
}
export default AgencyRow