import React, { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/Filters.module.css"
import { useRef } from "react";

const Filters = ({types_comptes, types_prestations, prestations, setPrestations, map}) => {
    const arrow = useRef(null) ;
    const checkboxes = useRef(null);

    const handleClick = ()=>{
        if (checkboxes.current.style.display != 'none'){
            checkboxes.current.style.display = "none" ;
            arrow.current.style.transform = "rotate(0deg)" ;
        } else {
            checkboxes.current.style.display = "block" ;
            arrow.current.style.transform = "rotate(180deg)" ;
        }
    }

    const handleChange = (event)=>{
        // const {value,id} = event.target ;
        // if (event.target.checked){
        //     var newPrestations = prestations.filter(prst=>{
        //         return map.get(prst.categorie_id) == value ;
        //     })
        // } else {

        // }
        // setPrestations(newPrestations) ;
    }


  return (
    <div className={styles.container} >
            <div className={styles.filters}>
                <div className={styles.type_compte_container}>
                    <label className={styles.type_compte_label}>Type de compte</label>
                    <select name={styles.types_comptes_selectbar} id="types_prestations_selectbar" className={styles.types_comptes_selectbar}>
                    {
                        types_comptes.map((type,index)=>(
                            <option value={type} key={index}>
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
                    <div className={styles.T} onClick={handleClick}>
                        <Image src="/assets/icons/icon1.svg" alt="arrow" ref={arrow} width={30} height={30} />
                    </div>
                </div>
            </div>
            <div className={styles.checkBoxes} style={{display:"none"}} ref={checkboxes}>
                <form action="">
                    {
                        types_prestations.map((val,index)=>(
                            <div key={index} className={styles.check}>
                                <input type="checkbox" id={index} value={val} onChange={handleChange}/>
                                <label htmlFor={index}>{val}</label>
                            </div>
                        ))
                    }
                </form>
            </div>
            
        </div>
  );
};

export default Filters;