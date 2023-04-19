import React, {useState} from "react"
import Image from "next/image"
import styles from "src/styles/agenciesModificaitonStylesClient/inputBar.module.css"

function InputBar(Props){
    const [clicked, setClicked] = useState(false);
    let style, str
    if(clicked){
        style = {display : "none"}
    } else {
        style = null
    }

    if(Props.record.title === 'Adresse'){
        str = <input type={Props.record.type} onFocus={() => setClicked(!clicked)} onBlur={() => setClicked(!clicked)} required/>
    } else {
        str = <input type={Props.record.type} onFocus={() => setClicked(!clicked)} onBlur={() => setClicked(!clicked)}/>
    }

    return(
        <div className={styles.inputComponent}>
            <span  className={styles.inputMessage}>{Props.record.title}</span>
            <span className={styles.inputBar}>
                <Image src={Props.record.icone} style={style} alt="icone"></Image>
                <span style={style}>{Props.record.placeHolder} </span>
                {str}
            </span>
        </div>
    )
}

export default InputBar