import React, { useEffect, useState } from "react"
import { useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

const Filters = ({types_comptes, types_prestations, prestations, setPrestations}) => {
    const checkboxes = useRef(null);
    const selectBar = useRef(null) ;
    const checkForm = useRef(null) ;
    const [common, setCommon] = useState(null) ;
    // const [localPrestations, setLocalPrestations] = useState([]) ;

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

    const [isGstBanksHidden, setIsGstBanksHidden] = useState(true);

  return (
    <div className="w-full" >
            <div className="w-full flex flex-col md:flex-row md:justify-between">
                <div className="p-4 mb-4 md:mb-0 flex justify-between bg-gray-100 border rounded-lg border-gray-300 md:w-[45%]">
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
                <div className="flex justify-between p-4 bg-gray-100 border rounded-lg md:w-[45%] border-gray-300">
                    <label className="">
                        Type Prestations
                    </label>
                    <div
                        className="flex justify-center items-center relative cursor-pointer rounded-xl hover:ease-in-out duration-300"
                        onClick={() => setIsGstBanksHidden(!isGstBanksHidden)}
                    >
                        {isGstBanksHidden ? (
                            <FaAngleDown />
                        ) : (
                            <FaAngleDown className="rotate-180" />
                        )}
                        <div
                            ref={checkboxes}
                            className={`${
                            isGstBanksHidden ? "hidden" : "flex"
                            } absolute z-40 bg-gray-100 text-black flex-col border justify-center items-center top-11 right-0 animate-fade-in shadow-md`}
                        >
                            <form action="" ref={checkForm} onChange={handleChange}>
                                {
                                    types_prestations.map((val,index)=>(
                                        <div key={index} className="w-[300px] flex text-center py-1 px-6 hover:bg-gray-200 hover:text-black" value={val}>
                                            <input type="checkbox" className="mr-3" id={index} value={val}/>
                                            <label htmlFor={index}>{val}</label>
                                        </div>
                                    ))
                                }
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
  );
};

export default Filters;