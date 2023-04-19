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
        
      </Head>
      <main>
        <ComparaisonListe />
      </main>
    </> 
  );
}
