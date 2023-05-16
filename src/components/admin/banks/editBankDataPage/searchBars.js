import React, {useState, useEffect} from "react"
import Image from "next/image"
import addIcone from "public/assets/modificationsPage/addAgencyIcone.svg"
import searchTool from "public/assets/modificationsPage/searchTool.svg"
import styles from "src/styles/agenciesModificaitonStyles/searchBars.module.css"
import Failed from "src/components/common/feedback_popups/fail.js"
import axios from "axios"

function SearchBars ({handleClickAddAgency, handleClickSearch, selectedId}){

        const[wilaya, setWilaya] = useState(0)
        const[agency, setAgency] = useState(0)
        const[bankName, setBankName] = useState(selectedId?selectedId:0)
        const[agencyList, setAgencyList] = useState([])
        const[agencyListGlobal, setAgencyListGlobal] = useState([])
        const[bankList, setBankList] = useState([])
        const [errStyle, setErrStyle] = useState(false)
        const[bankListPure, setBankListPure] = useState([])

        const handleClickSearchHere = () => {
            if(bankName == 0){
                setErrStyle(true)
                setAgencyList([])
                setAgencyListGlobal([])
                handleClickSearch(agencyList)

            } else 
            {
                setErrStyle(false)
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
                setBankListPure(response.data.banks)
                setBankList(response.data.banks.map(element =>{
                    return <option key={element.id} value={element.id} >{element.name}</option>
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [bankName])
            //send to controller
        useEffect(()=>{
            editWilaya(wilaya, false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [agencyListGlobal])

        var idsList = bankListPure.map(bnk=>{
            return bnk.id ;
        })

        useEffect(()=>{
            if (selectedId in idsList){
                setBankName(selectedId) ;
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[selectedId]) ;

        return(
            <div className={styles.container}>
                <div className={styles.addAgency}>
                    <div>
                        <span>Nom de la banque</span>
                        <select onClick={(e) => {editBankName(parseInt(e.target.value))}} className={styles.mySelect}>
                            {
                            (selectedId == null || bankListPure.find(element => element.id == bankName) == null ) ? (
                                <>
                                <option value="0">Sélectionner une Banque</option>
                                
                                {bankListPure.map((element,index) => 
                                        <option key={index} value={`${element.id}`}>{element.name}</option>)
                                }
                                </>
                            ): (

                                <>
                                    <option value={`${bankName}`}>{bankListPure.find(element => element.id == bankName)?.name}</option>
                                    {
                                        bankListPure.filter(element => element.id != bankName).map((element,index) => 
                                            <option key={index} value={`${element.id}`}>{element.name}</option>)
                                    }
                                </>
                            )
                        }
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
                        <select onChange={(e) => editWilaya(parseInt(e.target.value), true)} className={styles.mySelect}>
                            <option value="0" className={styles.myOption}>Sélectionner la wilaya</option>
                            <option value="16" className={styles.myOption}>16 - Alger</option>
                            <option value="01" className={styles.myOption}>01 - Adrar</option>
                            <option value="02" className={styles.myOption}>02 - Chlef</option>
                            <option value="03" className={styles.myOption}>03 - Laghouat</option>
                            <option value="04" className={styles.myOption}>04 - Oum El Bouaghi</option>
                            <option value="05" className={styles.myOption}>05 - Batna</option>
                            <option value="06" className={styles.myOption}>06 - Béjaïa</option>
                            <option value="07" className={styles.myOption}>07 - Biskra</option>
                            <option value="08" className={styles.myOption}>08 - Béchar</option>
                            <option value="09" className={styles.myOption}>09 - Blida</option>
                            <option value="10" className={styles.myOption}>10 - Bouira</option>
                            <option value="11" className={styles.myOption}>11 - Tamanghasset</option>
                            <option value="12" className={styles.myOption}>12 - Tébessa</option>
                            <option value="13" className={styles.myOption}>13 - Tlemcen</option>
                            <option value="14" className={styles.myOption}>14 - Tiaret</option>
                            <option value="15" className={styles.myOption}>15 - Tizi Ouzou</option>
                            <option value="17" className={styles.myOption}>17 - Djelfa</option>
                            <option value="18" className={styles.myOption}>18 - Jijel</option>
                            <option value="19" className={styles.myOption}>19 - Sétif</option>
                            <option value="20" className={styles.myOption}>20 - Saïda</option>
                            <option value="21" className={styles.myOption}>21 - Skikda</option>
                            <option value="22" className={styles.myOption}>22 - Sidi Bel Abbès</option>
                            <option value="23" className={styles.myOption}>23 - Annaba</option>
                            <option value="24" className={styles.myOption}>24 - Guelma</option>
                            <option value="25" className={styles.myOption}>25 - Constantine</option>
                            <option value="26" className={styles.myOption}>26 - Médéa</option>
                            <option value="27" className={styles.myOption}>27 - Mostaganem</option>
                            <option value="28" className={styles.myOption}>28 - Msila</option>
                            <option value="29" className={styles.myOption}>29 - Mascara</option>
                            <option value="30" className={styles.myOption}>30 - Ouargla</option>
                            <option value="31" className={styles.myOption}>31 - Oran</option>
                            <option value="32" className={styles.myOption}>32 - El Bayadh</option>
                            <option value="33" className={styles.myOption}>33 - Illizi</option>
                            <option value="34" className={styles.myOption}>34 - Bordj Bou Arréridj</option>
                            <option value="35" className={styles.myOption}>35 - Boumerdès</option>
                            <option value="36" className={styles.myOption}>36 - El Tarf</option>
                            <option value="37" className={styles.myOption}>37 - Tindouf</option>
                            <option value="38" className={styles.myOption}>38 - Tissemsilt</option>
                            <option value="39" className={styles.myOption}>39 - El Oued</option>
                            <option value="40" className={styles.myOption}>40 - Khenchela</option>
                            <option value="41" className={styles.myOption}>41 - Souk Ahras</option>
                            <option value="42" className={styles.myOption}>42 - Tipaza</option>
                            <option value="43" className={styles.myOption}>43 - Mila</option>
                            <option value="44" className={styles.myOption}>44 - Aïn Defla</option>
                            <option value="45" className={styles.myOption}>45 - Naama</option>
                            <option value="46" className={styles.myOption}>46 - Aïn Témouchent</option>
                            <option value="47" className={styles.myOption}>47 - Ghardaïa</option>
                            <option value="48" className={styles.myOption}>48 - Relizane</option>
                            <option value="49" className={styles.myOption}>49 - Timimoun</option>
                            <option value="50" className={styles.myOption}>50 - Bordj Badji Mokhtar</option>
                            <option value="51" className={styles.myOption}>51 - d{"'"}Ouled Djellal</option>
                            <option value="52" className={styles.myOption}>52 - Béni Abbès</option>
                            <option value="53" className={styles.myOption}>53 - In Salah</option>
                            <option value="54" className={styles.myOption}>54 - In Guezzam</option>
                            <option value="55" className={styles.myOption}>55 - Touggourt</option>
                            <option value="56" className={styles.myOption}>56 - Djanet</option>
                            <option value="57" className={styles.myOption}>57 - El M{"'"}Ghair</option>
                            <option value="58" className={styles.myOption}>58 - El Meniaa</option>
                        </select>
                    </div>
                    <div>
                        <span>Agence</span>
                        <select onChange={(e) => {editAgency(parseInt(e.target.value))}} className={styles.mySelect}>
                            <option value="0" className={styles.myOption}>Sélectionner une agence</option>
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

                <Failed message={"vous n'avez pas encore choisi le nom de la banque"} isVisible={errStyle} 
                isSuccessful={false}></Failed>
            </div>
        )
}
export default SearchBars