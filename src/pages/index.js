import Head from "next/head";
 import ComparaisonListe from "../components/compareTo/ComparaisonListe.js"

export default function Home() {
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


  return (
     <>
      <Head>
        <title>amaBank</title>
        <meta name="description" content="Banks Comparison" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <main>
        <ComparaisonListe bank1={bank} bank2={bank2} prestationsBank1={prestations1} prestationsBank2={prestations2} />
      </main>
    </> 
  );
}
