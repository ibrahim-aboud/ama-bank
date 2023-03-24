import React from "react"
import Image from 'next/image';
import image1 from "../../../public/assets/xSymbole.png"
import image2 from "../../../public/assets/gratuitSymoble.png"

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
    return(
        <span className="row" style = {style}>
            <div className="prestationName"><span>{props.object.nom_prestation}</span></div>
            <div className="value1" style={{color : colors[props.object.lowerPrice]}}>
                <span> {props.object.tarifBanque0} </span>
                <Image src={imgUrls[props.object.lowerPrice]} alt="Bon choix"/>
                
            </div>
            <div className="value2" style={{color : colors[props.object.higherPrice]}}>
                <span> {props.object.tarifBanque1} </span>
                <Image src={imgUrls[props.object.higherPrice]} alt="Mauvais choix"/>
                
            </div>
        </span>
    )
}

export default ComparaisonListeRow
