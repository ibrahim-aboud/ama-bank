import React from "react"
import Image from"next/image"
import styles from "src/styles/compareToListeStyles/ListePrestationLogos.module.css"

function ListePrestationsLogos(props){
    const img1Name = props.img1Name
    const img2Name = props.img2Name

    return(
        <span className={styles.headerListePrestations}>
            <div className={styles.image1}> 
                <Image src={img1Name} width={200} height={200} alt={props.object.bank1Name} />
                <span>{props.object.bank1Name}</span>
            </div>
            <div className={styles.image2}>
                <Image src={img2Name} width={200} height={200} alt={props.object.bank2Name} />
                <span>{props.object.bank2Name}</span>
            </div>
        </span>
    )
} 
export default ListePrestationsLogos