import Head from "next/head";
/* import ComparaisonListe from "../components/compareTo/ComparaisonListe.js"
import DeletePopUp from "../components/editBankDataPage/deleteConfirmation.js"
import SuccesPopUp from "../components/editBankDataPage/success.js"
import ModficationListe from "../components/editBankDataPage/modificationList.js"
import AgencyListe from "../components/editBankDataPage/agencyListe.js"
import Header from  "../components/editBankDataPage/headerListeOfModification.js"
import SearchBars from "../components/editBankDataPage/searchBars.js"*/
import EditBankData from "src/components/editBankDataPage/editBankData.js"
/* import EditBankDataClient from "src/components/editBankDataPageClient/editBankData.js" */

export default function Home() {
  return (
     <>
      <Head>
        <title>amaBank</title>
        <meta name="description" content="Banks Comparison" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main>
     {/*    <ComparaisonListe /> */}
   {/*      <DeletePopUp />  */} 

{/*          <SuccesPopUp />  */}
     {/* <ModficationListe record={{message1 : "Ajouter une agence", message2 : "annuler", icone="public/assets/modificationsPage/modificationListeCheck.svg"}} /> */}
    
{/*         <Header />
        <SearchBars />
        <AgencyListe /> */}
         <EditBankData /> 
        {/* <EditBankDataClient /> */}
      </main>
    </> 
    
  );
}
