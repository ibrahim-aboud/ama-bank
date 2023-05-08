import { signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function AdminNavbar() {
  const [isGstBanksHidden, setIsGstBanksHidden] = useState(true);
  const [show, setShow] = useState(false);
  const [logoLink, setLogoLink] = useState("");

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/website")
      .then((response) => {
        if (response.data.infos.length > 0) {
          const { logo } = response.data.infos[0];
          if (logo) {
            setLogoLink(logo);
          }
        }
      })
      .catch((error) => {
        console.error(error.response?.data.error?.message);
      });
  }, []);

  return (
    <nav className="md:flex justify-between items-center w-screen bg-[#111111] text-[#ffffff] py-4 px-12 md:px-4 lg:px-12">
      <div className="flex justify-between items-center">
        <Link href={`/admin/home`}>
          <div className="flex justify-center items-center gap-4">
            {logoLink && (
              <Image
                src={logoLink + "?" + Math.random()}
                alt="logo"
                width={430}
                height={430}
                className="w-12"
                priority
                suppressHydrationWarning
              />
            )}

            <h2 className="pt-1 text-xl font-comfortaa font-semibold">amaBank</h2>
          </div>
        </Link>

      <button
          className="block md:hidden relative"
          onClick={() => setShow(!show)}
          title="show-hide navbar"
      >
          {show ? (
            <IoMdClose className="text-2xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
    </div>

      {/* for large screen */}
      <div className="hidden md:flex justify-center items-center lg:gap-5">
        <Link
          href="/admin/home"
          className="hover:bg-[#222222] px-2 py-2 rounded-xl"
        >
          Accueil
        </Link>
        <Link
          href="/admin/website"
          className="hover:bg-[#222222] px-2 py-2 rounded-xl"
        >
          Gestion du site
        </Link>
        <div
          className="flex justify-center items-center gap-2 relative cursor-pointer hover:bg-[#222222] px-2 py-2 rounded-xl"
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
              isGstBanksHidden ? "hidden" : "flex"
            } absolute z-40 bg-[#111111] text-white flex-col justify-center items-center top-10 p-4 rounded-xl animate-fade-in`}
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
              Agences
            </Link>
            <Link
              href="/admin/banks/prestations"
              className="w-48 text-center py-1 hover:underline"
            >
              Conditions Tarifaires
            </Link>
          </div>
        </div>
        <Link
          href="/admin/account"
          className="hover:bg-[#222222] px-2 py-2 rounded-xl"
        >
          Paramètres du compte
        </Link>
        <BiLogOut
          className="rotate-180 text-2xl ml-2 cursor-pointer hover:text-rose-500"
          onClick={() => signOut()}
        />
      </div>

      {/* for small screen */}
      <div
        className={`${
          show ? "flex" : "hidden"
        } flex-col items-center justify-center gap-2 md:hidden w-full mt-4 animate-fade-in`}
      >
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
          <Link
            href="/admin/banks/general"
            className="w-48 text-center animate-fade-in"
          >
            Informations Générales
          </Link>
        )}

        {!isGstBanksHidden && (
          <Link
            href="/admin/banks/agencies"
            className="w-48 text-center animate-fade-in"
          >
            Agences
          </Link>
        )}

        {!isGstBanksHidden && (
          <Link
            href="/admin/banks/prestations"
            className="w-48 text-center animate-fade-in"
          >
            Conditions Tarifaires
          </Link>
        )}

        <Link href="/admin/account">Paramètres du compte</Link>
        <BiLogOut
          className="rotate-180 text-2xl ml-2 cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </nav>
  );
}

export default AdminNavbar;
