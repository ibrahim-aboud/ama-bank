import React, {useState, useEffect} from "react"
import Image from "next/image"
import adressIcon from "../../../public/assets/modificationsPage/adressIcon.svg"
import telIcone from "../../../public/assets/modificationsPage/telIcone.svg"
import faxIcone from "../../../public/assets/modificationsPage/faxIcon.svg"
import localisationIcon from "../../../public/assets/modificationsPage/localisationIcon.svg"
import modificationListeDescard from "../../../public/assets/modificationsPage/modificationListeDescard.svg"
import styles from "src/styles/agenciesModificaitonStyles/modificaitonListe.module.css"
import InputBar from "./inputBar"
import axios from "axios"

function modificationListe(Props){
    const [bankId, setBankId] = useState(0)
    const [wilaya, setWilaya] = useState(0)
    const [adresse, setAdresse] = useState(null)
    const[phone, setPhone] = useState(null)
    const[fax, setFax] = useState(null)
    const[localisation, setLocalisation] = useState(null)
    const[bankList, setBankList] = useState(null)
    const [error, setError] = useState(null)
    const [errStyle, setErrStyle] = useState({display : "none"})

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + `/banks`)
        .then(response =>{
            setBankList(response.data.banks.map(element =>{
                return <option key={element.id} value={element.id} >{element.name}</option>
            }))
        }).catch(err => {
            console.log( err.message )
        })
    }, [])

    const handleInputs = (val, which) => {
        switch(which){
            case "Adresse *" :
            setAdresse(val)
            break
            case "Numéro de téléphone":
            setPhone(val)
            break
            case "Fax":
            setFax(val)
            break
            case "Localisation":
            setLocalisation(val)
            break
        }
  
    }

    const verifyData = () =>{
        return new Promise((resolve, reject) => {
            let errMsg = ""
            if(bank_id == 0){
                errMsg +=" choisir une banque!"
            } 
            if (wilaya == 0){
                errMsg +=" choisir la wilaya de l'agence que vous souhaitez ajouter."
            }
            if(adresse.length > 5){
                errMsg += " l'adresse contient moins de 5 caractères."
            } 
            if(errMsg.length > 0 ){
                 reject(errMsg)
            } else {
                 resolve()
            }
        })
    }

    const handleButtonClick = ()=> {

        verifyData()
        .then(() => {
            let objToSend = {
                agency : {
                    id : null,
                    bank_id : bankId,
                    address : adresse,
                    lat : null,
                    lng : null,
                    wilaya : wilaya,
                    phone : phone,
                    fax : fax,
                    location_link : localisation
                }
            }
            if(Props.record.message1 != "Sauvegarder les modifications"){
                axios.post(process.env.NEXT_PUBLIC_API_URL + '/agencies', objToSend)
                .then(response => {
                    console.log(response)
                    })
                .catch(err =>{
                    console.log(err.message)
                    })
                
            } else {
                axios.put(process.env.NEXT_PUBLIC_API_URL + '/agencies', objToSend)
                .then(response => {
                    console.log(response)
                    })
                .catch(err =>{
                    console.log(err.message)
                    })
            }
            setError("")
            setEerrStyle ({display : "none"})
            })

        .catch(err => {
            console.log(err.message)
            setError(err.message)
            setErrStyle ( {display : "block", 
                            color : "red", 
                            textAlign: "center"
                        })
            })

    }

    return(
        <div className={styles.dataModification}>
            <form className={styles.dataInput}>
                <span className={styles.inputMessage}>Nom de la banque *</span>
                <select name="bankName" className={styles.inputBlock} required onChange={(e)=>{setBankId(parseInt(e.target.value))}}>
                        <option value="0">Sélectionner une banque</option>
                        {bankList}
                </select>

                <span className={styles.inputMessage}>Wilaya *</span>
                <select name="wilaya" className={styles.inputBlock} required onChange={(e) => {setWilaya(parseInt(e.target.value))}}>
                    <option value="0">Sélectionner la wilaya</option>
                    <option value="16">16 - Alger</option>
                    <option value="01">01 - Adrar</option>
                    <option value="02">02 - Chlef</option>
                    <option value="03">03 - Laghouat</option>
                    <option value="04">04 - Oum El Bouaghi</option>
                    <option value="05">05 - Batna</option>
                    <option value="06">06 - Béjaïa</option>
                    <option value="07">07 - Biskra</option>
                    <option value="08">08 - Béchar</option>
                    <option value="09">09 - Blida</option>
                    <option value="10">10 - Bouira</option>
                    <option value="11">11 - Tamanghasset</option>
                    <option value="12">12 - Tébessa</option>
                    <option value="13">13 - Tlemcen</option>
                    <option value="14">14 - Tiaret</option>
                    <option value="15">15 - Tizi Ouzou</option>
                    <option value="17">17 - Djelfa</option>
                    <option value="18">18 - Jijel</option>
                    <option value="19">19 - Sétif</option>
                    <option value="20">20 - Saïda</option>
                    <option value="21">21 - Skikda</option>
                    <option value="22">22 - Sidi Bel Abbès</option>
                    <option value="23">23 - Annaba</option>
                    <option value="24">24 - Guelma</option>
                    <option value="25">25 - Constantine</option>
                    <option value="26">26 - Médéa</option>
                    <option value="27">27 - Mostaganem</option>
                    <option value="28">28 - M'Sila</option>
                    <option value="29">29 - Mascara</option>
                    <option value="30">30 - Ouargla</option>
                    <option value="31">31 - Oran</option>
                    <option value="32">32 - El Bayadh</option>
                    <option value="33">33 - Illizi</option>
                    <option value="34">34 - Bordj Bou Arréridj</option>
                    <option value="35">35 - Boumerdès</option>
                    <option value="36">36 - El Tarf</option>
                    <option value="37">37 - Tindouf</option>
                    <option value="38">38 - Tissemsilt</option>
                    <option value="39">39 - El Oued</option>
                    <option value="40">40 - Khenchela</option>
                    <option value="41">41 - Souk Ahras</option>
                    <option value="42">42 - Tipaza</option>
                    <option value="43">43 - Mila</option>
                    <option value="44">44 - Aïn Defla</option>
                    <option value="45">45 - Naama</option>
                    <option value="46">46 - Aïn Témouchent</option>
                    <option value="47">47 - Ghardaïa</option>
                    <option value="48">48 - Relizane</option>
                </select>


                <InputBar  record={{title:"Adresse *" , placeHolder:"Ex: 99 route de Meftah16310 Alger", icone:adressIcon ,type:"text", handleInputs:handleInputs}}/>
                <InputBar  record={{title:"Numéro de téléphone" , placeHolder:"Ex: +213 21 98 53 99", icone:telIcone ,type:"tel", handleInputs:handleInputs}}/>
                <InputBar  record={{title:"Fax" , placeHolder:"Ex: +213 21 98 53 99", icone:faxIcone ,type:"tel", handleInputs:handleInputs}}/>
                <InputBar  record={{title:"Localisation" , placeHolder:"Ex: https://goo.gl/maps/onJ7hBd4oZ1fMpPj9", icone:localisationIcon ,type:"url", handleInputs:handleInputs}}/>

        </form>

            <div style={errStyle}>{error}</div>
            <div className={styles.dataValidation}>
                <button onClick={() => handleButtonClick()}>
                    
                    <span className={styles.modificationListeButtonsMessage}>{Props.record.message1}</span>
                    <Image src={Props.record.icone} alt="icone"></Image>
                
                </button>
                <button onClick={Props.handleAddAgencyAnnuler} >
                    
                    <span className={styles.modificationListeButtonsMessage}>{Props.record.message2}</span>
                    <Image src={modificationListeDescard} alt="icone"></Image>
                
                </button>
            </div>

        </div>
    )
}
export default modificationListe