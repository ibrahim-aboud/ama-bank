import InputBox from "@/components/common/inputBox.js";
import scale from "../../../public/assets/images/Bank_Selection/scale.svg";
import Image from "next/image";
import style from "../../styles/bankSelection.module.css";

function BankSelection ({items,selectedFirstBankId,setSelectedFirstBankId,selectedSecondBankId,setSelectedSecondBankId}){


  return (
      <div className="bankSelection">

        <h1 className={style.h1}>Comparaison des prestations bancaires</h1>
        
        <div className={style.selectionBody}>
          
          <Image className={style.img} src={scale} alt="scale"/>
          
          <div className={style.checkBoxs}>

            <div className={style.firstBank}>
              <h2 className={style.h2}>Nom de la première banque</h2>
              <InputBox
                items={items}
                selectedId={selectedFirstBankId}
                setSelectedId={setSelectedFirstBankId}
                searchField="name"
              />
            </div>

            <div className={style.secondBank}>
              <h2 className={style.h2}>Nom de la deuxième banque</h2>
              <InputBox
                items={items}
                selectedId={selectedSecondBankId}
                setSelectedId={setSelectedSecondBankId}
                searchField="name"
              />
            </div>
            
          </div>
          
        </div>
        
      </div>
  );
}

export default BankSelection