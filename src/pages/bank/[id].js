import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { MdManageSearch, MdReadMore } from "react-icons/md";
import Filters from "@/components/common/Filters";
import List from "@/components/prestations/List";
import { useState } from "react";

function BankInfo({ bank, types_comptes, types_prestations, prestations }) {
  const [FilteredConditions, setFilteredConditions] = useState(prestations);

  return (
    <div className="flex flex-col min-w-full justify-center items-center gap-12 my-8 md:my-32 px-4">
      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-12">
        <Image
          src={bank.imageLink}
          alt="bank image"
          width={720}
          height={720}
          className="w-[30rem] max-h-[30rem] rounded-2xl"
        />

        <div className="flex flex-col items-start gap-4 md:w-[55%]">
          <div className="flex justify-center md:justify-start items-center w-full gap-4">
            <Image
              src={bank.logoLink}
              alt="bank logo"
              width={400}
              height={400}
              className="w-20 max-h-20 rounded-md"
            />

            <h1 className="text:lg md:text-2xl font-semibold">{bank.name}</h1>
          </div>

          <p className="text-lg">{bank.description}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:w-full items-center justify-center gap-2 md:gap-8">
        <Link
          href={process.env.NEXT_PUBLIC_APP_URL + `/agences?id=${bank.id}`}
          className="mb-1 rounded-xl px-8 py-3 font-semibold bg-[#40916C] text-white shadow-xl hover:bg-[#419f75] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
        >
          Trouver une agence
          <CiLocationOn size={23} className="ml-2" />
        </Link>

        <Link
          href={bank.websiteLink}
          target="_blank"
          className="mb-1 rounded-xl px-8 py-3 font-semibold bg-[#40916C] text-white shadow-xl hover:bg-[#419f75] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
        >
          Consulter le site de la banque
          <MdReadMore size={23} className="ml-2" />
        </Link>

        <Link
          href={process.env.NEXT_PUBLIC_APP_URL + `/comparer?first=${bank.id}`}
          className="mb-1 rounded-xl px-8 py-3 font-semibold bg-[#40916C] text-white shadow-xl hover:bg-[#419f75] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
        >
          Comparer cette banque
        </Link>
      </div>
      <div className="">
        <div className="w-screen mb-10 md:mb-24 px-[10%]">
          <Filters
            types_comptes={types_comptes}
            types_prestations={types_prestations}
            prestations={prestations}
            setPrestations={setFilteredConditions}
          ></Filters>
        </div>
        <div>
          <List conditions={FilteredConditions} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  var bank = null;
  var types_comptes = [];
  var types_prestations = [];
  var prestations = [];

  try {
    var response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/bank/${id}`
    );

    bank = response.data.bank;

    response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/prestations/types`
    );
    types_comptes = response.data.types;

    response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/prestations/categories`
    );
    types_prestations = response.data.categories;

    response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/prestations/${id}`
    );

    prestations = response.data.prestations;

    return {
      props: { bank, types_comptes, types_prestations, prestations },
    };
  } catch (e) {
    console.log(e.response.data || e.message);

    return {
      redirect: {
        destination: process.env.NEXT_PUBLIC_APP_URL,
        permanent: false,
      },
    };
  }
}

export default BankInfo;
