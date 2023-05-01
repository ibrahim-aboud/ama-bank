import React from "react"
import Image from "next/image"
import styles from "@/styles/Filter.module.css"
import { useRef } from "react";
import { useState, useEffect } from "react";

const Filter = ({types_comptes, types_prestations, prestations, setPrestations}) => {
    const arrow = useRef(null) ;
    const checkboxes = useRef(null);
    const selectBar = useRef(null) ;
    const checkForm = useRef(null) ;
    const [common, setCommon] = useState(null) ;
    // const [localPrestations, setLocalPrestations] = useState([]) ;

    const handleClick = ()=>{
        if (checkboxes.current.style.display != 'none'){
            checkboxes.current.style.display = "none" ;
            arrow.current.style.transform = "rotate(0deg)" ;
        } else {
            checkboxes.current.style.display = "block" ;
            arrow.current.style.transform = "rotate(180deg)" ;
        }
    }

    const handleSelect = ()=>{
        var val = selectBar.current.value ;
        var localPrestations =  prestations.filter((prst)=>{
            return prst.type.toUpperCase() == val.toUpperCase() ;
        }) ;

        checkForm.current.childNodes.forEach(node=>{
            node.childNodes[0].checked = false ;
        })

        setPrestations(localPrestations) ;
        setCommon(localPrestations) ;
    }

    useEffect(()=>{
        handleSelect() ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prestations]) ;

    const handleChange = ()=>{
        var finals = [] ;
        var checks  = checkForm.current.childNodes ;
        var num = 0 ;

        checks.forEach(element => {
            if (element.childNodes[0].checked){
                var newPrestations = common.filter(prst=>{
                    return prst.categorie_operation == element.childNodes[0].value
                })
                finals = [...finals,...newPrestations] ; 
                num=num+1 ;
            } else {
                num=num-1 ;
            }
        });
        
        if (num>-2){
            setPrestations(finals) ;
        } else {
            setPrestations(common) ;
        }
    }

  return (
    <div className={styles.container} >
            <div className={styles.filters}>
                <div className={styles.type_compte_container}>
                    <label className={styles.type_compte_label}>Type de compte</label>
                    <select name={styles.types_comptes_selectbar} ref={selectBar} className={styles.types_comptes_selectbar} onChange={handleSelect}>
                    {
                        types_comptes.map((type,index)=>(
                            <option value={type} key={index} selected>
                                {type[0].charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))
                    }
                    </select>
                </div>
                <div className={styles.type_prestation_container}>
                    <label className={styles.types_prestations_label}>
                        Type Prestations
                    </label>
                    <div className={styles.T} onClick={handleClick} onChange={(event)=>{handleChange(event)}} >
                        <Image src="/assets/icons/icon1.svg" alt="arrow" ref={arrow} width={30} height={30} />
                    </div>
                </div>
            </div>
            <div className={styles.checkBoxes} style={{display:"none"}} ref={checkboxes}>
                <form action="" ref={checkForm} onChange={handleChange}>
                    {
                        types_prestations.map((val,index)=>(
                            <div key={index} className={styles.check} value={val}>
                                <input type="checkbox" id={index} value={val}/>
                                <label htmlFor={index}>{val}</label>
                            </div>
                        ))
                    }
                </form>
            </div>

            <div className={styles.start_filter}>
                <button className={styles.start_compare_btn}>
                <span>Filter les champs de la comparaison</span>
                <Image src="/Vectors/params_vector.svg" width={50} height={50} alt="param" className={styles.param} />
                </button>
            </div>
        </div>
  );
};

export default Filter;