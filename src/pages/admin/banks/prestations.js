import style from "@/styles/prestations.module.css";
import { useState } from "react";
import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import ListePrestations from "@/components/admin/banks/conditionTarifaire/listePrestations";
import axios from "axios";
import { useRouter } from "next/router";
import SearchBox from "@/components/common/searchBox";
function Prestations({banks}) {
  const router = useRouter();
  const{id} = router.query;
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

  const [prestations,setPrestations]=useState(
    [
        {
            "nom_prestation": "Ouverture de compte et délivrance chéquier" ,
            "categorie": "Ouverture Compte" ,
            "tarif": 0,
            "period": 0
        } ,
        {
            "nom_prestation": "Frais de tenue de compte courant" ,
            "categorie": "Tenue Compte" ,
            "tarif": 2500,
            "period": 90
        } ,
        {
            "nom_prestation": "Frais de tenue de compte chèque" ,
            "categorie": "Tenue Compte" ,
            "tarif": 1000,
            "period": 360
        } ,
        {
            "nom_prestation": "Frais de tenue de compte sur livret" ,
            "categorie": "Tenue Compte" ,
            "tarif": 0,
            "period": 0
        } ,
        {
            "nom_prestation": "Fermeture compte courant" ,
            "categorie": "Tenue Compte" ,
            "tarif": 0,
            "period": 0
        },
        {
            "nom_prestation": "Fermeture compte chèque" ,
            "categorie": "Fermeture Compte" ,
            "tarif": 0,
            "period": 0
        },
        {
            "nom_prestation": "Fermeture compte sur livret" ,
            "categorie": "Fermeture Compte" ,
            "tarif": 0,
            "period": 0
        },
        {
            "nom_prestation": "Fermeture compte devise" ,
            "categorie": "Fermeture Compte" ,
            "tarif": 0,
            "period": 0
        }
    ]
  )

  return(
    <div>
      <div className={style.bankSearchBox}>
        <h2>Nom de la banque</h2>
        <SearchBox
          items={banks}
          selectedId={selectedBankId}
          setSelectedId={setSelectedBankId}
          searchField={"name"}
        />
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
      process.env.NEXT_PUBLIC_API_URL +"/banks"
    );
    banks=response.data.banks;
  }
  catch(e){
    console.error(e.message);
  }

  return {
    props: { banks },
  };
}

export default Prestations;
