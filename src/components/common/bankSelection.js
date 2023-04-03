import style from './../../styles/bankSelection.module.css'
import { useState } from "react";
import SearchBox from "@/components/common/searchBox";
//import SearchBoxBankSelection from "@/components/common/searchBoxBankSelection";
import { useRouter } from "next/router";

function BankSelection ({banks}){
    const router = useRouter();
    const { id } = router.query;
  
    function _getDefaultBankId() {
      if (
        id !== null &&
        id !== undefined &&
        !isNaN(id) &&
        id >= 0 &&
        Number.isInteger(parseInt(id))
      ) {
        return parseInt(id);
      }
  
      // return banks && banks.length > 0 ? banks[0].id : null;
      return null;
    }
    const [selectedBankId, setSelectedBankId] = useState(_getDefaultBankId());
    return (
        <div className={style.BankSelection}>
            <h1 className={style.Title}>Comparaison des prestations bancaires</h1>
            <div className={style.input}>
                <div className={style.fakeImage}></div>
                <div className={style.inputZone} >
                    <div className={style.title}>
                        <h1>Nom de la première banque</h1>
                    </div>
                    <SearchBox
                        items={banks}
                        selectedId={selectedBankId}
                        setSelectedId={setSelectedBankId}
                        searchField="name"
                    />
                    <div className={style.title}>
                        <h1>Nom de la deuxième banque</h1>
                    </div>
                    <SearchBox
                        items={bankList}
                        selectedId={selectedBankId}
                        setSelectedId={setSelectedBankId}
                        searchField="name"
                    />
                </div>
            </div>
            <div className='buttonSection'>
                    <button className={style.submit}>Comparer maintenant !</button>
            </div>
        </div>
    )

}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    var banks = [];
  
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/banks"
      );
  
      banks = response.data.banks;
    } catch (e) {
      console.error(e.message);
    }
  
    return {
      props: { banks },
    };
  }

 
export default BankSelection;



  