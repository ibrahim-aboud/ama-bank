import React from "react"
import Head from "next/head"
import EditBankData from "src/components/common/editBankDataPageClient/editBankData.js"

export default function searchAgencyPage() {
    return (
       <>
        <Head>
          <title>amaBank</title>
          <meta name="description" content="Banks Comparison" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
  
        </Head>
  
        <main>
           <EditBankData /> 
        </main>
      </> 
      
    );
  }
  