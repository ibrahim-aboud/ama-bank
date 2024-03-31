import style from "@/styles/prestations.module.css";
import { useEffect, useState } from "react";
import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import ListePrestations from "@/components/admin/banks/conditionTarifaire/listePrestations";
import axios from "axios";
import { useRouter } from "next/router";
import SearchBox from "@/components/common/searchBox";
import AddPrestPopup from "@/components/admin/banks/conditionTarifaire/add-prestation-popup";
import {RxReload} from "react-icons/rx";
import {AiOutlineInfoCircle} from "react-icons/ai";
import ModifyPrestation from "@/components/admin/banks/conditionTarifaire/modifyPrestation"
 
 function Prestations({banks,categories}) {
  const[fetch,setFetch]=useState(false);
  // these 3 functions modify the interface part
  function addPrestation(prestation){
    //setOldInfo(current => [...current, prestation]);
    setFetch(!fetch);
  }
  function editPrestation(prestation){
    // Create a new array with the updated object
    const newArray = oldInfo.map(item =>
      item.id === prestation.id ? prestation : item
    );

    // Update the state with the new array
    setOldInfo(newArray);

    //setFetch(!fetch);
  }
  function deletePrestation(prestation){
    setOldInfo(oldValues => {
      return oldValues.filter(current => current.id !== prestation.id)
    })
  }

  // a full functional modifying, adding and deleting page

  function refresh() {
    const tmp = selectedBankId;
    setSelectedBankId(null);

    setSelectedBankId(tmp);

  }
  const router = useRouter();
  const{id} = router.query;

  function _getDefaultBankId(){
    if(
      id !== null &&
      id !== undefined &&
      !isNaN(id) &&
      id>=0 &&
      Number.isInteger(parseInt(id))
    ){
      return parseInt(id);
    }
    // return banks && banks.length > 0 ? banks[0].id : null;
    return null;
  }

  const [categorieOperations,setCategorieOperations] = useState(
    [
        {
            "id":1,
            "name":"Gestion et tenue de compte"
        },
        {
            "id":2,
            "name":"Opération de paiement"
        },
        {
            "id":3,
            "name":"Monétique"
        }
    ]
);

  const [selectedBankId,setSelectedBankId] = useState(_getDefaultBankId);
  const [selectedCategorieId,setSelectedCategorieId] = useState(null);
  const [prestations,setPrestations]=useState(null)
  const [oldInfo, setOldInfo] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [conditionType,setCondtionType]=useState(null);
  const [addPopUp,setAddPopUp]=useState(false);
  const [selectedBigCategorieId,setSelectedBigCategorieId]=useState(null);

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
    // if(
    //     id == null ||
    //     id == undefined ||
    //     isNaN(id) ||
    //     id<0 ||
    //     Number.isInteger(parseInt(id))
    //   ){
    //     router.push(`/admin/banks/prestations?id=${selectedBankId}`);
    //     return ;
    //   }
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
      
  },[selectedBankId,fetch]);

  function checkCategorieId(categorie_id,selectedCategorieId){
    return categorie_id===selectedCategorieId;
  }

  useEffect(()=>{
    if(oldInfo!==null ){
      if(selectedBankId!==null && conditionType===null && selectedCategorieId!==null && selectedBigCategorieId===null){
        setPrestations(oldInfo.filter(function(prestation){return prestation.categorie_id===selectedCategorieId}));

      }
      else
      if(selectedBankId!==null && conditionType!==null && selectedCategorieId ===null && selectedBigCategorieId===null){

        setPrestations(oldInfo.filter(function(prestation){return prestation.type===conditionTypes.filter(function(condition){return condition.id===conditionType})[0].name}));
      }
      else
      if(selectedBankId!==null && conditionType!==null && selectedCategorieId !==null && selectedBigCategorieId===null){
        setPrestations(oldInfo.filter(function(prestation){return prestation.categorie_id===selectedCategorieId && prestation.type===conditionTypes.filter(function(condition){return condition.id===conditionType})[0].name}));

      }
      else
      if(selectedBankId!==null && conditionType===null && selectedCategorieId!==null && selectedBigCategorieId!==null){
        setPrestations(oldInfo.filter(function(prestation){return prestation.categorie_id===selectedCategorieId && prestation.categorie_operation===categorieOperations.find(item => item.id===selectedBigCategorieId).name}));
        
      }
      else
      if(selectedBankId!==null && conditionType!==null && selectedCategorieId===null && selectedBigCategorieId!==null){
      
        setPrestations(oldInfo.filter(function(prestation){return prestation.type===conditionTypes.filter(function(condition){return condition.id===conditionType})[0].name && prestation.categorie_operation===categorieOperations.find(item => item.id===selectedBigCategorieId).name}));
      }
      else
      if(selectedBankId!==null && conditionType!==null && selectedCategorieId!==null && selectedBigCategorieId!==null){
        setPrestations(oldInfo.filter(function(prestation){return prestation.categorie_id===selectedCategorieId && prestation.type===conditionTypes.filter(function(condition){return condition.id===conditionType})[0].name && prestation.categorie_operation===categorieOperations.find(item => item.id===selectedBigCategorieId).name}));
      
      }
      else
      if(selectedBankId!==null && conditionType===null && selectedCategorieId===null && selectedBigCategorieId!==null){
       
        setPrestations(oldInfo.filter(function(prestation){return  prestation.categorie_operation===categorieOperations.find(item => item.id===selectedBigCategorieId).name}));
      }
      else
      if(selectedBankId!==null && conditionType===null && selectedCategorieId===null && selectedBigCategorieId===null){
        setPrestations(oldInfo);
      }

    }
  },[selectedCategorieId,conditionType,selectedBigCategorieId,oldInfo,categorieOperations,conditionTypes,selectedBankId])


  return(
    <div>
      <AddPrestPopup isVisible={addPopUp} setIsVisible={setAddPopUp} bankId={selectedBankId} addPrestation={addPrestation}/>
      <div className="flex items-center mt-16 justify-center gap-4 text-lg sm:text-xl md:text-3xl">
          <AiOutlineInfoCircle className=" font-bold" />
          <h3 className="font-bold text-2xl">Informations générales sur la banque</h3>
      </div>
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
          <button className={style.button} onClick={()=>{if(!selectedBankId){alert("Veuillez selectionner une banque avant !")}else{setAddPopUp(true)}}}>Ajouter une prestation</button>
          <button 
            className={style.reload} 
            onClick={()=>{
              setSelectedCategorieId(null);
              setCondtionType(null);
              setSelectedBigCategorieId(null)
              }
            }
              >
            <div className={style.reloadButton}>
              <RxReload/>
            </div>
          </button>
        </div>
        
        

      </div>
      <div className={style.threeInputs}>
        <div className={style.categorieOperation}>
          <h2>Categorie</h2>
          <SearchBox
              items={categorieOperations}
              selectedId={selectedBigCategorieId}
              setSelectedId={setSelectedBigCategorieId}
              searchField={"name"}
              autoSelect={true}
          />
        </div>
        <div className={style.categorie}>
          <h2>{"Sous categorie"}</h2>
          <SearchBox
            items={categories}
            selectedId={selectedCategorieId}
            setSelectedId={setSelectedCategorieId}
            searchField={"name"}
            autoSelect={true}
          />
        </div>
        <div className={style.type}>
          <h2>Type
          </h2>
          <SearchBox
            items={conditionTypes}
            selectedId={conditionType}
            setSelectedId={setCondtionType}
            searchField={"name"}
            autoSelect={true}
          />  
        </div>
      </div>
      <ListePrestations prestations={prestations} deletePrestation={deletePrestation}  editPrestation={editPrestation}/>
      
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
