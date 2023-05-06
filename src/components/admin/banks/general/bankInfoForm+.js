import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { FiGlobe, FiUpload } from "react-icons/fi";
import { FaUndo } from "react-icons/fa"
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdFax, MdCancel, MdOutlineClose } from "react-icons/md";
import { HiCheckCircle, HiPhone, HiLocationMarker, HiSearch } from "react-icons/hi";
import { RiBankFill } from "react-icons/ri";
import { wilayas } from "@/lib/utils/wilayaMap";
import Link from "next/link";
import SuccessFeedback from "@/components/common/feedback_popups/success";
import FailFeedback from "@/components/common/feedback_popups/fail";

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
    bank_id: 0,
    address: "",
    lat: 0,
    lng: 0,
    wilaya: 0,
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

  const [addSuccess, setAddSuccess] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

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

      console.log("heeeeyeyyeyye") ;
      if ("error" in response1.data){
        setError("ERREUR: banque déja existante!");
        setAddSuccess(false);
        setIsFeedbackVisible(true);
        setTimeout(() => {setAddSuccess(false); setIsFeedbackVisible(false)}, 2000);
      }
      else {
        const dgToSend = {...dg, bank_id: data1.id};
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/dgs", {dg: dgToSend});

        // when the data is updated
        setError("");
        setAddSuccess(true);
        setIsFeedbackVisible(true);
        setTimeout(() => {setAddSuccess(false); setIsFeedbackVisible(false)}, 2000);
        setTimeout(() => {router.replace("/admin/home")}, 1000);
      }

    } catch (e) {
      console.log(e);
      setError(e.response?.data);
      
      setAddSuccess(false);
      setIsFeedbackVisible(true);
      setTimeout(() => {setAddSuccess(false); setIsFeedbackVisible(false)}, 2000);
    }
    setLoading(false);
  }

  const [isResetting, setIsResetting] = useState(false);

  const formRef = useRef(null);

  return (
    <div>

      <form className="flex flex-col items-center" onSubmit={sumbitHandler} ref={formRef}>
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
            Nom de la banque<span className="text-red-500 font-bold text-xl">*</span>
          </label>
          <div className="bg-gray-100 p-4 rounded-md border focus-within:border-green-800 flex items-center w-full">
            <input
              type="text"
              name="bank_name"
              id="bank_name"
              placeholder="Ex: Natixis Algérie"
              className="bg-gray-100 outline-none px-4 flex-1"
              onChange={(event) =>
                setBank({ ...bank, name: event.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-[90%] lg:w-[900px]">
            <div className="md:mx-5 mb-4 md:w-[50%] md:ml-auto">
                <label className="p-1" htmlFor="bank_logo">Logo de la banque</label>
                <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
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
                <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
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
          <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
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
          <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
            <FiGlobe className="text-gray-600" size={24} />
            <input
              type="url"
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
            <label className="p-1" htmlFor="wilaya">Wilaya<span className="text-red-500 font-bold text-xl">*</span></label>
            <div className="bg-gray-100 w-full px-4 py-3 rounded-md border flex items-center focus-within:border-green-800">
              <HiSearch className="text-gray-600" size={24} />
              <select
                id="wilaya"
                name="wilaya"
                className="bg-gray-100 outline-none block w-full hover:border-gray-500 px-4 py-2 pr-8 rounded-2xl leading-tight focus:outline-none focus:shadow-outline"
                onChange={(event) =>
                    setDg({ ...dg, wilaya: parseInt(event.target.value) })
                }
                required
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
            <label className="p-1" htmlFor="dg_address">Adresse du siège social<span className="text-red-500 font-bold text-xl">*</span></label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
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
                required
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <label className="p-1" htmlFor="dg_phone">Numéro de téléphone</label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
              <HiPhone className="text-gray-600" size={24} />
              <input
                type="tel"
                name="dg_phone"
                id="dg_phone"
                placeholder="Ex: 0 21 98 53 99 ou 0 556 54 23 76"
                className="bg-gray-100 outline-none px-4 flex-1"
                onChange={(event) =>
                    setDg({ ...dg, phone: event.target.value })
                }
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <label className="p-1" htmlFor="dg_fax">Fax</label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
              <MdFax className="text-gray-600" size={24} />
              <input
                type="tel"
                name="dg_fax"
                id="dg_fax"
                placeholder="Ex: 0 21 98 53 99"
                className="bg-gray-100 outline-none px-4 flex-1"
                onChange={(event) =>
                    setDg({ ...dg, fax: event.target.value })
                }
              />
            </div>
          </div>

          <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
            <label className="p-1" htmlFor="dg_localtion_url">Localisation GPS (Lien vers Google Maps)</label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
              <HiLocationMarker className="text-gray-600" size={24} />
              <input
                type="url"
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

        <div className="mt-4 flex flex-col md:flex-row gap-2 items-center justify-center w-full lg:w-[800px]">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl w-11/12 md:w-auto justify-center sm:px-8 py-3 font-semibold bg-black text-white hover:shadow-2xl hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
          >
            Ajouter la banque
            <HiCheckCircle size={23} className="ml-2" />
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setIsResetting(!isResetting);
            }}
            className="rounded-xl w-11/12 md:w-auto justify-center sm:px-8 py-3 font-semibold bg-black text-white hover:shadow-2xl hover:bg-[#daa250] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
          >
            Effacer le formulaire
            <FaUndo size={20} className="ml-2" />
          </button>
            {isResetting && (
              <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="w-[350px] sm:w-[500px]">
                  <div className="py-4 rounded-t-md bg-[#dfa01a] text-white flex justify-center items-center">
                    <FaUndo size={20} className="mr-3" />
                    <h2>Réinitialisation du formulaire</h2>
                  </div>
                  <div className="bg-white rounded-b-md pt-4 sm:pt-8 flex flex-col justify-center items-center">
                    <h2 className="mb-8 font-semibold">Voulez-vous réinitialiser le formulaire?</h2>
                    <div className="w-full">
                        <button className="w-1/2 bg-gray-200 p-2 rounded-bl-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium" onClick={() => {
                            formRef.current.reset();
                            
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
                                bank_id: 0,
                                address: "",
                                lat: 0,
                                lng: 0,
                                wilaya: 0,
                                phone: "",
                                fax: "",
                                location_link: ""
                            });

                            setIsResetting(!isResetting);
                        }}>
                            Confirmer
                        </button>
                        <button className="w-1/2 bg-gray-200 p-2 rounded-br-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium" onClick={() => {setIsResetting(!isResetting)}}>
                            Annuler
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <Link href="/admin/home" className="rounded-xl w-11/12 md:w-auto justify-center sm:px-8 py-3 font-semibold bg-black text-white hover:shadow-2xl hover:bg-[#EA5455] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300">
            Annuler
            <MdCancel size={23} className="ml-2" />
          </Link>
          <SuccessFeedback message={"Banque ajoutée avec succès"} isSuccessful={addSuccess} isVisible={isFeedbackVisible} />
          <FailFeedback message={error} isSuccessful={addSuccess} isVisible={isFeedbackVisible} />
        </div>
      </form>
    </div>
  );
}

export default BankInfoFormADD;
