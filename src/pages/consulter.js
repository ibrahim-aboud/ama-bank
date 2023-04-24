import SearchBox from "@/components/common/searchBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Filters from "@/components/prestations/Filters";
import styles from "@/styles/prestations.module.css";
import List from "@/components/prestations/List";
import NameAndLogo from "@/components/prestations/NameAndLogo";

function Consulter({ types_comptes, types_prestations, banks}) {
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
  const [conditions,setConditions] = useState(null) ;

  useEffect(()=>{
      if (!selectedBankId) {
          setConditions(null) ;
          return
      }

      axios.get(process.env.NEXT_PUBLIC_API_URL + `/prestations/${selectedBankId}`)
      .then((response)=>{
          setConditions(response.data.prestations)
      })
      .catch(err=>{

      })
  },[selectedBankId]) ;

  if (!conditions) {
    setConditions([]) ;
  }
    
    return (
      <main className={styles.container}>
        <div className="mt-8 mb-8 mx-16 lg:px-[150px]">
          <h2 className="font-semibold md:text-xl ml-2 mb-2">Nom de la banque</h2>
          <SearchBox
            items={banks}
            selectedId={selectedBankId}
            setSelectedId={setSelectedBankId}
            searchField="name"
          />
        </div>  
        
        <div className="">
          <Filters types_comptes={types_comptes} types_prestations={types_prestations} prestations={conditions} setPrestations={setConditions}></Filters>
        </div>

          <div>
            <NameAndLogo bank_id={selectedBankId}/>
          </div>
    
          <div>
            <List conditions={conditions} />
          </div>

      </main>
    );

}

export async function getServerSideProps(context) {
    var props = {banks:[],types_comptes:[],types_prestations:[]} ;

    try {
      var response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/prestations/types`
      ) ;
      props.types_comptes = response.data.types ;

      response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/prestations/categories`
      ) ;
      props.types_prestations = response.data.categories ;

      response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/banks`
      ) ;
      props.banks = response.data.banks ;
        
    } catch(err){
      
    }
    
    return {props}
}
 
export default Consulter;