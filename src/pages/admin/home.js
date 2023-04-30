import AdminLayout from "@/layouts/adminLayout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { TbHomeCog } from "react-icons/tb";
import { MdAddCircle, MdDeleteForever } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import Scrollbar from "@/components/common/scrollbar";

// temp
import AddPrestPopup from "@/components/admin/banks/conditionTarifaire/add-prestation-popup";

function ConfirmDelete({ id, name, isDeleting, setIsDeleting }) {
  async function deleteBank(id) {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/banks/${id}`
      );
    } catch (e) {
      console.log(e.message);
    }
  }
  const router = useRouter();

  if (!isDeleting) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center ">
      <div className="w-[400px]">
        <div className="bg-white rounded p-10 flex flex-col justify-center items-center">
          <h2 className="mb-10 font-semibold">Voulez-vous supprimer "{name}"?</h2>
          <div>
              <button className="bg-gray-200 p-2 rounded border mr-10 hover:bg-gray-100 font-medium" onClick={async () => {
                  await deleteBank(id);
                  router.reload();

                  setIsDeleting(!isDeleting);
              }}>
                  Confirmer
              </button>
              <button className="bg-gray-200 p-2 rounded border hover:bg-gray-100 font-medium" onClick={() => {setIsDeleting(!isDeleting)}}>
                  Annuler
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BankListElement({ id, name, logo_src, isDeleting, setIsDeleting, onDelete }) {
  const [isGstBanksHidden, setIsGstBanksHidden] = useState(true);

  return (
    <div>
      <div className="flex justify-center items-center mb-5 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center w-[150px] sm:w-[400px]">
          <Image
            src={logo_src}
            alt={`${name} logo`}
            width={400}
            height={400}
            className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] shadow-lg"
          />
          <h2 className="font-bold sm:pl-[5%] sm:text-md smx:mt-2 lg:text-2xl">{name}</h2>
        </div>

        <div
          className="flex justify-center items-center gap-2 relative cursor-pointer rounded-xl bg-[#40916C] hover:bg-[#46a078] text-white shadow-md p-3 lg:py-3 lg:px-5 mr-3 hover:ease-in-out duration-300"
          onClick={() => setIsGstBanksHidden(!isGstBanksHidden)}
        >
          <span className="smx:hidden">Modifier les informations</span>
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
              href={`/admin/banks/general?id=${id}`}
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
              href={`/admin/banks/prestations?id=${id}`}
              className="w-48 text-center py-1 hover:bg-gray-100 hover:text-black hover:rounded-xl"
            >
              Conditions Tarifaires
            </Link>
          </div>
        </div>

        <button
          // onClick={deleteHandler}
          className="rounded-xl px-5 py-3 font-semibold bg-[#EA5455] text-white shadow-md hover:bg-[#e24141] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
        >
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

  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [nameToDelete, setNameToDelete] = useState("");
  const [isVisibleTemp, setIsVisibleTemp] = useState(false);

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
