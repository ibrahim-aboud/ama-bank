import style from "@/styles/lignePrestations.module.css";
import { RiPencilFill } from "react-icons/ri";
import { useState } from "react";
import {MdDeleteForever} from "react-icons/md";
import DeletePrestation from "./deletePrestation";
import ModifyPrestation from "./modifyPrestation";

function LignePrestation({prestation1,prestation2,first,single,deletePrestation,editPrestation}){
   

    //renders one line (two services) of the full list of services
    const [delPopUp1,setDelPopUp1]=useState(false);
    const [delPopUp2,setDelPopUp2]=useState(false);
    const [edtPopUp1,setEdtPopUp1]=useState(false);
    const [edtPopUp2,setEdtPopUp2]=useState(false);


    // 
    function deletePrestation1(){
        setDelPopUp1(true);
    }
    function deletePrestation2(){
        setDelPopUp2(true);
    }
    function editPrestation1(){
        setEdtPopUp1(true);
    }
    function editPrestation2(){
        setEdtPopUp2(true);
    }
    function getPeriod(period){
        switch(period){
            case 0 : return "";
            case 1 : return "/JOUR";
            case 7 : return "/SEMAINE";
            case 30 : return "/MOIS";
            case 90 : return "/TRIMESTRE";
            case 180 : return "/SEMESTRE";
            case 360 : return "/AN"
            default : return "";
        }
    }
    function getTarif(tarif){
        if (tarif===0){
            return "GRATUIT";
        }
        else if (tarif > 0){
            return tarif + " DA";
        }
        else return "non défini";
    }
    return (
        <div>
            <DeletePrestation isVisible={delPopUp1} setIsVisible={setDelPopUp1} prestation={prestation1} deletePrestation={deletePrestation}/>
            <DeletePrestation isVisible={delPopUp2} setIsVisible={setDelPopUp2} prestation={prestation2} deletePrestation={deletePrestation}/>
            <ModifyPrestation isVisible={edtPopUp1} setIsVisible={setEdtPopUp1} prestation={prestation1} editPrestation={editPrestation} />
            <ModifyPrestation isVisible={edtPopUp2} setIsVisible={setEdtPopUp2} prestation={prestation2} editPrestation={editPrestation} />
            <div className={ first ? style.containerFrst :style.containerScnd}>
                <div className={style.nomTarifPrestation}>
                    <div className={style.nomPrestation}>{prestation1.name}</div>
                    <div className={style.tarifPrestation}>{getTarif(prestation1.tarif) + getPeriod(prestation1.period)}</div>
                    <div className={style.pencil}><button onClick={()=>editPrestation1()}><RiPencilFill/></button></div>
                    <div className={style.bin}><button onClick={()=>deletePrestation1()}><MdDeleteForever/></button></div>
                </div>

                {
                    !single 
                    &&
                    <div className={style.nomTarifPrestation}>
                        <div className={style.nomPrestation}>{prestation2.name}</div>
                        <div className={style.tarifPrestation}>{getTarif(prestation2.tarif) + getPeriod(prestation2.period) }</div>
                        <div className={style.pencil}><button onClick={()=>editPrestation2()}><RiPencilFill/></button></div>
                        <div className={style.bin}><button onClick={()=>deletePrestation2()}><MdDeleteForever/></button></div>
                    </div>
                    
                }

                
            </div>
        </div>
    )

}
export default LignePrestation;