import React from "react"
import Head from "next/head"
import EditBankData from "src/components/common/editBankDataPageClient/editBankData.js"
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchAgencyPage() {
  const router = useRouter();
  const { id } = router.query;

  function _getDefaultBankId() {
    if (
      id !== null &&
      id !== undefined &&
      !isNaN(id) &&
      id >= 0 &&
      Number.isInteger(parseInt(id))
    ) {
      return parseInt(id);
    }

    // return banks && banks.length > 0 ? banks[0].id : null;
    return null;
  }

  console.log(_getDefaultBankId()) ;

  const [selectedBankId, setSelectedBankId] = useState(_getDefaultBankId());

    return (
       <>
        <Head>
          <title>amaBank</title>
          <meta name="description" content="Banks Comparison" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
  
        </Head>
  
        <main>
           <EditBankData selectedId={selectedBankId} /> 
        </main>
      </> 
      
    );
  }
  