import React, {useState} from "react";
import AgencyListe from "./agencyListe.js"
import Header from  "./headerListeOfModification.js"
import SearchBars from "./searchBars.js"
import DeleteCard from "./deleteConfirmation.js"
import SuccessCard from "./success.js"
import ModificationListe from "./modificationList.js"
import styles from "src/styles/agenciesModificaitonStyles/editBankData.module.css"
import modificaitonAddImg from "public/assets/modificationsPage/addAgencyIcone.svg"
import modificationModImg from "public/assets/modificationsPage/modificationListeCheck.svg"
import axios from "axios"

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function EditBankDataPage({selectedId}){
    
    const[style, setStyle] = useState({
        display : 'none'
    })
    const[objToRender, setObjToRender] = useState(<></>)
    const [listeOfAgencies, setListeOfAgencies] = useState([])
    const [overFlowStyle, setOverFlowStyle] = useState(null)
    

    const handleClickAddAgency = () => {
        setStyle({
            /* backgroundColor : '#00000090', */
            position : 'fixed',
            top : "0px",
            left : "0px",
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            animationName : styles.goAheadModification,
            animationDuration : ' 500ms',
            animationFillMode: 'forwards'
            
    
        })
        setOverFlowStyle({overflowY : "hidden"})
        let record = {message1 : "Ajouter une agence", message2 : "annuler", icone : modificaitonAddImg}
        setObjToRender(<ModificationListe record={record} handleAddAgencyAnnuler = {handleAnnuler} 
            handleUpdateScreen = {handleUpdateScreen} data={{}} />)
    }

    const handleAnnuler = () => {
        setObjToRender(<></>)
        setStyle({          
            position : 'fixed',
            top : "0px",
            left : "0px",
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            animationName : styles.goAheadModificationReverse,
            animationDuration : '500ms',
            animationFillMode: 'forwards'
            
     
        })
        setOverFlowStyle(null)
        timeout(500);
        setStyle({
                display : 'none'
        })
    }

    const handleDeleteAgency = (agencyId) => {
        setStyle({
            backgroundColor : '#00000090',
            position : 'fixed',
            top : "0px",
            left : "0px",
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center'
        })
        setObjToRender(<DeleteCard handleAnnuler={handleAnnuler} 
                                    handleButtonDeleteAgency={handleButtonDeleteAgency}
                                    style={{
                                        animationName : styles.animationSuccess
                                    }}
                                    agencyId = {agencyId} />)
    }

    const handleButtonDeleteAgency = (agencyId) => {
        setStyle({
            /* backgroundColor : '#00000090', */
            position : 'fixed',
            top : "0px",
            left : "0px",
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            animationName : styles.goAheadToNavigation,
            animationDuration : '1s',
            animationFillMode: 'forwards'
          
        })
        setObjToRender(<SuccessCard handleAnnuler={handleAnnuler}/>)
        let strTemp
        if(agencyId < 0){
            strTemp = "dgs"
        } else {
            strTemp = "agencies"
        }
        axios.delete(process.env.NEXT_PUBLIC_API_URL + `/${strTemp}/${agencyId}`)
        .then(response => {
            setListeOfAgencies(listeOfAgencies.filter(element => element.id != agencyId))
            console.log(response.data)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const handleEditAgencyInfo = (data) => {
        setStyle({
            /* backgroundColor : '#00000090', */
            position : 'fixed',
            top : "0px",
            left : "0px",
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            animationName : styles.goAheadModification,
            animationDuration : '500ms',
            animationFillMode: 'forwards'
            
        })
        setOverFlowStyle({overflowY : "hidden"})
        let record = {message1 : "Sauvegarder les modifications", message2 : "annuler", icone : modificationModImg }
        setObjToRender(<ModificationListe record={record} idAgency={data.id} data={data}
            handleAddAgencyAnnuler = {handleAnnuler} handleUpdateScreen = {handleUpdateScreen}/>)
   

    }
    const handleUpdateScreen = (objToSend, type) => {
        
        if(listeOfAgencies.length > 0){
            
            switch(type) {
                
                case "EditAgency":
                    if(listeOfAgencies[0].bank_id == objToSend.agency.bank_id){
                        
                        let index = listeOfAgencies.findIndex(element => 
                            element.id == objToSend.agency.id
                       )
                        let tempList = listeOfAgencies
                       tempList[index] = objToSend.agency
                       setListeOfAgencies(tempList)
                    }

                    break;
                case "EditDg" :
                    if(listeOfAgencies[0].bank_id == objToSend.dg.bank_id){
                        let index = listeOfAgencies.findIndex(element => 
                            element.id < 0
                    )
                    
                    let tempList = listeOfAgencies
                    let obj = objToSend.dg
                    obj.id = -obj.id
                    tempList[index] = obj
                    setListeOfAgencies(tempList)
                     }
                    break;
                case "AddAgency" :
        
                   break;
            }
        }

        
    }
    const handleClickSearch = (list) => {
            setListeOfAgencies(list)
    }

    return (
            <div className={styles.container} style={overFlowStyle}>
 
                <div className={styles.forAnimations} style={style} >
                    {objToRender}
                </div>  
         
                <Header />
                <SearchBars selectedId={selectedId} handleClickAddAgency={handleClickAddAgency} handleClickSearch={handleClickSearch} />
                <AgencyListe handleDeleteAgency={handleDeleteAgency} handleEditAgencyInfo={handleEditAgencyInfo} agencyList={listeOfAgencies} />     
            </div>
         
        
    )
}

export default EditBankDataPage