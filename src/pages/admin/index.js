import Head from "next/head";
import React, { useState, useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";

function Admin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function sumbitHandler(e) {
    setLoading(true);
    e.preventDefault();

    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    const status = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: process.env.NEXT_PUBLIC_APP_URL + "/admin/dashboard",
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
      <main>
        <form onSubmit={sumbitHandler}>
          <div className="flex gap-4 items-center">
            <label>username</label>
            <input
              className="outline-none p-2"
              ref={usernameInputRef}
              placeholder="username"
            ></input>
          </div>

          <div className="flex gap-4 items-center">
            <label>password</label>
            <input
              className="outline-none p-2"
              ref={passwordInputRef}
              placeholder="password"
            ></input>
          </div>

          <button
            className="text-center px-4 py-2 rounded-lg bg-green-300 hover:underline disabled:bg-gray-500"
            type="submit"
            disabled={loading}
          >
            Login
          </button>

          {error && <p className="text-rose-600 font-semibold">{error}</p>}
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
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Admin;
