import React from "react"
import AgencyRow from "./agencyRow.js"
import dataAgencies from "../../../public/data/agenciesListe.json"
import dgIcone from "public/assets/modificationsPage/dgIcone.svg"
import  localisationIcon from "../../../public/assets/modificationsPage/localisationGreenIcon.svg"
/* import axios from "axios" */
function agencyListe({handleDeleteAgency, handleEditAgencyInfo}){
    let border = true;
    let isDg = "Siège sociale : "
    let agencyIcone = dgIcone

    /* const obj = await axios.get("http://localhost:3000/api/agencies/" + bankId) */
        
    const getDataFunciton = async () => {
        await axios.get("", obj)
    }

    const dataComponent = dataAgencies.data.map((dataElement, index, arr) => {
        if(index === arr.length - 1){
            border = false;
        } else {
            if (index === 1){
                isDg = "Adress : "
                agencyIcone = localisationIcon
            }
        }
        return <AgencyRow key={index} record={dataElement} isDg={isDg} agencyIcone={agencyIcone} style={{border}} handleDeleteAgency={handleDeleteAgency} handleEditAgencyInfo={handleEditAgencyInfo} />
    })
    


    return(
        <div>
             {dataComponent}
        </div>
    )
}

export default agencyListe