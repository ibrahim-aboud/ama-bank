import React from "react"
import prestationsData from "../../../public/data/prestationsData.json"
import ComparaisonListeRow from "./ComparaisonListeRow.js"
import ListePrestationsLogos from "./ListePrestationsLogos.js"

function ComparaisonListe(){
    let greyBackground = true;
    const prestationsDataJSX = prestationsData.data.map((prestation) =>{
        greyBackground = !greyBackground;
        
         console.log(prestation)
         return <ComparaisonListeRow key ={prestation.id} object={prestation} style={{greyBackground}} />}
         )
    return(
        <div className="listePrestations">
            <ListePrestationsLogos object={prestationsData}/>
            <span> {prestationsDataJSX}</span>
           
        </div>
    )
}

export default ComparaisonListe