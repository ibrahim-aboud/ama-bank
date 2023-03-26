import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function BankInfoForm({ bankId }) {
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/bank/${bankId}`)
      .then((response) => {
        setBank(response.data.bank);
      })
      .catch((e) => console.error(e.response.data));

    setLoading(false);
  }, [bankId]);

  // return <section>{JSON.stringify(bank)}</section>;
  return <section></section>;
}

export default BankInfoForm;
