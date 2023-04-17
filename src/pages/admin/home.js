import AdminLayout from "@/layouts/adminLayout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { TbHomeCog } from "react-icons/tb";
import { MdAddCircle, MdDeleteForever } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import SearchBox from "@/components/common/searchBox";
import { useRouter } from "next/router";
import Scrollbar from "@/components/common/scrollbar";

function BankListElement(props) {
  const [isGstBanksHidden, setIsGstBanksHidden] = useState(true);

  return (
    <div>
      <div className="flex justify-center items-center mb-7">
        <Image
          src={props.logo_src}
          alt={`${props.name} logo`}
          width={400}
          height={400}
          className="w-[80px] h-[80px] shadow-lg"
        />
        <h2 className="font-bold pl-8 text-2xl w-[35%]">{props.name}</h2>

        <div
          className="flex justify-center items-center gap-2 relative cursor-pointer rounded-xl bg-[#40916C] hover:bg-[#46a078] text-white shadow-md py-3 px-5 mr-3 hover:ease-in-out duration-300"
          onClick={() => setIsGstBanksHidden(!isGstBanksHidden)}
        >
          <span>Modifier les informations</span>
          {isGstBanksHidden ? (
            <FaAngleDown />
          ) : (
            <FaAngleDown className="rotate-180" />
          )}
          <div
            className={`${
              isGstBanksHidden ? "hidden" : "flex"
            } absolute z-40 bg-[#40916dfa] text-white flex-col justify-center items-center top-12 px-6 py-2 rounded-xl animate-fade-in`}
          >
            <Link
              href={`/admin/banks/general?id=${props.id}`}
              className="w-48 text-center py-1 hover:bg-gray-100 hover:text-black hover:rounded-xl"
            >
              Informations Générales
            </Link>
            <Link
              href="/admin/banks/agencies"
              className="w-48 text-center py-1 hover:bg-gray-100 hover:text-black hover:rounded-xl"
            >
              Agencies
            </Link>
            <Link
              href="/admin/banks/prestations"
              className="w-48 text-center py-1 hover:bg-gray-100 hover:text-black hover:rounded-xl"
            >
              Conditions Tarifaires
            </Link>
          </div>
        </div>

        <button className="rounded-xl px-5 py-3 font-semibold bg-[#EA5455] text-white shadow-md hover:bg-[#e24141] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
          Supprimer la banque
          <MdDeleteForever size={23} className="ml-2" />
        </button>
      </div>
    </div>
  );
}

function Home({ banks }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const [selectedBankId, setSelectedBankId] = useState(_getDefaultBankId());

  return (
    <div className="flex flex-col items-center h-screen mt-14">
      <div className="py-6 lg:mx-16 flex items-center justify-center lg:gap-14 w-full">
        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

        <div className="flex items-center justify-center gap-4 text-lg sm:text-xl md:text-3xl">
          <TbHomeCog className=" font-bold" />
          <h3 className="font-bold">Acceuil Administrateur</h3>
        </div>

        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />
      </div>

      <div className="flex flex-col items-center h-screen mt-14">
        <div className="flex items-center mb-16">
          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <h2 className="p-1 text-lg">Nom de la banque</h2>
            <div className="px-4 py-2 rounded-md border shadow-sm flex items-center w-full bg-gray-100">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Rechercher une banque..."
                  className="border-none outline-none w-full text-md bg-gray-100 p-2 rounded-md border"
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                  }}
                  value={searchQuery}
                />
              </div>
            </div>
          </div>
          <div>
            <Link
              href="/admin/banks/add-bank"
              className="rounded-xl px-8 py-3 mt-4 ml-10 font-semibold bg-black text-white shadow-xl hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
            >
              Ajouter une banque
              <MdAddCircle size={22} className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="w-full px-[4%] h-[600px]">
          <Scrollbar>
            <div className="w-full bg-[#d9d9d928] py-16 rounded-md">
              {filteredList.map((bank) => (
                <BankListElement
                  key={bank.id}
                  id={bank.id}
                  name={bank.name}
                  logo_src={bank.logoLink}
                />
              ))}
            </div>
          </Scrollbar>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function PageLayout(page) {
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
export default Home;
