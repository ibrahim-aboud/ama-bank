import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { MdModeEditOutline, MdCancel } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi";
import Image from "next/image";

function BankInfoForm({ bankId, logos }) {
  const [bank, setBank] = useState(null);
  const [oldInfo, setOldInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const router = useRouter();

  // fetch bank data when loading the page for the first time
  useEffect(() => {
    if (!bankId) {
      setBank(null);
      return;
    }

    setLoading(true);

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/bank/${bankId}`)
      .then((response) => {
        setBank(response.data.bank);
        setOldInfo(response.data.bank);

        setError("");
        setLoading(false);
      })
      .catch((e) => {
        setError(e.response.data);
        setLoading(false);
      });
  }, [bankId]);

  // while fetching the data set bank's fiels to empty string instead of null or undefined
  !bank &&
    setBank({
      id: "",
      name: "",
      description: "",
      visitsCount: "",
      websiteLink: "",
      updateDate: "",
    });

  // get excuted when the form is submitted
  async function sumbitHandler(event) {
    event.preventDefault();
    setLoading(true);

    try {
      // put request to the API to check user inputs and update the database
      const response2 = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + "/banks",
        {
          bank: { ...bank, updateDate: bank.updateDate.substring(0, 10) },
        }
      );

      // TODO: update the logo photo
      if (!selectedFile) {
        setError("");
        router.reload();
        return;
      }

      const fileExtension = selectedFile.name.split(".").pop();
      const file = new File([selectedFile], `${bank.id}.${fileExtension}`, {
        type: `image/${fileExtension}`,
      });

      const formData = new FormData();
      formData.append("file", file);

      const response1 = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/bank/logo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // when the data is updated
      setError("");
      router.reload();
    } catch (e) {
      setError(e.response ? e.response.data : e.message);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={sumbitHandler}
      className="flex flex-col items-center justify-center gap-6"
    >
      <div className="flex flex-col w-[80%]">
        <label htmlFor="name">Nom de la banque</label>
        <input
          className="border border-gray-400 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40916C] focus:border-transparent font-extralight"
          type="text"
          id="name"
          value={bank && bank.name}
          onChange={(event) => setBank({ ...bank, name: event.target.value })}
        />
      </div>

      <div className="flex flex-col w-[80%]">
        <label htmlFor="logo">Logo de la banque</label>
        <div className="border border-gray-400 py-2 px-4 rounded-lg font-extralight flex items-center gap-12">
          <Image
            src={
              selectedImage
                ? selectedImage
                : `/assets/logos/banks_logos/${
                    logos.find((item) => {
                      return (
                        parseInt(item.split(".")[0]) ===
                        parseInt(bank && bank.id)
                      );
                    }) || ""
                  }`
            }
            alt="logo"
            width={430}
            height={430}
            className="h-14 w-28 rounded-lg"
          />

          <input
            type="file"
            id="logo"
            className={`w-[50%] ${
              selectedFile && "text-[#40916C] font-semibold"
            }`}
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(file ? URL.createObjectURL(file) : null);
                setSelectedFile(file);
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-col w-[80%]">
        <label htmlFor="description">Description</label>
        <textarea
          className="border border-gray-400 py-2 px-4 h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40916C] focus:border-transparent font-extralight"
          type="text"
          id="description"
          value={bank && bank.description}
          onChange={(event) =>
            setBank({ ...bank, description: event.target.value })
          }
        />
      </div>

      <div className="flex flex-col w-[80%]">
        <label htmlFor="link">Lien du site web</label>
        <input
          className="border border-gray-400 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40916C] focus:border-transparent font-extralight"
          type="text"
          id="link"
          value={bank && bank.websiteLink}
          onChange={(event) =>
            setBank({ ...bank, websiteLink: event.target.value })
          }
        />
      </div>

      {error ? (
        <div className="text-rose-500 font-bold text-center overflow-hidden">
          {error}
        </div>
      ) : (
        <></>
      )}

      <div className="flex items-center justify-center gap-16">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-4 py-2.5 pl-4 pr-6 rounded-lg bg-[#40916C] text-white hover:bg-[#419f75] disabled:bg-slate-900"
        >
          Sauvegarder les modifications
          <HiCheckCircle />
        </button>
        <button
          type="reset"
          disabled={loading}
          onClick={() => {
            setBank(oldInfo);
            setError("");
          }}
          className="flex items-center justify-center gap-4 py-2.5 pl-4 pr-6 rounded-lg bg-[#40916C] text-white hover:bg-[#419f75] disabled:bg-slate-900"
        >
          Annuler les modifications
          <MdCancel />
        </button>
      </div>
    </form>
  );
}

export default BankInfoForm;
