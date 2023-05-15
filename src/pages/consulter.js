import SearchBox from "@/components/common/searchBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Filters from "@/components/common/Filters";
import List from "@/components/prestations/List";
import NameAndLogo from "@/components/prestations/NameAndLogo";
import Infos from "@/components/prestations/infos";
import { getSession } from "next-auth/react";


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


  useEffect( ()=>{
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
        console.log(err) ;
      })

      axios.get(process.env.NEXT_PUBLIC_API_URL + `/bank/${selectedBankId}`)
      .then((response)=>{
          setBank(response.data.bank) ;
          setBank(bank.websiteLink);
      })
      .catch(err=>{
        console.log(err) ;
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedBankId]) ;

  if (!conditions) {
    setConditions([]) ;
    setFilteredConditions([]) ;
  }

  if (bank ==null){
    var link=""
  } else {
    link = bank.websiteLink
  }

    
    return (
      <main className="mb-20">
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
          <Filters types_comptes={types_comptes} types_prestations={types_prestations} prestations={conditions} setPrestations={setFilteredConditions}></Filters>
        </div>

        <div className="mb-10">
          <NameAndLogo bank_id={selectedBankId}/>
        </div>
  
        <div>
          <List conditions={FilteredConditions} />
        </div>

        {selectedBankId && (
          <div>
            <Infos website={link} id={selectedBankId} />
          </div>
        )}

      </main>
    );

}

export async function getServerSideProps(context) {
    const session = await getSession(context);
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
      console.log(err) ;
      
    }
    
    return {props}
}
 
export default Consulter;