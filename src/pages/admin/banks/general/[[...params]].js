import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import SearchBox from "@/components/admin/banks/general/searchBox";
import BankInfoForm from "@/components/admin/banks/general/bankInfoForm";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

function General({ banks, logos }) {
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

    return banks && banks.length > 0 ? banks[0].id : null;
  }

  const [selectedBankId, setSelectedBankId] = useState(_getDefaultBankId());

  return (
    <main>
      <div className="mt-8 mx-16">
        <h2 className="font-semibold ml-2">Nom de la banque</h2>
        <SearchBox
          items={banks}
          selectedId={selectedBankId}
          setSelectedId={setSelectedBankId}
          searchField="name"
        />
      </div>
      <div className="my-6 md:mx-16 flex items-center justify-center gap-14">
        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

        <div className="flex items-center justify-center gap-4 sm:text-xl md:text-3xl">
          <AiOutlineInfoCircle />
          <h3 className="font-bold">Informations générales sur la banque</h3>
        </div>

        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />
      </div>

      <div className="mt-8 mx-16">
        <BankInfoForm bankId={selectedBankId} logos={logos} />
      </div>
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

  const logosDirectory = path.join(
    process.cwd(),
    "public/assets/logos/banks_logos"
  );

  const logos = fs.readdirSync(logosDirectory);

  return {
    props: { banks, logos },
  };
}

export default General;
