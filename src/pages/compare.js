import Filters from "@/components/common/Filters";
import ComparaisonListe from "@/components/compareTo/ComparaisonListe";
import BankSelection from "@/components/compareTo/bankSelection";
import axios from "axios";
import { useEffect, useState } from "react";

function Compare({types_comptes,types_prestations,banks}){

  const [prestations, setPrestations] = useState([]) ;
  const [selectedFirstBankId,setSelectedFirstBankId] = useState(null) ;
  const [selectedSecondBankId,setSelectedSecondBankId] = useState(null) ;

  const [prestationsBank1,setPrestationsBank1] = useState([]) ;
  const [prestationsBank2,setPrestationsBank2] = useState([]) ;

  const [bank1,setBank1] = useState([]) ;
  const [bank2,setBank2] = useState([]) ;

  //for the first bank only
  const [filteredPrestationsBank1, setFilteredPrestationsBank1] = useState([]) ;
  const [filteredPrestationsBank2,setFilteredPrestationsBank2] = useState([]) ;

  var bnk = {

  }

  useEffect(()=>{
    if (!selectedFirstBankId) {
      setPrestationsBank1([]) ;
      setFilteredPrestationsBank1([]) ;
      return
    }

    axios.get(process.env.NEXT_PUBLIC_API_URL + `/bank/${selectedFirstBankId}`)
    .then(response=>{
      setBank1(response.data.bank)
    })
    .catch(err=>{
      setBank1(bnk) ;
    })

    if (bank1==bnk) {
      setPrestationsBank1([]) ;
      setFilteredPrestationsBank1([]) ;
      return
    }

    axios.get(process.env.NEXT_PUBLIC_API_URL+ `/prestations/${selectedFirstBankId}`)
    .then(response=>{
      setPrestationsBank1(response.data.prestations) ;
      setFilteredPrestationsBank1(response.data.prestations) ;
      console.log(prestationsBank1) ;
    })
    .catch(err=>{
      setPrestationsBank1([]) ;
      setFilteredPrestationsBank1([]) ;
    })

    console.log(prestationsBank1) ;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFirstBankId]) ;

  useEffect(()=>{
    if (!selectedSecondBankId) {
      setPrestationsBank2([]) ;
      setFilteredPrestationsBank2([]) ;
      return
    }

    axios.get(process.env.NEXT_PUBLIC_API_URL + `/bank/${selectedSecondBankId}`)
    .then(response=>{ 
      setBank2(response.data.bank)
    })
    .catch(err=>{
      setBank2(bnk) ;
    })

    if (bank2==bnk) {
      setPrestationsBank2([]) ;
      setFilteredPrestationsBank2([]) ;
      return
    }

    axios.get(process.env.NEXT_PUBLIC_API_URL+ `/prestations/${selectedSecondBankId}`)
    .then(response=>{
      setPrestationsBank2(response.data.prestations) ;
      setFilteredPrestationsBank2(response.data.prestations) ;
    })

    .catch(err=>{
      setPrestationsBank2([]) ;
      setFilteredPrestationsBank2([]) ;
    })
    console.log(prestationsBank2) ;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSecondBankId]) ;

  useEffect(()=>{
    

  }, [selectedFirstBankId,selectedSecondBankId]) ;

  return (
    <>
      <div className="mb-10">
        <BankSelection
          items={banks}
          selectedFirstBankId={selectedFirstBankId}
          setSelectedFirstBankId={setSelectedFirstBankId}
          selectedSecondBankId={selectedSecondBankId}
          setSelectedSecondBankId={setSelectedSecondBankId}
        />
      </div>
      <div className="w-full mb-10 md:mb-24 px-[10%]">
        <Filters types_comptes={types_comptes} types_prestations={types_prestations} prestations={prestations} setPrestations={setFilteredPrestationsBank1}/>
      </div>
      {/* {selectedFirstBankId!=null && selectedSecondBankId!=null && ( */}
        <div>
          <ComparaisonListe
            bank1={bank1}
            bank2={bank2} 
            prestationsBank1={filteredPrestationsBank1}
            prestationsBank2={filteredPrestationsBank2}
          />
        </div>
      {/* )} */}

    </>
  )

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
    console.log(err) ; 
  }
  
  return {props}
}

export default Compare;