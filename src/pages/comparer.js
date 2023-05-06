import Filter from '../components/Filter';

export const getServerSideProps = () =>{
    const a = ['Particuliers','Professionels','Entreprise']
    return {
        props : {types_comptes: a}
    }
}

const compare = ({types_comptes}) => {
    return (
      <div> 
        <Filter types_comptes={types_comptes} />
      </div> 
    );
  };
  
export default compare;