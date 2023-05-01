import SearchBox from "@/components/common/searchBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Filters from "@/components/prestations/Filters";
import styles from "@/styles/prestations.module.css";
import List from "@/components/prestations/List";
import NameAndLogo from "@/components/prestations/NameAndLogo";
import Infos from "@/components/prestations/infos";

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
  const [bank,setBank] = useState(null) ;
  
  const [conditions,setConditions] = useState(null) ;
  const [FilteredConditions,setFilteredConditions] = useState(null) ;


  useEffect(()=>{
      if (!selectedBankId) {
          setConditions(null) ;
          return
      }

      axios.get(process.env.NEXT_PUBLIC_API_URL + `/prestations/${selectedBankId}`)
      .then((response)=>{
          setConditions(response.data.prestations) ;
          setFilteredConditions(response.data.prestations) ;
      })
      .catch(err=>{

      })

      axios.get(process.env.NEXT_PUBLIC_API_URL + `/bank/${selectedBankId}`)
      .then((response)=>{
          setBank(response.data.bank) ;
      })
      .catch(err=>{

      })

      
  },[selectedBankId]) ;

  if (!conditions) {
    setConditions([]) ;
    setFilteredConditions([]) ;
  }
    
    return (
      <main>
        <div className="mt-8 mb-4 md:mb-8 px-[10%]">
          <h2 className="font-semibold md:text-xl ml-2 mb-2">Nom de la banque</h2>
          <SearchBox
            items={banks}
            selectedId={selectedBankId}
            setSelectedId={setSelectedBankId}
            searchField="name"
            autoSelect={true}
          />
        </div>  
        
        <div className="w-full mb-10 md:mb-24 px-[10%]">
          <Filters types_comptes={types_comptes} types_prestations={types_prestations} prestations={conditions} setPrestations={setFilteredConditions} bank_id={selectedBankId}></Filters>
        </div>

        <div className="mb-10">
          <NameAndLogo bank_id={selectedBankId}/>
        </div>
  
        <div>
          <List conditions={FilteredConditions} />
        </div>

        {selectedBankId && (
          <div>
            <Infos website={(bank && bank.websiteLink) || ""} />
          </div>
        )}

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