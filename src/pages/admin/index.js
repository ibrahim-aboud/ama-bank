import Head from "next/head";
import React, { useState, useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLock, BiLogIn } from "react-icons/bi";

function Admin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function sumbitHandler(e) {
    e.preventDefault();
    setLoading(true);

    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    const status = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: process.env.NEXT_PUBLIC_APP_URL + "/admin/home",
    });

    if (status.ok) router.push(status.url);
    if (status.error) setError(status.error);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main
        style={{ backgroundImage: `url(/assets/images/bg_login_admin.jpg)` }}
        className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen bg-gray-100"
      >
        <form
          className=" sm:bg-white sm:rounded-2xl sm:shadow-2xl w-[350px] sm:w-[700px] sm:max-w-5xl sm:min-w-max sm:py-14 sm:px-16 relative"
          onSubmit={sumbitHandler}
        >
          <div className="absolute -top-20 left-[40%] sm:-top-10 sm:left-[45%] shadow-2xl">
            <Image
              src="/assets/logos/logo.png"
              alt="amaBank logo"
              width={400}
              height={400}
              className="w-[70px] h-[71px]"
            />
          </div>

          <div className="px-20 container flex justify-center">
            <h2 className="sm:text-2xl font-semibold mb-2 ">
              Connexion administrateur
            </h2>
          </div>

          <div className="mt-10">
            <div className="flex justify-start px-6 font-medium py-1">
              <h2>Nom d{"'"}utilisateur</h2>
            </div>
            <div className="flex flex-col items-center mb-3">
              <div className="bg-gray-100 w-11/12 p-4 rounded-sm border flex items-center focus-within:border-green-900">
                <FaRegUserCircle size={22} />
                <input
                  type="text"
                  name="username"
                  ref={usernameInputRef}
                  placeholder="Admin"
                  className="bg-gray-100 outline-none px-4 flex-1"
                />
              </div>
            </div>
            <div className="flex justify-start px-6 font-medium py-1">
              <h2>Mot de passe</h2>
            </div>
            <div className="flex flex-col items-center mb-3">
              <div className="bg-gray-100 w-11/12 p-4 rounded-sm border flex items-center focus-within:border-green-900">
                <BiLock size={25} />
                <input
                  type="password"
                  name="password"
                  ref={passwordInputRef}
                  placeholder="Mot de passe"
                  className="bg-gray-100 outline-none px-3 flex-1"
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-9">
              <button
                className="rounded-xl px-8 py-3 font-semibold bg-black text-white shadow-xl hover:bg-[#40916C] disabled:bg-slate-900 flex items-center hover:ease-in-out duration-300"
                type="submit"
                disabled={loading}
              >
                <BiLogIn className="mr-3" size={20} />
                Se connecter
              </button>
            </div>
          </div>

          {error && <p className="text-rose-600 font-semibold mt-6">{error}</p>}
        </form>
      </main>
    </>
  );
}

Admin.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: process.env.NEXT_PUBLIC_APP_URL + "/admin/home",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Admin;
