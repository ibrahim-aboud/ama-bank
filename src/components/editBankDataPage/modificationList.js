import React from "react"
import Image from "next/image"
import adressIcon from "../../../public/assets/modificationsPage/adressIcon.svg"
import telIcone from "../../../public/assets/modificationsPage/telIcone.svg"
import faxIcone from "../../../public/assets/modificationsPage/faxIcon.svg"
import localisationIcon from "../../../public/assets/modificationsPage/localisationIcon.svg"
import modificationListeDescard from "../../../public/assets/modificationsPage/modificationListeDescard.svg"
import styles from "src/styles/agenciesModificaitonStyles/modificaitonListe.module.css"
import InputBar from "./inputBar"

function modificationListe(Props){
    return(
        <div className={styles.dataModification}>
            <form className={styles.dataInput}>
                <span className={styles.inputMessage}>Nom de la banque *</span>
                <select name="bankName" className={styles.inputBlock} required>
                    <option value="Banque d'Algérie pour le Développement Rural (BADR)">Banque d'Algérie pour le Développement Rural (BADR)</option>
                    <option value="Banque de l'Agriculture et du Développement Rural (BADR)">Banque de l'Agriculture et du Développement Rural (BADR)</option>
                    <option value="Banque Extérieure d'Algérie (BEA)">Banque Extérieure d'Algérie (BEA)</option>
                    <option value="Banque Nationale d'Algérie (BNA)">Banque Nationale d'Algérie (BNA)</option>
                    <option value="Caisse Nationale d'Epargne et de Prévoyance (CNEP)">Caisse Nationale d'Epargne et de Prévoyance (CNEP)</option>
                    <option value="Crédit Populaire d'Algérie (CPA)">Crédit Populaire d'Algérie (CPA)</option>
                    <option value="Société Générale Algérie (SGA)">Société Générale Algérie (SGA)</option>
                    <option value="Trust Bank Algeria (TBA)">Trust Bank Algeria (TBA)</option>

                </select>

                <span className={styles.inputMessage}>Wilaya *</span>
                <select name="wilaya" className={styles.inputBlock} required>
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


                <InputBar  record={{title:"Adresse *" , placeHolder:"Ex: 99 route de Meftah16310 Alger", icone:adressIcon ,type:"text"}}/>
                <InputBar  record={{title:"Numéro de téléphone" , placeHolder:"Ex: +213 21 98 53 99", icone:telIcone ,type:"tel"}}/>
                <InputBar  record={{title:"Fax" , placeHolder:"Ex: +213 21 98 53 99", icone:faxIcone ,type:"tel"}}/>
                <InputBar  record={{title:"Localisation" , placeHolder:"Ex: https://goo.gl/maps/onJ7hBd4oZ1fMpPj9", icone:localisationIcon ,type:"url"}}/>

        </form>

        
            <div className={styles.dataValidation}>
                <button>
                    
                    <span className={styles.modificationListeButtonsMessage}>{Props.record.message1}</span>
                    <Image src={Props.record.icone}></Image>
                
                </button>
                <button onClick={Props.handleAddAgencyAnnuler} >
                    
                    <span className={styles.modificationListeButtonsMessage}>{Props.record.message2}</span>
                    <Image src={modificationListeDescard}></Image>
                
                </button>
            </div>

        </div>
    )
}
export default modificationListe