import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import Comp from "src/components/admin/banks/editBankDataPage/editBankData.js"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Agencies() {
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
    return null ;
  }

  const [selectedBankId, setSelectedBankId] = useState(_getDefaultBankId());

  useEffect(()=>{
    setSelectedBankId(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <Comp selectedId={selectedBankId} />
    </>
  );
}

Agencies.getLayout = function PageLayout(page) {
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

export default Agencies;
