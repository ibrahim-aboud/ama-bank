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

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function EditBankDataPage(){
    
/*     let style = null
    function handleButtonClick(){
        style = {
            backgroundColor : '#00000090'
        }
    } */
    const[style, setStyle] = useState({
        display : 'none'
    })
    const[objToRender, setObjToRender] = useState(<></>)
    const [scrollPosition, setScrollPosition] = useState(0);
    
    
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const handleClickAddAgency = () => {
        setStyle({
            /* backgroundColor : '#00000090', */
            position : 'absolute',
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            animationName : styles.goAheadModification,
            animationDuration : ' 500ms',
            animationFillMode: 'forwards'
        })

        let record = {message1 : "Ajouter une agence", message2 : "annuler", icone : modificaitonAddImg}
        setObjToRender(<ModificationListe record={record} handleAddAgencyAnnuler = {handleAnnuler}/>)
    }

    const handleAnnuler = () => {
        setObjToRender(<></>)
        setStyle({          
            position : 'absolute',
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            animationName : styles.goAheadModificationReverse,
            animationDuration : '500ms',
            animationFillMode: 'forwards'
        })
        timeout(500);
        setStyle({
                display : 'none'
        })
    }

    const handleDeleteAgency = () => {
        handleScroll()
        setStyle({
            backgroundColor : '#00000090',
            position : 'absolute',
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center'
        })
        setObjToRender(<DeleteCard handleAnnuler={handleAnnuler} 
                                    handleButtonDeleteAgency={handleButtonDeleteAgency}
                                    style={{
                                        animationName : styles.animationSuccess
                                    }} />)
    }

    const handleButtonDeleteAgency = () => {
        setStyle({
            /* backgroundColor : '#00000090', */
            position : 'absolute',
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            animationName : styles.goAheadToNavigation,
            animationDuration : '1s',
            animationFillMode: 'forwards'
        })
        setObjToRender(<SuccessCard handleAnnuler={handleAnnuler}/>)
    }

    const handleEditAgencyInfo = () => {
        setStyle({
            /* backgroundColor : '#00000090', */
            position : 'absolute',
            height : '100%',
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            animationName : styles.goAheadModification,
            animationDuration : '500ms',
            animationFillMode: 'forwards'
        })
        let record = {message1 : "Sauvegarder les modifications", message2 : "annuler", icone : modificationModImg }
        setObjToRender(<ModificationListe record={record} handleAddAgencyAnnuler = {handleAnnuler}/>)
   

    }

    return (
            <div className={styles.container}>
               {/*  <button onClick={handleAnnuler}></button> */}
                <div className={styles.forAnimations} style={style} /*  */>
                    {objToRender}
                </div>  
{/*                  />
                 < className={styles.sucCard} />  */}
                
                <Header />
                <SearchBars handleClickAddAgency={handleClickAddAgency} />
                <AgencyListe handleDeleteAgency={handleDeleteAgency} handleEditAgencyInfo={handleEditAgencyInfo} />     
            </div>
         
        
    )
}

export default EditBankDataPage