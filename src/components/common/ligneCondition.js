import style from "@/styles/ligneCondition.module.css";

function LigneCondition({condition1,condition2,first,single}){
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
    // basic rendering of services available in a given bank
    return (
        <div className="LignCondition">
            <div className={ first ? style.containerFrst :style.containerScnd}>
                <div className={style.nomTarifPrestation}>
                    <div className={style.nomPrestation}>{condition1.name}</div>
                    <div className={style.tarifPrestation}>{getTarif(condition1.tarif) + getPeriod(condition1.period)}</div>
                </div>
                {
                    !single 
                    &&
                    <div className={style.nomTarifPrestation}>
                        <div className={style.nomPrestation}>{condition2.name}</div>
                        <div className={style.tarifPrestation}>{getTarif(condition2.tarif) + getPeriod(condition2.period) }</div>
                    </div>
                }
                
            </div>
        </div>
    )
}
export default LigneCondition;