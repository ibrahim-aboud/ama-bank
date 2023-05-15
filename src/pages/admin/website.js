import React, { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import AdminLayout from "@/layouts/adminLayout";
import ConfirmPopup from "@/components/admin/confirmPopup";
import { getSession } from "next-auth/react";
import { FiUpload, FiPhoneCall } from "react-icons/fi";
import { MdCancel, MdEdit, MdFax, MdEmail } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import { BsInstagram } from "react-icons/bs";
import {
  AiOutlineInfoCircle,
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import SuccessFeedback from "@/components/common/feedback_popups/success";
import FailFeedback from "@/components/common/feedback_popups/fail";
import websiteInfoValidator from "@/lib/validations/websiteInfoValidator";

function Website({ infos }) {
  const [websiteInfos, setWebsiteInfos] = useState(infos);
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState("");
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);

  const logoInputRef = useRef();

  async function sumbitHandler(event) {
    event.preventDefault();
    setLoading(true);

    if (!websiteInfos || !websiteInfos.id) {
      setError("Aucune information sur le site n'est disponible !");
      setLoading(false);
      return;
    }

    try {
      if (selectedLogoFile) {
        const formData = new FormData();
        formData.append("file", selectedLogoFile);

        await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/website/logo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // put request to the API to check user inputs and update the database
      await axios.put(process.env.NEXT_PUBLIC_API_URL + "/website", {
        info: websiteInfos,
      });

      // when the data is updated
      setShowConfirmPopup(false);

      setError("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (e) {
      setError(e.response?.data.error?.message);
    }

    setLoading(false);
  }

  return (
    <main className="mb-20 mt-5">
      <div className="py-8 lg:mx-16 flex items-center justify-center lg:gap-14">
        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />

        <div className="flex items-center justify-center gap-4 text-lg sm:text-xl md:text-3xl">
          <AiOutlineInfoCircle className=" font-bold" />
          <h3 className="font-bold text-2xl">Informations générales sur le site</h3>
        </div>

        <div className="hidden lg:block h-[2px] bg-black w-[25%]" />
      </div>

      <form
        className="flex flex-col items-center"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {/* logo */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="logo" className="block p-1 ">
            Logo
          </label>
          <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
            <input
              type="file"
              name="logo"
              id="logo"
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

            {(selectedLogo || (websiteInfos && websiteInfos.logo)) && (
              <Image
                src={
                  selectedLogo
                    ? selectedLogo
                    : websiteInfos
                    ? `${websiteInfos.logo}?${Math.random()}`
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
        {/* description */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="description" className="block p-1">
            Description du site
          </label>
          <div className="bg-gray-100 w-full p-4 rounded-md border flex items-center focus-within:border-green-800">
            <textarea
              id="description"
              name="description"
              className="bg-gray-100 w-full h-[200px] outline-none"
              placeholder="Entrer une description..."
              value={websiteInfos && websiteInfos.description}
              onChange={(event) =>
                setWebsiteInfos({
                  ...websiteInfos,
                  description: event.target.value,
                })
              }
            />
          </div>
        </div>
        {/* phone */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="phone" className="block p-1">
            Numéro de téléphone
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full focus-within:border-green-800">
            <FiPhoneCall className="pr-2 text-gray-600" size={28} />

            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+213 21 98 53 99"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={websiteInfos && websiteInfos.phone}
              onChange={(event) =>
                setWebsiteInfos({ ...websiteInfos, phone: event.target.value })
              }
            />

            <MdEdit className="pr-2 text-gray-600" size={28} />
          </div>
        </div>
        {/* fax */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="fax" className="block p-1">
            Fax
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full focus-within:border-green-800">
            <MdFax className="pr-2 text-gray-600" size={28} />

            <input
              type="tel"
              name="fax"
              id="fax"
              placeholder="+213 21 98 53 99"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={websiteInfos && websiteInfos.fax}
              onChange={(event) =>
                setWebsiteInfos({ ...websiteInfos, fax: event.target.value })
              }
            />

            <MdEdit className="pr-2 text-gray-600" size={28} />
          </div>
        </div>
        {/* email */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="email" className="block p-1">
            Adresse mail
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full focus-within:border-green-800">
            <MdEmail className="pr-2 text-gray-600" size={28} />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Support@amaBank.com"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={websiteInfos && websiteInfos.email}
              onChange={(event) =>
                setWebsiteInfos({ ...websiteInfos, email: event.target.value })
              }
            />

            <MdEdit className="pr-2 text-gray-600" size={28} />
          </div>
        </div>
        {/* facebook */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="facebook" className="block p-1">
            Lien Facebook
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full focus-within:border-green-800">
            <AiFillFacebook className="pr-2 text-gray-600" size={28} />

            <input
              type="url"
              name="facebook"
              id="facebook"
              placeholder="www.facebook.com/amaBankOfficial"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={websiteInfos && websiteInfos.facebook_link}
              onChange={(event) =>
                setWebsiteInfos({
                  ...websiteInfos,
                  facebook_link: event.target.value,
                })
              }
            />

            <MdEdit className="pr-2 text-gray-600" size={28} />
          </div>
        </div>
        {/* linkedin */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="linkedin" className="block p-1">
            Lien LinkedIn
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full focus-within:border-green-800">
            <AiFillLinkedin className="pr-2 text-gray-600" size={28} />

            <input
              type="url"
              name="linkedin"
              id="linkedin"
              placeholder="www.linkedin.com/amaBankOfficial"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={websiteInfos && websiteInfos.linkedin_link}
              onChange={(event) =>
                setWebsiteInfos({
                  ...websiteInfos,
                  linkedin_link: event.target.value,
                })
              }
            />

            <MdEdit className="pr-2 text-gray-600" size={28} />
          </div>
        </div>
        {/* twitter */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="twitter" className="block p-1">
            Lien Twitter
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full focus-within:border-green-800">
            <AiFillTwitterSquare className="pr-2 text-gray-600" size={28} />

            <input
              type="url"
              name="twitter"
              id="twitter"
              placeholder="www.twitter.com/amaBankOfficial"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={websiteInfos && websiteInfos.twitter_link}
              onChange={(event) =>
                setWebsiteInfos({
                  ...websiteInfos,
                  twitter_link: event.target.value,
                })
              }
            />

            <MdEdit className="pr-2 text-gray-600" size={28} />
          </div>
        </div>
        {/* instagram */}
        <div className="mx-5 mb-4 w-[90%] lg:w-[900px]">
          <label htmlFor="instagram" className="block p-1">
            Lien Instagram
          </label>
          <div className="bg-gray-100 p-4 rounded-md border flex items-center w-full focus-within:border-green-800">
            <BsInstagram className="pr-2 text-gray-600" size={28} />

            <input
              type="url"
              name="instagram"
              id="instagram"
              placeholder="www.instagram.com/amaBankOfficial"
              className="bg-gray-100 outline-none px-4 flex-1"
              value={websiteInfos && websiteInfos.instagram_link}
              onChange={(event) =>
                setWebsiteInfos({
                  ...websiteInfos,
                  instagram_link: event.target.value,
                })
              }
            />

            <MdEdit className="pr-2 text-gray-600" size={28} />
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
              const check = websiteInfoValidator(websiteInfos);
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
              setWebsiteInfos(infos);
              setError("");
              setSelectedLogoFile(null);
              setSelectedLogo("");
              logoInputRef.current.value = "";
            }}
            className="rounded-xl px-8 py-3 font-semibold bg-black text-white shadow-xl hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
          >
            Annuler les modifications
            <MdCancel size={23} className="ml-2" />
          </button>
        </div>
      </form>
    </main>
  );
}

Website.getLayout = function PageLayout(page) {
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

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/website"
    );

    var infos = response.data.infos[0];
  } catch (e) {
    console.error(e.response.data.error.message);
  }

  return {
    props: { infos },
  };
}

export default Website;
