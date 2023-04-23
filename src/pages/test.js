import LigneCondition from "@/components/common/ligneCondition";
import ListeCondition from "@/components/listeCondition";
import { useState } from "react";
function Test(){
    const [conditions,setConditions]=useState(
        [
            {
                "nom_prestation": "Ouverture de compte et délivrance chéquier" ,
                "categorie": "Ouverture Compte" ,
                "tarif": 0,
                "period": 0
            } ,
            {
                "nom_prestation": "Frais de tenue de compte courant" ,
                "categorie": "Tenue Compte" ,
                "tarif": 2500,
                "period": 90
            } ,
            {
                "nom_prestation": "Frais de tenue de compte chèque" ,
                "categorie": "Tenue Compte" ,
                "tarif": 1000,
                "period": 360
            } ,
            {
                "nom_prestation": "Frais de tenue de compte sur livret" ,
                "categorie": "Tenue Compte" ,
                "tarif": 0,
                "period": 0
            } ,
            {
                "nom_prestation": "Fermeture compte courant" ,
                "categorie": "Tenue Compte" ,
                "tarif": 0,
                "period": 0
            },
            {
                "nom_prestation": "Fermeture compte chèque" ,
                "categorie": "Fermeture Compte" ,
                "tarif": 0,
                "period": 0
            },
            {
                "nom_prestation": "Fermeture compte sur livret" ,
                "categorie": "Fermeture Compte" ,
                "tarif": 0,
                "period": 0
            },
            {
                "nom_prestation": "Fermeture compte devise" ,
                "categorie": "Fermeture Compte" ,
                "tarif": 0,
                "period": 0
            }
        ]
    )
    
    return(
        <div className="test">
            <ListeCondition conditions={conditions}/>
        </div>
    )
}
export default Test;