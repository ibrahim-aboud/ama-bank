import AdminLayout from "@/layouts/adminLayout";
import { useState } from "react";
import { wilayas } from "@/lib/utils/wilayaMap";
import { getSession, useSession } from "next-auth/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiUpload, FiGlobe, FiPhone } from "react-icons/fi";
import { HiPhone, HiLocationMarker, HiSearch } from "react-icons/hi";
import { RiBankFill } from "react-icons/ri";
import { MdFax, MdAddCircle, MdCancel } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import Image from "next/image";
import BankInfoFormADD from "@/components/admin/banks/general/bankInfoForm+";

function NewBank() {
  const [selectedWilaya, setSelectedWilaya] = useState(16);

  const handleWilayaChange = (event) => {
    setSelectedWilaya(event.target.value);
  };

  const session = useSession();

  return (
    <div>
      <BankInfoFormADD />

      <div>
        <div className="py-6 smx:border-t-4 md:mx-16 flex items-center justify-center gap-14">
          <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

          <div className="flex items-center justify-center gap-4 text-lg sm:text-xl md:text-3xl">
            <AiOutlineInfoCircle className=" font-bold" />
            <h3 className="font-bold">
              Informations sur la Direction Générale
            </h3>
          </div>

          <div className="hidden lg:block h-[2px] bg-black w-[24%]" />
        </div>

        <div className="flex flex-col items-center">
          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <h2 className="p-1 ">Wilaya</h2>
            <div className="bg-gray-100 w-full px-4 py-3 rounded-md border flex items-center">
              <HiSearch className="text-gray-600" size={24} />
              <select
                id="wilaya"
                name="wilaya"
                className="bg-gray-100 outline-none block w-full hover:border-gray-500 px-4 py-2 pr-8 rounded-2xl leading-tight focus:outline-none focus:shadow-outline"
                value={selectedWilaya}
                onChange={handleWilayaChange}
              >
                <option value="">-- Selectionner une Wilaya --</option>
                {wilayas.map((wilaya) => (
                  <option key={wilaya.code} value={wilaya.name}>
                    {wilaya.code} - {wilaya.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mx-5 mb-4  w-[90%] lg:w-[900px]">
            <h2 className="p-1 ">Adresse du siège social</h2>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <RiBankFill className="text-gray-600" size={24} />
              <input
                type="text"
                name="bank_address"
                placeholder="Ex: 99 route de Meftah 16310 Alger"
                className="bg-gray-100 outline-none px-4 flex-1"
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <h2 className="p-1 ">Numéro de téléphone</h2>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <HiPhone className="text-gray-600" size={24} />
              <input
                type="text"
                name="bank_phone"
                placeholder="Ex: +213 21 98 53 99"
                className="bg-gray-100 outline-none px-4 flex-1"
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <h2 className="p-1 ">Fax</h2>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <MdFax className="text-gray-600" size={24} />
              <input
                type="text"
                name="bank_fax"
                placeholder="Ex: +213 21 98 53 99"
                className="bg-gray-100 outline-none px-4 flex-1"
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <h2 className="p-1 ">Localisation GPS (Lien vers Google Maps)</h2>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <HiLocationMarker className="text-gray-600" size={24} />
              <input
                type="text"
                name="bank_location_url"
                placeholder="Ex: https://goo.gl/maps/onJ7hBd4oZ1fMpPj9"
                className="bg-gray-100 outline-none px-4 flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

NewBank.getLayout = function PageLayout(page) {
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

export default NewBank;
