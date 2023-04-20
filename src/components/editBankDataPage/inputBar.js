import React, {useState, useEffect} from "react"
import Image from "next/image"
import styles from "src/styles/agenciesModificaitonStyles/inputBar.module.css"
import validator from"validator"
function InputBar(Props){
    const [clicked, setClicked] = useState(false);
    const [style, setStyle] = useState(null)
    const [length, setLength] = useState(0)
    const [err, setErr] = useState(null)
    let  str

    const handleInput = (e) => {
        setStyle({display : "none"})
        setLength(e.target.value.length)
        console.log(validator.isURL(e.target.value), err)
        if((Props.record.title === "Localisation" && validator.isURL(e.target.value))||
            (Props.record.title === "Numéro de téléphone" && validator.isMobilePhone(e.target.value))||
            (Props.record.title === "Fax" && validator.isMobilePhone(e.target.value))
            
            ){
            Props.record.handleInputs(e.target.value, Props.record.title)
        } else {
            setErr({border : "2px solid red",
                    borderRadius : "5px 5px 5px 5px"})
        }
    }

    useEffect(() => {
        if(clicked){
            setStyle({display : "none"})
        } else if(!length){
            setStyle(null)
        }
    }, [clicked])


    if(Props.record.title === 'Adresse'){
        str = <input type={Props.record.type} onClick={(e) => handleInput(e)}
        onFocus={() => setClicked(!clicked)} 
        onBlur={() => setClicked(!clicked)} required />
    } else {
        str = <input type={Props.record.type} onFocus={() => setClicked(!clicked)} 
        onBlur={() => setClicked(!clicked)} style={err}
        onChange={(e) => handleInput(e)}/>
    }

    return(
        <div className={styles.inputComponent}>
            <span  className={styles.inputMessage}>{Props.record.title}</span>
            <span className={styles.inputBar}>
                <Image src={Props.record.icone} style={style}></Image>
                <span style={style}>{Props.record.placeHolder} </span>
                {str}
            </span>
        </div>
    )
}

export default InputBar