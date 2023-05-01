import Filter from '../components/Filter';
import { useState } from 'react';

const Compare = ({types_comptes,types_prestations}) => {
    const [conditions,setConditions] = useState([]) ;

    const [FilteredConditions,setFilteredConditions] = useState([]) ;

    return (
      <div>
        <Filter types_comptes={types_comptes} types_prestations={types_prestations} prestations={conditions} setPrestations={setFilteredConditions}></Filter>
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