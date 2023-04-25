import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import SearchBox from "@/components/common/searchBox";
import BankInfoForm from "@/components/admin/banks/general/bankInfoForm";
import { useRouter } from "next/router";

function General({ banks }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

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

  const [selectedBankId, setSelectedBankId] = useState(_getDefaultBankId());

  return (
    <main>
      <div className="mt-8 mx-16 lg:px-[150px]">
        <h2 className="font-semibold md:text-xl ml-2 mb-2">Nom de la banque</h2>
        <SearchBox
          items={banks}
          selectedId={selectedBankId}
          setSelectedId={setSelectedBankId}
          searchField="name"
        />
      </div>

      <BankInfoForm bankId={selectedBankId} />
    </main>
  );
}

General.getLayout = function PageLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  var banks = [];

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/banks"
    );

    banks = response.data.banks;
  } catch (e) {
    console.error(e.message);
  }

  return {
    props: { banks },
  };
}

export default General;
