import style from "@/styles/prestations.module.css";
import { useEffect, useState } from "react";
import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import ListePrestations from "@/components/admin/banks/conditionTarifaire/listePrestations";
import axios from "axios";
import { useRouter } from "next/router";
import SearchBox from "@/components/common/searchBox";
function Prestations({banks,categories}) {
  const router = useRouter();
  const{id} = router.query;
  console.log(id);
  function _getDefaultBankId(){
    if(
      id !== null &&
      id !== undefined &&
      !isNan(id) &&
      id>=0 &&
      Number.isInteger(parseInt(id))
    ){
      return parseInt(id);
    }
    // return banks && banks.length > 0 ? banks[0].id : null;
    return null;
  }

  const [selectedBankId,setSelectedBankId] = useState(_getDefaultBankId);
  const [selectedCategorieId,setSelectedCategorieId] = useState(null);
  const [prestations,setPrestations]=useState(null)
  const [oldInfo, setOldInfo] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [conditionType,setCondtionType]=useState(null);

  const conditionTypes=[
      { 
        "id":1,
        "name":"particulier"
      }, 
      {
        "id":2,
        "name":"professionnel"
      }, 
      {
        "id":3,
        "name":"entreprise"
      }
    ]

  useEffect(() => {
    if(!selectedBankId) {
      setPrestations(null);
      return;
    }
    setLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL+`/prestations/${selectedBankId}`)
      .then((response)=>{
        setPrestations(response.data.prestations);
        setOldInfo(response.data.prestations);

        setError("");
        setLoading(false);
      })
      .catch((e)=>{
        setError(e.response.data);
        setLoading(false);
      });
  },[selectedBankId]);

  function checkCategorieId(categorie_id,selectedCategorieId){
    return categorie_id===selectedCategorieId;
  }

  useEffect(()=>{
    if(oldInfo!==null ){
      if(selectedBankId!==null && conditionType===null && selectedCategorieId!==null){
        setPrestations(oldInfo.filter(function(prestation){return prestation.categorie_id===selectedCategorieId}));
        console.log("here")
      }
      if(selectedBankId!==null && conditionType!==null && selectedCategorieId ===null){
        console.log("here too")
        setPrestations(oldInfo.filter(function(prestation){return prestation.type===conditionTypes.filter(function(condition){return condition.id===conditionType})[0].name}));
      }
      if(selectedBankId!==null && conditionType!==null && selectedCategorieId !==null){
        setPrestations(oldInfo.filter(function(prestation){return prestation.categorie_id===selectedCategorieId && prestation.type===conditionTypes.filter(function(condition){return condition.id===conditionType})[0].name}));
        console.log("here as well");
      }

      console.log(selectedCategorieId);
      console.log(conditionType);
      console.log(prestations);
    }
  },[selectedCategorieId,conditionType])


  return(
    <div>
      <div className={style.bankSearchBox}>
        <h2>Nom de la banque</h2>
        <div className={style.inputButton}>
          <div className={style.searchBox}>
            <SearchBox
              items={banks}
              selectedId={selectedBankId}
              setSelectedId={setSelectedBankId}
              searchField={"name"}
              autoSelect={true}
            />
          </div>
          <button className={style.button}>Ajouter une prestation</button>
        </div>
      </div>
      <div className={style.twoInputs}>
        <div className={style.categorie}>
          <h2>Categorie de la prestation</h2>
          <SearchBox
            items={categories}
            selectedId={selectedCategorieId}
            setSelectedId={setSelectedCategorieId}
            searchField={"name"}
            autoSelect={true}
          />
        </div>
        <div className={style.type}>
          <h2>Type de prestation</h2>
          <SearchBox
            items={conditionTypes}
            selectedId={conditionType}
            setSelectedId={setCondtionType}
            searchField={"name"}
            autoSelect={true}
          />  
        </div>
      </div>
      <ListePrestations prestations={prestations}/>
    </div>
  );
}

Prestations.getLayout = function PageLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var banks = [];
  var categories = [];
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

    banks=response.data.banks;
  }
  catch(e){
    console.error(e.message);
  }

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/categories"
    );

    categories=response.data.categories;
  }
  catch(e){
    console.error(e.message);
  }

  return {
    props: { banks ,categories},
  };
}

export default Prestations;
