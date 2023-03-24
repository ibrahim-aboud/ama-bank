import Head from "next/head";
import ComparaisonListe from "../components/compareTo/ComparaisonListe.js"


export default function Home() {
  return (
     <>
      <Head>
        <title>amaBank</title>
        <meta name="description" content="Banks Comparison" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap" rel="stylesheet" />  
      </Head>

      <main>
        <ComparaisonListe />
      </main>
    </> 
    
  );
}
