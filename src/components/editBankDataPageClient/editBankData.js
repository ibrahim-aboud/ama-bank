import React, {useState} from "react";
import AgencyListe from "./agencyListe.js"
import Header from  "./headerListeOfModification.js"
import SearchBars from "./searchBars.js"
import styles from "src/styles/agenciesModificaitonStylesClient/editBankData.module.css"


function EditBankDataPage(){

    return (
            <div className={styles.container}>
               {/*  <button onClick={handleAnnuler}></button> */}
 
{/*                  />
                 < className={styles.sucCard} />  */}
                
                <Header />
                <SearchBars />
                <AgencyListe />     
            </div>
         
        
    )
}

export default EditBankDataPage