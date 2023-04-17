import React, {useState, useEffect} from "react"
import Image from "next/image"
import addIcone from "public/assets/modificationsPage/addAgencyIcone.svg"
import searchTool from "public/assets/modificationsPage/searchTool.svg"
import styles from "src/styles/agenciesModificaitonStylesClient/searchBars.module.css"
import choiceListe from "public/data/wilayaAgencies.json"
import agencyListe from "./agencyListe"
import { handleClientScriptLoad } from "next/script"

function SearchBars ({handleClickAddAgency}){

        const[wilaya, setWilaya] = useState(16)
        const[agency, setAgency] = useState(null)
        const[bankName, setBankName] = useState(null)
        const[agencyList, setAgencyList] = useState(choiceListe.correspondenceListe[1].listeOfAgencies)
    
        const handleButtonClickWilaya = (e) => {
            setWilaya(e.target.value)
            let objAgency = choiceListe.correspondenceListe.find((element) => {
                return element.wilaya == e.target.value
            })
            setAgencyList(objAgency.listeOfAgencies)
        }

        const handleButtonClickAgency = (e) => {
            //send to controller
        }

        const handleButtonClickBankName = (e) =>{
            //send to controller
        }
        /* console.log("azul" + agencyList.listeOfAgencies[0].agencyId) */
        return(
            <div className={styles.container}>
                <div className={styles.searchBankName}>
                    <span>Nom de la banque</span>
                    <select onChange={handleButtonClickBankName}>
                        <option>option 1</option>
                    </select>
                </div>
                <div className={styles.searchAgency}>
                    <div>
                        <span>Wilaya</span>
                        <select onChange={handleButtonClickWilaya}>
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
                    </div>
                    <div>
                        <span>Agence</span>
                        <select onChange={handleButtonClickAgency}>
                            <option>Sélectionner une agence</option>
                            {
                                agencyList.map(element => 
                                    <option value={element.agencyId}>{element.agencyName}</option>    
                            )}
                        </select>
                    </div>
                    <button>
                        <Image src={searchTool} alt="Icone"/> 
                        <span>Rechercher</span>
                    </button>                   
                </div>
            </div>
        )
}
export default SearchBars