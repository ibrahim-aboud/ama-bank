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
import agencyListe from "./agencyListe.js";
//petit beuge, quand on supprime une agence et on fait la recherche sur la meme place lagence retounera
function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function EditBankDataPage(){
    
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
        setObjToRender(<ModificationListe record={record} handleAddAgencyAnnuler = {handleAnnuler}/>)
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

    const handleEditAgencyInfo = (agencyId) => {
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
        setObjToRender(<ModificationListe record={record} idAgency={agencyId} 
            handleAddAgencyAnnuler = {handleAnnuler} />)
   

    }

    const handleClickSearch = (list) => {
            console.log(list)
            setListeOfAgencies(list)
    }
      
    return (
            <div className={styles.container} style={overFlowStyle}>
               {/*  <button onClick={handleAnnuler}></button> */}
                <div className={styles.forAnimations} style={style} /*  */>
                    {objToRender}
                </div>  
                
{/*                  />
                 < className={styles.sucCard} />  */}
                
                <Header />
                <SearchBars handleClickAddAgency={handleClickAddAgency} handleClickSearch={handleClickSearch} />
                <AgencyListe handleDeleteAgency={handleDeleteAgency} handleEditAgencyInfo={handleEditAgencyInfo} agencyList={listeOfAgencies} />     
            </div>
         
        
    )
}

export default EditBankDataPage