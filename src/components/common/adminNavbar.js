import { signOut } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function AdminNavbar() {
  const [isGstBanksHidden, setIsGstBanksHidden] = useState(true);
  const [show, setShow] = useState(false);

  return (
    <nav className=" md:flex justify-between items-center w-screen bg-[#111111] text-[#ffffff] py-4 px-12 md:px-4 lg:px-12">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <Image
            src="/assets/logos/logo.png"
            alt="logo"
            width={430}
            height={430}
            className="w-12"
          />

          <h2 className="pt-1 text-xl font-comfortaa">amaBank</h2>
        </div>

        <button
          className="block md:hidden relative"
          onClick={() => setShow(!show)}
        >
          {show ? <IoMdClose /> : <FaBars />}
        </button>
      </div>

      {/* for large screen */}
      <div className="hidden md:flex justify-center items-center gap-3 lg:gap-8">
        <Link href="/admin/home">Accueil</Link>
        <Link href="/admin/website">Gestion du site</Link>
        <div
          className="flex justify-center items-center gap-2 relative cursor-pointer"
          onClick={() => setIsGstBanksHidden(!isGstBanksHidden)}
        >
          <span>Gestion des banques</span>
          {isGstBanksHidden ? (
            <FaAngleDown />
          ) : (
            <FaAngleDown className="rotate-180" />
          )}
          <div
            className={`${
              isGstBanksHidden ? "collapse" : "visible"
            } absolute bg-[#111111] text-white flex flex-col justify-center items-center top-10 p-4 rounded-xl`}
          >
            <Link
              href="/admin/banks/general"
              className="w-48 text-center py-1 hover:underline"
            >
              Informations Générales
            </Link>
            <Link
              href="/admin/banks/agencies"
              className="w-48 text-center py-1 hover:underline"
            >
              Agencies
            </Link>
            <Link
              href="/admin/banks/prestations"
              className="w-48 text-center py-1 hover:underline"
            >
              Conditions Tarifaires
            </Link>
          </div>
        </div>
        <Link href="/admin/account">Paramètres du compte</Link>
        <BiLogOut
          className="rotate-180 text-2xl ml-2 cursor-pointer"
          onClick={() => signOut()}
        />
      </div>

      {/* for small screen */}
      {show && (
        <div className="flex flex-col items-center justify-center gap-2 md:hidden w-full mt-4">
          <Link href="/admin/home">Accueil</Link>
          <Link href="/admin/website">Gestion du site</Link>

          <div
            className="flex justify-center items-center gap-2 relative cursor-pointer"
            onClick={() => setIsGstBanksHidden(!isGstBanksHidden)}
          >
            <span>Gestion des banques</span>
            {isGstBanksHidden ? (
              <FaAngleDown />
            ) : (
              <FaAngleDown className="rotate-180" />
            )}
          </div>

          {!isGstBanksHidden && (
            <Link href="/admin/banks/general" className="w-48 text-center">
              Informations Générales
            </Link>
          )}

          {!isGstBanksHidden && (
            <Link href="/admin/banks/agencies" className="w-48 text-center">
              Agencies
            </Link>
          )}

          {!isGstBanksHidden && (
            <Link href="/admin/banks/prestations" className="w-48 text-center">
              Conditions Tarifaires
            </Link>
          )}

          <Link href="/admin/account">Paramètres du compte</Link>
          <BiLogOut
            className="rotate-180 text-2xl ml-2 cursor-pointer"
            onClick={() => signOut()}
          />
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;
