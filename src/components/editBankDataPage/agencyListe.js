import React from "react"
import AgencyRow from "./agencyRow.js"
import dataAgencies from "../../../public/data/agenciesListe.json"
import dgIcone from "public/assets/modificationsPage/dgIcone.svg"
import  localisationIcon from "../../../public/assets/modificationsPage/localisationGreenIcon.svg"
function agencyListe({handleDeleteAgency, handleEditAgencyInfo}){
    let border = true;
    let isDg = "Siège sociale : "
    let agencyIcone = dgIcone
    
    const dataComponent = dataAgencies.data.map((dataElement, index, arr) => {
        console.log(index + " " + dataAgencies.data.length - 1)
        if(index === arr.length - 1){
            border = false;
        } else {
            if (index === 1){
                isDg = "Adress : "
                agencyIcone = localisationIcon
            }
        }
        return <AgencyRow record={dataElement} isDg={isDg} agencyIcone={agencyIcone} style={{border}} handleDeleteAgency={handleDeleteAgency} handleEditAgencyInfo={handleEditAgencyInfo} />
    })
    
    return(
        <div>
             {dataComponent}
        </div>
    )
}

export default agencyListe