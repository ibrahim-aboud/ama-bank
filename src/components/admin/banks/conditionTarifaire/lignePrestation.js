import style from "@/styles/lignePrestations.module.css";
import { RiPencilFill } from "react-icons/ri";
import {MdDeleteForever} from "react-icons/md";

function LignePrestation({prestation1,prestation2,first,single}){
    function deletePrestation(prestation){
        console.log("you deleted the prestation : "+prestation.name);
    }
    function editPrestation(prestation){
        console.log("you edited the prestation : "+prestation.name);
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
            <div className={ first ? style.containerFrst :style.containerScnd}>
                <div className={style.nomTarifPrestation}>
                    <div className={style.nomPrestation}>{prestation1.name}</div>
                    <div className={style.tarifPrestation}>{getTarif(prestation1.tarif) + getPeriod(prestation1.period)}</div>
                    <div className={style.pencil}><button onClick={()=>editPrestation(prestation1)}><RiPencilFill/></button></div>
                    <div className={style.bin}><button onClick={()=>deletePrestation(prestation1)}><MdDeleteForever/></button></div>
                </div>

                {
                    !single 
                    &&
                    <div className={style.nomTarifPrestation}>
                        <div className={style.nomPrestation}>{prestation2.name}</div>
                        <div className={style.tarifPrestation}>{getTarif(prestation2.tarif) + getPeriod(prestation2.period) }</div>
                        <div className={style.pencil}><button onClick={()=>editPrestation(prestation2)}><RiPencilFill/></button></div>
                        <div className={style.bin}><button onClick={()=>deletePrestation(prestation2)}><MdDeleteForever/></button></div>
                    </div>
                    
                }

                
            </div>
        </div>
    )

}
export default LignePrestation;