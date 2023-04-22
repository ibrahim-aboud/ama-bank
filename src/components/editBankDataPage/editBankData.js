import React, {useState} from "react";
import AgencyListe from "./agencyListe.js"
import Header from  "./headerListeOfModification.js"
import SearchBars from "./searchBars.js"
import styles from "src/styles/agenciesModificaitonStyles/editBankData.module.css"
import axios from "axios"
//petit beuge, quand on supprime une agence et on fait la recherche sur la meme place lagence retounera
function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function EditBankDataPage(){
    
    const[style, setStyle] = useState({
        display : 'none'
    })
    const[objToRender, setObjToRender] = useState(<></>)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [listeOfAgencies, setListeOfAgencies] = useState([])
    
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };


    const handleClickSearch = (list) => {
            setListeOfAgencies(list)
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
                <SearchBars  handleClickSearch={handleClickSearch} />
                <AgencyListe agencyList={listeOfAgencies} />     
            </div>
         
        
    )
}

export default EditBankDataPage