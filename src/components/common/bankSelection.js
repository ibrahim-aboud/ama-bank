import style from './../../styles/bankSelection.module.css'

function BankSelection (){
    return (
        <div className={style.BankSelection}>
            <h1 className={style.Title}>Comparaison des prestations bancaires</h1>
            <div className={style.input}>
                <div className={style.fakeImage}></div>
                <div className={style.inputZone} >
                    <div className={style.title}>
                        <h1>Nom de la première banque</h1>
                    </div>
                    <div className={style.fakeSearchBar}></div>
                    <div className={style.title}>
                        <h1>Nom de la deuxième banque</h1>
                    </div>
                    <div className={style.fakeSearchBar}></div>
                </div>
            </div>
            <div className='buttonSection'>
                    <button className={style.submit}>Comparer maintenant !</button>
            </div>
        </div>
    )

}

 
export default BankSelection;