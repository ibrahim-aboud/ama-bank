
import { useState } from "react";
import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import ListePrestations from "@/components/admin/banks/conditionTarifaire/listePrestations";
import axios from "axios";
function Prestations() {

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
      <ListePrestations prestations={prestations}/>
    </div>
  );
}

Prestations.getLayout = function PageLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  

  return {
    props: { session },
  };
}

export default Prestations;
