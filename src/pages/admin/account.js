import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import style from "@/styles/account.module.css";
import Input from "@/components/admin/account/input";
import { FiSettings } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { RiMailFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/common/navbar";

function Account({ admin }) {
  const [username, setUsername] = useState(admin.username);
  const [mail, setMail] = useState(admin.email);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // the admin can view his account information and modify it
  async function submitHandler(event) {
    setLoading(true);
    event.preventDefault();

    admin.username = username;
    admin.email = mail;
    admin.password = password;

    try {
      await axios.put(process.env.NEXT_PUBLIC_API_URL + "/admin", {
        admin,
        oldPassword,
      });

      setError("");
      router.reload();
    } catch (e) {
      setError(e.response?.data || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div>
      <div className={style.icon}>
        <span>
          <FiSettings />
        </span>
        <p>Paramètres du compte</p>
      </div>

      <div className={style.form}>
        <div>
          <div className={style.barTitle}>Nom d{"'"}utilisateur</div>
          <Input info={username} setInfo={setUsername} Icon={<FaUserAlt />} />
        </div>

        <div>
          <div className={style.barTitle}>Adresse Email</div>
          <Input info={mail} setInfo={setMail} Icon={<RiMailFill />} />
        </div>

        <div>
          <div className={style.barTitle}>Mot de passe</div>
          <Input
            info={password}
            setInfo={setPassword}
            Icon={<FaLock />}
            generatePopUp={!loading}
            isPassword
            setOldPassword={setOldPassword}
          />
        </div>

        {error && <div className="text-[#850000] text-xl">{error}</div>}
      </div>

      <div className={style.submit}>
        <button
          disabled={loading}
          onClick={submitHandler}
          className={style.Button}
        >
          Appliquer les modifications
        </button>
      </div>
    </div>
  );
}

Account.getLayout = function PageLayout(page) {
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

  var admin = {};

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/admin/" + session.user.id,
      {
        headers: {
          cookie: context.req.headers.cookie,
        },
      }
    );

    admin = response.data.admin;

  } catch (e) {
    console.log(e.response.data || e.message);
  }

  return {
    props: { admin },
  };
}

export default Account;
