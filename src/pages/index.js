import Head from "next/head";
import Comp from "src/components/admin/editBankDataPage/editBankData.js"
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
        <Comp></Comp>
      </main>
    </> 
    
  );
}
