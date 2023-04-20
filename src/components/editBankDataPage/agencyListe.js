import React, {useState, useEffect} from "react"
import AgencyRow from "./agencyRow.js"
import dataAgencies from "../../../public/data/agenciesListe.json"
import dgIcone from "public/assets/modificationsPage/dgIcone.svg"
import  localisationIcon from "../../../public/assets/modificationsPage/localisationGreenIcon.svg"
import axios from "axios"

function agencyListe({handleDeleteAgency, handleEditAgencyInfo, agencyList}){
    let border = true;
    let isDg = "Siège sociale : "
    let agencyIcone = dgIcone
    agencyList.map((dataElement, index, arr) => {
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
             {agenciesList}
        </div>
    )
    }

export default agencyListe