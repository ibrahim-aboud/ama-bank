import React, {useState, useEffect} from "react"
import AgencyRow from "./agencyRow.js"
import dataAgencies from "../../../public/data/agenciesListe.json"
import dgIcone from "public/assets/modificationsPage/dgIcone.svg"
import  localisationIcon from "../../../public/assets/modificationsPage/localisationGreenIcon.svg"


function agencyListe({handleDeleteAgency, handleEditAgencyInfo, agencyList}){
    let border = true;
    let agenciesList = agencyList.map((dataElement, index, arr) => {
        if(index === arr.length - 1){
            border = false;
        } 
        return <AgencyRow record={dataElement} isDg={"Adress :"} agencyIcone={localisationIcon} style={{border}} handleDeleteAgency={handleDeleteAgency} handleEditAgencyInfo={handleEditAgencyInfo} />
    })
    if(agencyList.length > 0 && agencyList[0].id == -1){
        border = agencyList.length > 1
        agenciesList[0] =  <AgencyRow record={agencyList[0]} isDg={"Siège sociale : "} agencyIcone={dgIcone} style={{border}} handleDeleteAgency={handleDeleteAgency} handleEditAgencyInfo={handleEditAgencyInfo} />
    }
    return(
        <div>
             {agenciesList}
        </div>
    )
    }

export default agencyListe