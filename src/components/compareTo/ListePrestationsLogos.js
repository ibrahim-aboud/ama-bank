import React from "react"
import Image from"next/image"
function ListePrestationsLogos(props){
    const img1Name = require("../../../public/assets/logos/" + props.object.bank1Name + ".png")
    const img2Name = require("../../../public/assets/logos/" + props.object.bank2Name + ".png")

    return(
        <span className="headerListePrestations">
            <div className="image1">
                <Image src={img1Name} alt={props.object.bank1Name} />
                <span>{props.object.bank1Name}</span>
            </div>
            <div className="image2">
                <Image src={img2Name} alt={props.object.bank2Name} />
                <span>{props.object.bank2Name}</span>
            </div>
        </span>
    )
} 
export default ListePrestationsLogos