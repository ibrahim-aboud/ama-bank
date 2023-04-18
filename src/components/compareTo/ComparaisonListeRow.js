import React, {useState, useEffect} from "react"
import Image from 'next/image';
import image1 from "../../../public/assets/comparaisonPage/xSymbole.png"
import image2 from "../../../public/assets/comparaisonPage/gratuitSymoble.png"
import styles from "src/styles/compareToListeStyles/ComparaisonListeRow.module.css"
import axios from "axios"


function ComparaisonListeRow(props){
    let style = null
    if(props.style.greyBackground === true){
        style = {
            backgroundColor : 'rgba(217, 217, 217, 0.1)',
            borderTop : '2px solid rgba(0, 0, 0, 0.05)',
            borderBottom :'2px solid rgba(0, 0, 0, 0.05)'
        }
    } else {
        style = {}
    }
    let colors = ["#C80000", "#008F4E"]
    let imgUrls = [image1, image2]
    let prestationsBank1, prestationsBank2
/*     const[prestationsBank1, setPrestationsBank1] = useState(null)
    const[prestationsBank2, setPrestationsBank2] = useState(null) */
/*     const[prestationsToDisplay, setprestationsToDisplay] = useState([])
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + `/prestations/${props.object.bankName1}`).then(response =>{
            prestationsBank1 = response.prestations
        }).catch(error => {
            console.log(error.response.data || error.message)
        })
        axios.get(process.env.NEXT_PUBLIC_API_URL + `/bank/${props.object.bankName2}`).then(response =>{
            prestationsBank2 = response.data
        }).catch(error => {
            console.log(error.message)
        })
        prestationsBank1.sort((a, b) =>{
            a.name.compareTo(b.name)
        })
        prestationsBank2.sort((a, b) =>{
            a.name.compareTo(b.name)
        })
        let cpt1 = 0, cpt2 = 0
        while(cpt1 < prestationsBank1.length && cpt2 < prestationsBank2.length){
            let comparaison = prestationsBank1[cpt1].name.compareTo(prestationsBank2.name) 
            if(comparaison == 0){
                let obj = null
                if(prestationsBank1[cpt1].period * prestationsBank1[cpt1].tarif > prestationsBank2[cpt2].period * prestationsBank2[cpt2].tarif ){
                        obj = {
                            nom_prestation : prestationsBank1[cpt1].name,
                            tarifBanque0 : prestationsBank1[cpt1].toString(), 
                            tarifBanque1 : prestationsBank2[cpt2].toString(),
                            lowerPrice : 0,
                            higherPrice : 1
                        }
                } else {
                    if(prestationsBank1[cpt1].period * prestationsBank1[cpt1].tarif < prestationsBank2[cpt2].period * prestationsBank2[cpt2].tarif ){
                        obj = {
                            nom_prestation : prestationsBank1[cpt1].name,
                            tarifBanque0 : prestationsBank1[cpt1].toString(), 
                            tarifBanque1 : prestationsBank2[cpt2].toString(),
                            lowerPrice : 1,
                            higherPrice : 0
                        }
                    }
                     else{
                        obj = {
                            nom_prestation : prestationsBank1[cpt1].name,
                            tarifBanque0 : prestationsBank1[cpt1].toString(), 
                            tarifBanque1 : prestationsBank2[cpt2].toString(),
                            lowerPrice : 0,
                            higherPrice : 0
                        }
                     }
                }
                setprestationsToDisplay(prevState => {
                    prevState.push(obj)
                })
            
            } else {
                if(comparaison < 0){
                    cpt1++
                } else {
                    cpt2++
                }
            }
        }

    }, []) */

    return(
        <span className={styles.row} style = {style}>
            <div className={styles.prestationName}><span>{props.object.nom_prestation}</span></div>
            <div className={styles.value1} style={{color : colors[props.object.lowerPrice]}}>
                <span> {props.object.tarifBanque0} </span>
                <Image src={imgUrls[props.object.lowerPrice]} alt="Bon choix"/>
                
            </div>
            <div className={styles.value2} style={{color : colors[props.object.higherPrice]}}>
                <span> {props.object.tarifBanque1} </span>
                <Image src={imgUrls[props.object.higherPrice]} alt="Mauvais choix"/>
                
            </div>
        </span>
    )
}

export default ComparaisonListeRow
