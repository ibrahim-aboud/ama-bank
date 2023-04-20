import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { FiGlobe, FiUpload } from "react-icons/fi";
import { FaUndo } from "react-icons/fa"
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdFax, MdCancel } from "react-icons/md";
import { HiCheckCircle, HiPhone, HiLocationMarker, HiSearch } from "react-icons/hi";
import { RiBankFill } from "react-icons/ri";
import { wilayas } from "@/lib/utils/wilayaMap";
import Link from "next/link";


function BankInfoFormADD() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile1, setSelectedFile1] = useState();
  const [selectedFile2, setSelectedFile2] = useState();

  const router = useRouter();

  const [bank, setBank] = useState({
    name: "",
    description: "",
    websiteLink: "",
  });

  const [dg, setDg] = useState({
    bank_id: "",
    address: "",
    lat: 0,
    lng: 0,
    wilaya: "",
    phone: "",
    fax: "",
    location_link: ""
  })

  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);

  function handleFileInputChange(event, idBox) {
    const file = event.target.files[0];
    idBox == 1 ? setSelectedFile1(file) : setSelectedFile2(file)

    const reader = new FileReader();
    reader.onloadend = () => {
      idBox == 1 ? setPreview1(reader.result) : setPreview2(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // get excuted when the form is submitted
  async function sumbitHandler(event) {
    event.preventDefault();
    setLoading(true);

    try {
      // post request to the API to check user inputs and add to the database
      const response1 = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/banks", {bank: bank});
        
      const data1 = response1.data;

      if (selectedFile1) { // logo
        const fileExtension = selectedFile1.name.split(".").pop();
        const file = new File([selectedFile1], `${data1.id}.${fileExtension}`);

        const formData = new FormData();
        formData.append("file", file);

        await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/bank/logo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      if (selectedFile2) { // image
        const fileExtension = selectedFile2.name.split(".").pop();
        const file = new File([selectedFile2], `${data1.id}.${fileExtension}`);

        const formData = new FormData();
        formData.append("file", file);

        await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "/bank/image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
      }

      const dgToSend = {...dg, bank_id: data1.id};
      const response2 = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/dgs", {dg: dgToSend});
        
      const data2 = response2.data.dg;

      console.log(bank);
      console.log(data1);
      console.log(dgToSend);
      console.log(data2);

      // when the data is updated
      setError("");
      //router.reload();
    } catch (e) {
      setError(e.response?.data);
    }

    setLoading(false);
  }

  return (
    <div className="mb-20 mt-5">

      <form className="flex flex-col items-center" onSubmit={sumbitHandler}>
        <div className="py-8 lg:mx-16 flex items-center justify-center lg:gap-14 w-full">
            <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

            <div className="flex items-center justify-center gap-4 text-lg sm:text-xl md:text-3xl">
            <AiOutlineInfoCircle className=" font-bold" />
            <h3 className="font-bold">Informations générales sur la banque</h3>
            </div>

            <div className="hidden lg:block h-[2px] bg-black w-[25%]" />
        </div>
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="bank_name" className="block p-1">
            Nom de la banque
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full">
            <input
              type="text"
              name="bank_name"
              id="bank_name"
              placeholder="Ex: Natixis Algérie"
              className="bg-gray-100 outline-none px-4 flex-1"
              onChange={(event) =>
                setBank({ ...bank, name: event.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-[90%] lg:w-[900px]">
            <div className="md:mx-5 mb-4 md:w-[50%] md:ml-auto">
                <label className="p-1" htmlFor="bank_logo">Logo de la banque</label>
                <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
                    <input
                        type="file"
                        name="bank_logo"
                        id="bank_logo"
                        accept=".jpeg,.jpg,.png"
                        className="bg-gray-100 outline-none px-4 flex-1 w-full"
                        onChange={(event) => {handleFileInputChange(event, 1)}}
                    />
                    {preview1 && (
                        <Image
                        src={preview1}
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
            
            <div className="md:mx-5 mb-4 md:w-[50%] md:mr-auto">
                <label className="p-1" htmlFor="bank_image">Image de la banque (Preview)</label>
                <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
                    <input
                        type="file"
                        name="bank_image"
                        id="bank_image"
                        accept=".jpeg,.jpg,.png"
                        className="bg-gray-100 outline-none px-4 flex-1 w-full"
                        onChange={(event) => {handleFileInputChange(event, 2)}}
                    />
                    {preview2 && (
                        <Image
                        src={preview2}
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
        </div>

        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="description" className="block p-1">
            Description de la banque
          </label>
          <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
            <textarea
              id="description"
              name="bank_description"
              className="bg-gray-100 w-full h-[300px] outline-none"
              rows="4"
              placeholder="Entrer un description..."
              onChange={(event) =>
                setBank({ ...bank, description: event.target.value })
              }
            />
          </div>
        </div>

        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="bank_url" className="block p-1">
            Lien du site Web
          </label>
          <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
            <FiGlobe className="text-gray-600" size={24} />
            <input
              type="text"
              name="bank_url"
              id="bank_url"
              placeholder="Ex: https://www.natixis.dz"
              className="bg-gray-100 outline-none px-4 flex-1"
              onChange={(event) =>
                setBank({ ...bank, websiteLink: event.target.value })
              }
            />
          </div>
        </div>

        <div className="py-6 smx:border-t-4 md:mx-16 flex items-center justify-center gap-14 w-full">
          <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

          <div className="flex items-center justify-center gap-4 text-lg sm:text-xl md:text-3xl">
            <AiOutlineInfoCircle className=" font-bold" />
            <h3 className="font-bold">
              Informations sur la Direction Générale
            </h3>
          </div>

          <div className="hidden lg:block h-[2px] bg-black w-[24%]" />
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <label className="p-1" htmlFor="wilaya">Wilaya</label>
            <div className="bg-gray-100 w-full px-4 py-3 rounded-md border flex items-center">
              <HiSearch className="text-gray-600" size={24} />
              <select
                id="wilaya"
                name="wilaya"
                className="bg-gray-100 outline-none block w-full hover:border-gray-500 px-4 py-2 pr-8 rounded-2xl leading-tight focus:outline-none focus:shadow-outline"
                onChange={(event) =>
                    setDg({ ...dg, wilaya: parseInt(event.target.value) })
                }
              >
                <option value="">-- Selectionner une Wilaya --</option>
                {wilayas.map((wilaya) => (
                  <option key={wilaya.code} value={+wilaya.code}>
                    {wilaya.code} - {wilaya.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mx-5 mb-4  w-[90%] lg:w-[900px]">
            <label className="p-1" htmlFor="dg_address">Adresse du siège social</label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <RiBankFill className="text-gray-600" size={24} />
              <input
                type="text"
                id="dg_address"
                name="dg_address"
                placeholder="Ex: 99 route de Meftah 16310 Alger"
                className="bg-gray-100 outline-none px-4 flex-1"
                onChange={(event) =>
                    setDg({ ...dg, address: event.target.value })
                }
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <label className="p-1" htmlFor="dg_phone">Numéro de téléphone</label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <HiPhone className="text-gray-600" size={24} />
              <input
                type="text"
                name="dg_phone"
                id="dg_phone"
                placeholder="Ex: +213 21 98 53 99"
                className="bg-gray-100 outline-none px-4 flex-1"
                onChange={(event) =>
                    setDg({ ...dg, phone: event.target.value })
                }
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <label className="p-1" htmlFor="dg_fax">Fax</label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <MdFax className="text-gray-600" size={24} />
              <input
                type="text"
                name="dg_fax"
                id="dg_fax"
                placeholder="Ex: +213 21 98 53 99"
                className="bg-gray-100 outline-none px-4 flex-1"
                onChange={(event) =>
                    setDg({ ...dg, fax: event.target.value })
                }
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <label className="p-1" htmlFor="dg_localtion_url">Localisation GPS (Lien vers Google Maps)</label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center">
              <HiLocationMarker className="text-gray-600" size={24} />
              <input
                type="text"
                name="dg_location_url"
                id="dg_location_url"
                placeholder="Ex: https://goo.gl/maps/onJ7hBd4oZ1fMpPj9"
                className="bg-gray-100 outline-none px-4 flex-1"
                onChange={(event) =>
                    setDg({ ...dg, location_link: event.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* {error && (
          <div className="text-rose-500 font-bold text-center overflow-hidden mt-2">
            {error}
          </div>
        )} */}

        <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 w-full lg:w-[800px] lg:justify-between">
          <button
            type="submit"
            disabled={loading}
            className="mb-1 rounded-xl px-8 py-3 font-semibold bg-black text-white hover:shadow-xl hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
          >
            Ajouter la banque
            <HiCheckCircle size={23} className="ml-2" />
          </button>

          <button
            type="reset"
            disabled={loading}
            onClick={() => {
              setError("");
              setSelectedFile1(null);
              setSelectedFile2(null);
              setPreview1("");
              setPreview2("");
              setBank({
                name: "",
                description: "",
                websiteLink: "",
              });
            
              setDg({
                bank_id: "",
                address: "",
                lat: "",
                lng: "",
                wilaya: "",
                phone: "",
                fax: "",
                location_link: "",
              });
            }}
            className="rounded-xl px-8 py-3 font-semibold bg-black text-white hover:shadow-xl hover:bg-[#daa250] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
          >
            Effacer le formulaire
            <FaUndo size={20} className="ml-2" />
          </button>

          <Link href="/admin/home" className="mb-1 rounded-xl px-8 py-3 font-semibold bg-black text-white hover:shadow-xl hover:bg-[#EA5455] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
            Annuler
            <MdCancel size={23} className="ml-2" />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default BankInfoFormADD;
