import React, { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/Filters.module.css"
import { useRef } from "react";

const Filters = ({types_comptes, types_prestations, prestations, setPrestations, bank_id}) => {
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
    <div className="w-full" >
            <div className="w-full flex justify-between">
                <div className="p-4 flex justify-between bg-gray-100 border rounded-lg border-gray-300 w-[45%]">
                    <label className="">Type de compte</label>
                    <select name="type_compte" ref={selectBar} className="bg-gray-100" onChange={handleSelect}>
                    {
                        types_comptes.map((type,index)=>(
                            <option value={type} key={index} selected>
                                {type[0].charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))
                    }
                    </select>
                </div>
                <div className="flex justify-between p-4 bg-gray-100 border rounded-lg w-[45%] border-gray-300">
                    <label className="">
                        Type Prestations
                    </label>
                    <div className="" onClick={handleClick} onChange={(event)=>{handleChange(event)}} >
                        <Image src="/assets/icons/icon1.svg" alt="arrow" ref={arrow} width={30} height={30} />
                    </div>
                </div>
            </div>
            <div className="" ref={checkboxes}>
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
        </div>
  );
};

export default Filters;