import Filter from '../components/Filter';
import { useState } from 'react';
import ComparaisonListe from '@/components/compareTo/ComparaisonListe';

const Compare = ({types_comptes,types_prestations}) => {
    var bank = {
      name: "Bank Kanki",
      id: 1
    }

    var bank2 = {
      name: "bank 2",
      id: 2
    }

    var prestations1 = [
      {
          "id": 8,
          "bank_id": 1,
          "categorie_id": 2,
          "name": "Nom prestation aaaa",
          "type": "particulier",
          "tarif": 400,
          "period": 365,
          "categorie_operation": "Opération de paiement"
      },
      {
          "id": 9,
          "bank_id": 1,
          "categorie_id": 2,
          "name": "Nom prestation aaddaa",
          "type": "particulier",
          "tarif": 400,
          "period": 365,
          "categorie_operation": "Opération de paiement"
      }
    ]

    var prestations2 = [
    {
        "id": 8,
        "bank_id": 2,
        "categorie_id": 2,
        "name": "Nom prestation aaaa",
        "type": "particulier",
        "tarif": 400,
        "period": 365,
        "categorie_operation": "Opération de paiement"
    },
    {
        "id": 9,
        "bank_id": 2,
        "categorie_id": 2,
        "name": "Nom prestation aaddaa",
        "type": "particulier",
        "tarif": 400,
        "period": 365,
        "categorie_operation": "Opération de paiement"
    }
  ]
    const [conditions,setConditions] = useState([]) ;

    const [FilteredConditions,setFilteredConditions] = useState([]) ;

    return (
      <div>
        <Filter types_comptes={types_comptes} types_prestations={types_prestations} prestations={conditions} setPrestations={setFilteredConditions}></Filter>
        <ComparaisonListe bank1={bank} bank2={bank2} prestationsBank1={prestations1} prestationsBank2={prestations2} />
      </div>
    );
};
  
export default Compare;

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