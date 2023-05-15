import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import ConfirmPopup from "@/components/admin/confirmPopup";
import { FiGlobe, FiUpload } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import SuccessFeedback from "@/components/common/feedback_popups/success";
import FailFeedback from "@/components/common/feedback_popups/fail";
import bankInfoValidator from "@/lib/validations/bankInfoValidator";

function BankInfoForm({ bankId }) {
  const [bank, setBank] = useState(null);
  const [oldInfo, setOldInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [error, setError] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [selectedLogoFile, setSelectedLogoFile] = useState();

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState();

  const router = useRouter();
  const logoInputRef = useRef();
  const imageInputRef = useRef();

  // fetch bank data when loading the page for the first time
  useEffect(() => {
    if (!bankId) {
      setBank(null);
      return;
    }

    setLoading(true);

    setSelectedLogoFile(null);
    setSelectedLogo("");
    logoInputRef.current.value = "";

    setSelectedImageFile(null);
    setSelectedImage("");
    imageInputRef.current.value = "";

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/bank/${bankId}`)
      .then((response) => {
        setBank(response.data.bank);
        setOldInfo(response.data.bank);

        setError("");
        setLoading(false);
      })
      .catch((e) => {
        setError(e.response?.data.error.message);
        setLoading(false);
      });
  }, [bankId]);

  // while fetching the data set bank's fiels to empty string instead of null or undefined
  if (!bank) {
    setBank({
      id: "",
      name: "",
      description: "",
      visitsCount: "",
      websiteLink: "",
      updateDate: "",
    });
  }

  // get excuted when the form is submitted
  async function sumbitHandler(event) {
    event.preventDefault();
    setLoading(true);

    if (!bank || !bank.id) {
      setError("Aucune banque n'est selectionée");
      setLoading(false);
      return;
    }

    try {
      if (selectedLogoFile) {
        const fileExtension = selectedLogoFile.name.split(".").pop();
        const file = new File(
          [selectedLogoFile],
          `${bank.id}.${fileExtension}`
        );

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

      if (selectedImageFile) {
        const fileExtension = selectedImageFile.name.split(".").pop();
        const file = new File(
          [selectedImageFile],
          `${bank.id}.${fileExtension}`
        );

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

      // put request to the API to check user inputs and update the database
      await axios.put(process.env.NEXT_PUBLIC_API_URL + "/banks", {
        bank: { ...bank, updateDate: bank.updateDate.substring(0, 10) },
      });

      // when the data is updated
      setShowConfirmPopup(false);

      setError("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // router.push("/admin/home")
      }, 3000);
    } catch (e) {
      setError(e.response?.data.error.message);
    }

    setLoading(false);
  }

  return (
    <div className="mb-20 mt-5">
      <div className="py-8 lg:mx-16 flex items-center justify-center lg:gap-14">
        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

        <div className="flex items-center justify-center gap-4 text-lg sm:text-xl md:text-3xl">
          <AiOutlineInfoCircle className=" font-bold" />
          <h3 className="font-bold text-2xl">Informations générales sur la banque</h3>
        </div>

        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />
      </div>

      <form
        className="flex flex-col items-center"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="bank_name" className="block p-1">
            Nom de la banque
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full focus-within:border-green-800">
            <input
              type="text"
              name="bank_name"
              id="bank_name"
              placeholder="Ex: Natixis Algérie"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={bank && bank.name}
              onChange={(event) =>
                setBank({ ...bank, name: event.target.value })
              }
            />
          </div>
        </div>

        <div className="mx-5 mb-4 w-[90%] lg:w-[900px] flex gap-4 flex-col md:flex-row justify-between">
          <div className="">
            <label htmlFor="bank_logo" className="block p-1 ">
              Logo de la banque
            </label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
              <input
                type="file"
                name="bank_logo"
                id="bank_logo"
                accept=".jpeg,.jpg,.png"
                className="bg-gray-100 outline-none px-4 flex-1 w-full"
                ref={logoInputRef}
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedLogo(file ? URL.createObjectURL(file) : null);
                    setSelectedLogoFile(file);
                  }
                }}
              />

              {(selectedLogo || (bank && bank.logoLink)) && (
                <Image
                  src={
                    selectedLogo
                      ? selectedLogo
                      : bank
                      ? `${bank.logoLink}?${Math.random()}`
                      : ""
                  }
                  alt="Preview"
                  width={400}
                  height={400}
                  className="mr-5 rounded-md h-auto max-w-[50px]"
                  suppressHydrationWarning
                />
              )}

              <FiUpload className="pr-2 text-gray-600" size={28} />
            </div>
          </div>

          <div className="">
            <label htmlFor="bank_image" className="block p-1 ">
              Image de la banque
            </label>
            <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
              <input
                type="file"
                name="bank_image"
                id="bank_image"
                accept=".jpeg,.jpg,.png"
                className="bg-gray-100 outline-none px-4 flex-1 w-full"
                ref={imageInputRef}
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(file ? URL.createObjectURL(file) : null);
                    setSelectedImageFile(file);
                  }
                }}
              />

              {(selectedImage || (bank && bank.imageLink)) && (
                <Image
                  src={
                    selectedImage
                      ? selectedImage
                      : bank
                      ? `${bank.imageLink}?${Math.random()}`
                      : ""
                  }
                  alt="Preview"
                  width={400}
                  height={400}
                  className="mr-5 rounded-md h-auto max-w-[50px]"
                  suppressHydrationWarning
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
              value={bank && bank.description}
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
              type="text"
              name="bank_url"
              id="bank_url"
              placeholder="Ex: https://www.natixis.dz"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={bank && bank.websiteLink}
              onChange={(event) =>
                setBank({ ...bank, websiteLink: event.target.value })
              }
            />
          </div>
        </div>

        <FailFeedback message={error} isVisible={error} isSuccessful={!error} />
        <SuccessFeedback
          message={"Les information sont mise à jour avec succès"}
          isVisible={success}
          isSuccessful={success}
        />

        <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 w-full lg:w-[800px] lg:justify-between">
          <button
            disabled={loading}
            className="mb-1 rounded-xl px-8 py-3 font-semibold bg-black text-white shadow-xl hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
            onClick={(event) => {
              event.preventDefault();

              const check = bankInfoValidator({
                ...bank,
                updateDate: bank.updateDate.substring(0, 10),
              });

              if (check.error) {
                setError(check.errorList[0]);
                setTimeout(() => {
                  setError("");
                }, 3000);
              } else setShowConfirmPopup(true);
            }}
          >
            Sauvegarder les modifications
            <HiCheckCircle size={23} className="ml-2" />
          </button>

          {showConfirmPopup && (
            <ConfirmPopup
              title="Sauvegarder les modifications"
              icon={<HiCheckCircle size={20} className="mr-3" />}
              color="#40916C"
              message={"Voulez-vous confirmer les modifications ?"}
              onConfirm={(e) => sumbitHandler(e)}
              onExit={() => {
                setError("");
                setShowConfirmPopup(false);
              }}
            />
          )}

          <button
            type="reset"
            disabled={loading}
            onClick={() => {
              setBank(oldInfo);
              setError("");

              setSelectedLogoFile(null);
              setSelectedLogo("");
              logoInputRef.current.value = "";

              setSelectedImageFile(null);
              setSelectedImage("");
              imageInputRef.current.value = "";
            }}
            className="rounded-xl px-8 py-3 font-semibold bg-black text-white shadow-xl hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
          >
            Annuler les modifications
            <MdCancel size={23} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default BankInfoForm;
