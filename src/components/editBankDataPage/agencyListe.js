import React, {useState, useEffect} from "react"
import AgencyRow from "./agencyRow.js"
import Image from "next/image"
import dataAgencies from "../../../public/data/agenciesListe.json"
import dgIcone from "public/assets/modificationsPage/dgIcone.svg"
import  localisationIcon from "../../../public/assets/modificationsPage/localisationGreenIcon.svg"
import emptyBox from "../../../public/assets/modificationsPage/emptyBox.png"

function agencyListe({handleDeleteAgency, handleEditAgencyInfo, agencyList}){

    const [errStyle, setErrStyle] = useState(null)
    
    let border = true;
    let agenciesList = agencyList.map((dataElement, index, arr) => {
        
        if(index === arr.length - 1){
            border = false;
        } 
        return <AgencyRow record={dataElement} isDg={"Adress :"} agencyIcone={localisationIcon} style={{border}} handleDeleteAgency={handleDeleteAgency} handleEditAgencyInfo={handleEditAgencyInfo} />
    })

    useEffect(() => {
        if (agencyList.length > 0) {
          setErrStyle({ display: "none" });
          if (agencyList[0].id == -1) {
            border = agencyList.length > 1;
            agenciesList[0] = (
              <AgencyRow
                record={agencyList[0]}
                isDg={"Siège sociale : "}
                agencyIcone={dgIcone}
                style={{ border }}
              />
            );
          }
        } else {
          setErrStyle({
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: `"Nunito", sans-serif`,
            fontSize: "25px",
          });
        }
      }, [agencyList]);


    return(
        <div>
             {agenciesList}
             <div style={errStyle}>
                <Image src={emptyBox} alt="icon" style={{ height: '2em', width: 'auto' }} />
                <span >Liste vide!</span>
             </div>
        </div>
    )
    }

export default agencyListe