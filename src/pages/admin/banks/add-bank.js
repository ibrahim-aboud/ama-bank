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

function PrestationEntry(props) {
  return (
    <div>
      <h2 className="lg:hidden font-semibold px-2">{props.name}</h2>
      <div className="smx:px-[0%] p-3 flex justify-between">
        <div className="smx:hidden w-[270px] mb-3 font-semibold">
          <h2 className="font-semibold">{props.name}</h2>
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border rounded-md w-[110px] lg:w-[230px] py-2 md:py-3 px-4 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="particuliers"
            type="text"
            placeholder="Particuliers"
          />
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border rounded-md w-[110px] lg:w-[230px] py-2 md:py-3 px-4 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="professionnels"
            type="text"
            placeholder="Professionnels"
          />
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border rounded-md w-[110px] lg:w-[230px] py-2 md:py-3 px-4 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="entreprise"
            type="text"
            placeholder="Entreprise"
          />
        </div>
      </div>
    </div>
  );
}

function NewBank() {
  const [selectedWilaya, setSelectedWilaya] = useState(16);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleWilayaChange = (event) => {
    setSelectedWilaya(event.target.value);
  };

  const session = useSession();

  return (
    <div>
      <div className="mb-20">
        <div className="py-6 lg:mx-16 flex items-center justify-center lg:gap-14">
          <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

          <div className="flex items-center justify-center gap-4 text-lg sm:text-xl md:text-3xl">
            <AiOutlineInfoCircle className=" font-bold" />
            <h3 className="font-bold">Informations générales sur la banque</h3>
          </div>

          <div className="hidden lg:block h-[2px] bg-black w-[25%]" />
        </div>

        <div className="flex flex-col items-center">
          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <h2 className="p-1">Nom de la banque</h2>
            <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full">
              <input
                type="text"
                name="bank_name"
                placeholder="Ex: Natixis Algérie"
                className="bg-gray-100 outline-none px-4 flex-1"
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px] lg:pr-[450px]">
            <h2 className="p-1 ">Logo de la banque</h2>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <input
                type="file"
                name="bank_logo"
                accept=".jpeg,.jpg,.png"
                className="bg-gray-100 outline-none px-4 flex-1 w-full"
                onChange={handleFileInputChange}
              />
              {preview && (
                <Image
                  src={preview}
                  width={400}
                  height={400}
                  alt="Preview"
                  className="mr-5 rounded-md"
                  style={{ maxWidth: "50px", height: "auto" }}
                />
              )}
              <FiUpload className="pr-2 text-gray-600" size={28} />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <h2 className="p-1">Description de la banque</h2>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <textarea
                id="description"
                name="bank_description"
                className="bg-gray-100 w-full h-[300px] outline-none"
                rows="4"
                placeholder="Entrer un description..."
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <h2 className="p-1">Lien du site Web</h2>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <FiGlobe className="text-gray-600" size={24} />
              <input
                type="text"
                name="bank_url"
                placeholder="Ex: https://www.natixis.dz"
                className="bg-gray-100 outline-none px-4 flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="py-6 smx:border-t-4 md:mx-16 flex items-center justify-center gap-14">
          <div className="hidden lg:block h-[2px] bg-black w-[22%]" />

          <div className="flex items-center justify-center gap-4 text-[15px] sm:text-xl md:text-3xl">
            <AiOutlineInfoCircle className=" font-bold" />
            <h3 className="font-bold">
              Informations relatives aux prestations tarifaires
            </h3>
          </div>

          <div className="hidden lg:block h-[2px] bg-black w-[21%]" />
        </div>

        <div className="px-[5%] lgx:px-64 flex-col items-center mb-8">
          <div className="lg:flex justify-between mb-3">
            <div className="w-full lg:w-[280px] mb-6 font-semibold bg-green-700 text-white">
              <h2 className="p-4 w-full flex justify-center">
                Gestion et tenue de compte
              </h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Particuliers
              </h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Professionnels
              </h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Entreprise
              </h2>
            </div>
          </div>
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
        </div>

        <div className="px-[5%] lgx:px-64 flex-col items-center  mb-8">
          <div className="lg:flex justify-between mb-3">
            <div className="w-full lg:w-[280px] mb-6 font-semibold bg-green-700 text-white">
              <h2 className="p-4 w-full flex justify-center">
                Opérations de paiement
              </h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Particuliers
              </h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Professionnels
              </h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Entreprise
              </h2>
            </div>
          </div>
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
        </div>

        <div className="px-[5%] lgx:px-64 flex-col items-center mb-8">
          <div className="lg:flex justify-between mb-3">
            <div className="w-full lg:w-[280px] mb-6 font-semibold bg-green-700 text-white">
              <h2 className="p-4 w-full flex justify-center">Monètique</h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Particuliers
              </h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Professionnels
              </h2>
            </div>
            <div className="smx:hidden mb-3">
              <h2 className="w-[230px] p-4 text-gray-700 font-bold flex justify-center">
                Entreprise
              </h2>
            </div>
          </div>
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
          <PrestationEntry name="Ouverture de compte et déliverance chéquier" />
        </div>
      </div>

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

      <div className="lg:flex flex-col items-center py-5 lg:py-10 w-full lg:w-full">
        <div className="flex smx:flex-col items-center justify-center w-full lg:w-[800px] lg:justify-between">
          <button className="mb-1 rounded-xl px-8 py-3 font-semibold bg-black text-white shadow-xl hover:bg-green-600 disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
            Ajouter la banque
            <MdAddCircle size={23} className="ml-2" />
          </button>

          <button className="mb-1 rounded-xl px-8 py-3 font-semibold bg-black text-white shadow-xl hover:bg-green-600 disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
            Effacer le formulaire
            <FaUndo size={20} className="ml-2" />
          </button>

          <button className="rounded-xl px-8 py-3 font-semibold bg-black text-white shadow-xl hover:bg-green-600 disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
            Annuler les modifications
            <MdCancel size={23} className="ml-2" />
          </button>
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
