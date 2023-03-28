import AdminLayout from "@/layouts/adminLayout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { wilayas } from "@/lib/utils/wilayaMap";
import { getSession, useSession } from "next-auth/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiUpload, FiGlobe, FiPhone } from "react-icons/fi";
import { HiPhone, HiLocationMarker, HiSearch } from "react-icons/hi";
import { RiBankFill } from "react-icons/ri";
import { MdFax, MdAddCircle, MdCancel, MdDeleteForever } from "react-icons/md";
import { FaUndo, FaAngleDown } from "react-icons/fa";

function BankListElement(props) {
  const [isGstBanksHidden, setIsGstBanksHidden] = useState(true);

  return (
    <div>
      <div className="flex justify-center items-center mb-10">
        <Image
          src={props.logo_src}
          alt="amaBank logo"
          width={400}
          height={400}
          className="w-[80px] h-[80px] shadow-lg"
        />
        <h2 className="font-bold pl-8 text-2xl pr-[450px]">{props.name}</h2>

        <div
          className="flex justify-center items-center gap-2 relative cursor-pointer rounded-xl bg-green-600 hover:bg-green-700 text-white  shadow-md py-3 px-5 mr-3 hover:ease-in-out duration-300"
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
            } absolute z-40 bg-green-600 text-white flex-col justify-center items-center top-12 px-6 py-2 rounded-xl animate-fade-in`}
          >
            <Link
              href="/admin/banks/general"
              className="w-48 text-center py-1 hover:bg-green-700 hover:rounded-xl"
            >
              Informations Générales
            </Link>
            <Link
              href="/admin/banks/agencies"
              className="w-48 text-center py-1 hover:bg-green-700 hover:rounded-xl"
            >
              Agencies
            </Link>
            <Link
              href="/admin/banks/prestations"
              className="w-48 text-center py-1 hover:bg-green-700 hover:rounded-xl"
            >
              Conditions Tarifaires
            </Link>
          </div>
        </div>

        <button className="rounded-xl px-5 py-3 font-semibold bg-red-600 text-white shadow-md hover:bg-red-700 disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
          Supprimer la banque
          <MdDeleteForever size={23} className="ml-2" />
        </button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center h-screen mt-14">
      <div className="flex items-center mb-20">
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <h2 className="p-1 text-lg">Nom de la banque</h2>
          <div className="bg-gray-100 px-4 py-2 rounded-md border flex items-center w-full">
            <HiSearch className="text-gray-600" size={24} />
            <select
              id="bank"
              name="bank"
              className="bg-gray-100 outline-none block w-full hover:border-gray-500 px-4 py-2 pr-8 rounded-2xl leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- Selectionner une banque --</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.code} value={wilaya.name}>
                  {wilaya.code} - {wilaya.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Link
            href="/admin/banks/add-bank"
            className="rounded-xl px-8 py-4 mt-4 ml-10 font-semibold bg-black text-white shadow-xl hover:bg-green-600 disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
          >
            Ajouter une banque
            <MdAddCircle size={23} className="ml-2" />
          </Link>
        </div>
      </div>

      <div className="w-full">
        <BankListElement
          name="Natixis Algérie"
          logo_src="/assets/logos/logo.png"
        />
        <BankListElement
          name="Natixis Algérie"
          logo_src="/assets/logos/logo.png"
        />
        <BankListElement
          name="Natixis Algérie"
          logo_src="/assets/logos/logo.png"
        />
        <BankListElement
          name="Natixis Algérie"
          logo_src="/assets/logos/logo.png"
        />
      </div>
    </div>
  );
}

Home.getLayout = function PageLayout(page) {
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

export default Home;
