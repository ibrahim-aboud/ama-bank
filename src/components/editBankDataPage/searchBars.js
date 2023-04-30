import React, {useState, useEffect} from "react"
import Image from "next/image"
import addIcone from "public/assets/modificationsPage/addAgencyIcone.svg"
import searchTool from "public/assets/modificationsPage/searchTool.svg"
import styles from "src/styles/agenciesModificaitonStyles/searchBars.module.css"
import choiceListe from "public/data/wilayaAgencies.json"
import agencyListe from "./agencyListe"
import { handleClientScriptLoad } from "next/script"
import axios from "axios"

function SearchBars ({handleClickAddAgency, handleClickSearch}){

        const[wilaya, setWilaya] = useState(0)
        const[agency, setAgency] = useState(0)
        const[bankName, setBankName] = useState(0)
        const[agencyList, setAgencyList] = useState([])
        const[agencyListGlobal, setAgencyListGlobal] = useState([])
        const[bankList, setBankList] = useState([])
        const [errStyle, setErrStyle] = useState({display : "none"})

        const handleClickSearchHere = () => {
            if(bankName == 0){
                setErrStyle({
                    display : "block", 
                    color : "red", 
                    textAlign : "center"
                })
                setAgencyList([])
                setAgencyListGlobal([])
                handleClickSearch(agencyList)

            } else 
            {
                setErrStyle({display : "none"})
                if(agency == 0){
                handleClickSearch(agencyList)
                } else{
                    handleClickSearch([agencyList.find(element => element.id == agency)])
                }
            }
        }

        useEffect(() => {
            axios.get(process.env.NEXT_PUBLIC_API_URL + `/banks`)
            .then(response =>{
                setBankList(response.data.banks.map(element =>{
                    return <option value={element.id} >{element.name}</option>
                }))
            }).catch(err => {
                console.log( err.message )
            })
        }, [])
        
        const editWilaya = (wilayaId, same) => {
            if((wilayaId != wilaya || (wilayaId == wilaya && !same)) && wilayaId != 0){
                setWilaya(wilayaId)
                setAgencyList(agencyListGlobal.filter(element => {return element.wilaya == wilayaId}))
            } else if((wilayaId != wilaya || (wilayaId == wilaya && !same)) && wilayaId == 0){
                setWilaya(wilayaId)
                setAgencyList(agencyListGlobal)
            } 
        }
        const editAgency = (agencyId) => {
            setAgency(agencyId)
        }

        const editBankName = (bankId) =>{
            
            if(bankId != bankName){
                setBankName(bankId)
            }
        }

            useEffect(()=>{
                if(bankName != 0){
                    let tempList
                    
                    axios.get(process.env.NEXT_PUBLIC_API_URL + `/dgs/${bankName}`).then(response => {
                        tempList = response.data.dgs
                        tempList[0].id = -tempList[0].id
                        return axios.get(process.env.NEXT_PUBLIC_API_URL + `/agencies/${bankName}`)
                    }).then(response => {
                        tempList = tempList.concat(response.data.agencies)
                        setAgencyListGlobal(tempList)
                    }).catch(err => {
                        console.log(err.message)
                    })
      
                    
                if(agencyListGlobal.length != 0)
                    {setAgencyListGlobal([])
                    setAgencyList([])}
                if(agency != 0)
                    {setAgency(0)}
                    
            }
            }, [bankName])
            //send to controller
        useEffect(()=>{
            editWilaya(wilaya, false)
        }, [agencyListGlobal])

        useEffect(() => {

        }, [wilaya])

        return(
            <div className={styles.container}>
                <div className={styles.addAgency}>
                    <div>
                        <span>Nom de la banque</span>
                        <select onClick={(e) => {editBankName(parseInt(e.target.value))}}>
                            <option value="0">Sélectionner une banque</option>
                            {bankList}
                        </select>
                    </div>
                    <button onClick={handleClickAddAgency} className="shadow-xl hover:bg-zinc-700">
                        <span>Ajouter une agence</span>
                        <Image src={addIcone} alt="icone"/>
                    </button>
                </div>
                <div className={styles.searchAgency}>
                    <div>
                        <span>Wilaya</span>
                        <select onChange={(e) => editWilaya(parseInt(e.target.value), true)} >
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
                    </div>
                    <div>
                        <span>Agence</span>
                        <select onChange={(e) => {editAgency(parseInt(e.target.value))}} >
                            <option value="0">Sélectionner une agence</option>
                            {
                                agencyList.map(element => 
                                    <option key = {element.id} value={element.id}>{element.wilaya} : {element.address}</option>    
                                    )}
                        </select>
                    </div>
                    <button className="shadow-xl hover:bg-sky-700" onClick={() => handleClickSearchHere()}>
                        <Image src={searchTool} alt="Icone"/> 
                        <span>Rechercher</span>
                    </button>                   
                </div>
                <div style={errStyle}>             
                    vous n'avez pas encore choisi le nom de la banque
                </div>
            </div>
        )
}
export default SearchBars