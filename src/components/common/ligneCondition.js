import style from "@/styles/ligneCondition.module.css";

function LigneCondition({condition1,condition2}){
    return (
        <div className="LignCondition">
            <div className={style.container}>
                <div>{condition1.nom_prestation}{condition1.tarif}{condition1.period}</div>
                <div>{condition2.nom_prestation}{condition2.tarif}{condition2.period}</div>
            </div>
        </div>
    )
}
export default LigneCondition;