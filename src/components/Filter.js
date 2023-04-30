import React from "react"
import Image from "next/image"
import styles from "@/styles/Filter.module.css"

const Filter = ({types_comptes}) => {
    const fltrs = ["Gestion et tenue de compte", "Operation de paiement", "Monétique"] ;
    
    const handleClick = ()=>{
        var c = styles.checkBoxes ;
        var img = document.getElementById("arrow");
        var area = document.getElementsByClassName(c)[0] ;   
        if (area.style.display=='block'){
            area.style.display = "none" ;
            img.style.transform = "rotate(0deg)"
            
        } else {
            area.style.display = "block" ;
            img.style.transform = "rotate(180deg)"
        }
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
                                {type}
                            </option>
                        ))
                    }
                    </select>
                </div>
                <div className={styles.type_prestation_container}>
                    <label className={styles.types_prestations_label}>
                        Prestations
                    </label>
                    <div className={styles.T} onClick={handleClick}>
                        <Image src="/Vectors/ic_round-keyboard-arrow-down.svg" id="arrow" width={30} height={30} />
                    </div>
                </div>
            </div>
            <div className={styles.checkBoxes}>
                <form action="">
                    {
                        fltrs.map((t,index)=>(
                            <div key={index} className={styles.check}>
                                <input type="checkbox" id={t} className={styles.inp} />
                                <label htmlFor={t} >{t}</label>
                            </div>
                        ))
                    }
                </form>
            </div>
            <div className={styles.start_filter}>
                <button className={styles.start_compare_btn}  >
                <span>Filter les champs de la comparaison</span>
                <Image src="/Vectors/params_vector.svg" alt="qsdf" width={50} height={50} className={styles.param} />
                </button>
            </div>
        </div>
  );
};

export default Filter;
