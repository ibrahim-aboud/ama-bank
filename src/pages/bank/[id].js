import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { MdManageSearch, MdReadMore } from "react-icons/md";

function BankInfo({ bank }) {
  return (
    <div className="flex flex-col min-w-full min-h-[80%] justify-center items-center gap-12 my-8 px-4">
      <div className="flex flex-col md:flex-row w-full items-center justify-around gap-8">
        <Image
          src={bank.imageLink}
          alt="bank image"
          width={720}
          height={720}
          className="w-96 max-h-96 rounded-2xl"
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
          href={process.env.NEXT_PUBLIC_APP_URL + ``}
          className="mb-1 rounded-xl px-8 py-3 font-semibold bg-green-600 text-white shadow-xl hover:bg-black disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
        >
          Trouver une agence
          <CiLocationOn size={23} className="ml-2" />
        </Link>

        <Link
          href={process.env.NEXT_PUBLIC_APP_URL + ``}
          className="mb-1 rounded-xl px-8 py-3 font-semibold bg-green-600 text-white shadow-xl hover:bg-black disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
        >
          Consulter les conditions tarifaires
          <MdManageSearch size={23} className="ml-2" />
        </Link>

        <Link
          href={bank.websiteLink}
          target="_blank"
          className="mb-1 rounded-xl px-8 py-3 font-semibold bg-green-600 text-white shadow-xl hover:bg-black disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
        >
          Consulter le site de la banque
          <MdReadMore size={23} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/bank/${id}`
    );

    const bank = response.data.bank;

    return {
      props: { bank },
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
