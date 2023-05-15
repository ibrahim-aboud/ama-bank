import React, {useState} from "react";
import AgencyListe from "./agencyListe.js"
import Header from  "./headerListeOfModification.js"
import SearchBars from "./searchBars.js"
import styles from "src/styles/agenciesModificaitonStylesClient/editBankData.module.css"

//petit beuge, quand on supprime une agence et on fait la recherche sur la meme place lagence retounera
function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function EditBankDataPage({selectedId}){
    
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
                <div className={styles.forAnimations} style={style} /*  */>
                    {objToRender}
                </div>  
                
                <Header />
                <SearchBars handleClickSearch={handleClickSearch} selectedId={selectedId} />
                <AgencyListe agencyList={listeOfAgencies} />     
            </div>
         
        
    )
}

export default EditBankDataPage