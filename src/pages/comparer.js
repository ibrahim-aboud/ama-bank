import Filters from "@/components/common/Filters";
import ComparaisonListe from "@/components/compareTo/ComparaisonListe";
import BankSelection from "@/components/compareTo/bankSelection";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

function Compare({types_comptes,types_prestations,banks}){

  // a comparaison page for the user to pick two banks and filter shared services, also compare them 
  const router = useRouter();
  const { first,second } = router.query;

  function _getDefaultBankIds() {
    var first_id, second_id ;
    if (
      first !== null &&
      first !== undefined &&
      !isNaN(first) &&
      first >= 0 &&
      Number.isInteger(parseInt(first))
    ) {
      first_id =  parseInt(first);
    } else {
      first_id = null ;
    }

    if (
      second !== null &&
      second !== undefined &&
      !isNaN(second) &&
      second >= 0 &&
      Number.isInteger(parseInt(second))
    ) {
      second_id =  parseInt(second);
    } else {
      second_id = null ;
    }

    return {first_id,second_id}

    // return banks && banks.length > 0 ? banks[0].id : null;
  }

  var bnk = { 
    id: null, 
    name: "", 
    description: "", 
    visitsCount: null, 
    websiteLink: "", 
    updateDate: "", 
    logoLink: "/assets/images/Bank_Selection/scale.svg", 
    imageLink: ""
  }

  var ids = _getDefaultBankIds() ;

  const [selectedFirstBankId,setSelectedFirstBankId] = useState(ids.first_id) ;
  const [selectedSecondBankId,setSelectedSecondBankId] = useState(ids.second_id) ;

  const [prestationsBank1,setPrestationsBank1] = useState([]) ;
  const [prestationsBank2,setPrestationsBank2] = useState([]) ;

  const [bank1,setBank1] = useState(bnk) ;
  const [bank2,setBank2] = useState(bnk) ;

  //for the first bank only
  const [filteredPrestationsBank1, setFilteredPrestationsBank1] = useState([]) ;

  useEffect(()=>{
    if (!selectedFirstBankId) {
      setPrestationsBank1([]) ;
      setFilteredPrestationsBank1([]) ;
      return
    }

    axios.get(process.env.NEXT_PUBLIC_API_URL + `/bank/${selectedFirstBankId}`)
    .then(response=>{
          setBank1(response.data.bank) ;
    })
    .catch(err=>{
      setBank1(bnk) ;
    })

    axios.get(process.env.NEXT_PUBLIC_API_URL+ `/prestations/${selectedFirstBankId}`)
    .then(response=>{
      setPrestationsBank1(response.data.prestations) ;
      setFilteredPrestationsBank1(response.data.prestations) ;
    })
    .catch(err=>{
      setPrestationsBank1([]) ;
      setFilteredPrestationsBank1([]) ;
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFirstBankId]) ;

  useEffect(()=>{
    if (!selectedSecondBankId) {
      setPrestationsBank2([]) ;
      return
    }

    axios.get(process.env.NEXT_PUBLIC_API_URL + `/bank/${selectedSecondBankId}`)
    .then(response=>{
        setBank2(response.data.bank) ;
    })
    .catch(err=>{
      setBank1(bnk) ;
    })

    axios.get(process.env.NEXT_PUBLIC_API_URL+ `/prestations/${selectedSecondBankId}`)
    .then(response=>{
      setPrestationsBank2(response.data.prestations) ;
    })
    .catch(err=>{
      setPrestationsBank2([]) ;
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSecondBankId]) ;

  return (
    <>
      <div className="mb-20">
        <BankSelection
          items={banks}
          selectedFirstBankId={selectedFirstBankId}
          setSelectedFirstBankId={setSelectedFirstBankId}
          selectedSecondBankId={selectedSecondBankId}
          setSelectedSecondBankId={setSelectedSecondBankId}
        />
      </div>
      {selectedFirstBankId != null && selectedSecondBankId != null &&(
        <div className="w-full mb-10 md:mb-24 px-[10%]">
          <Filters types_comptes={types_comptes} types_prestations={types_prestations} prestations={prestationsBank1} setPrestations={setFilteredPrestationsBank1}/>
        </div>
      )}
      {selectedFirstBankId!=null && selectedSecondBankId!=null && (
        <div className="mb-20">
          <ComparaisonListe
            bank1={bank1}
            bank2={bank2} 
            prestationsBank1={filteredPrestationsBank1}
            prestationsBank2={prestationsBank2}
          />
        </div>
      )} 

    </>
  )

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

export default Compare;