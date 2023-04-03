import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import style from "@/styles/account.module.css";
import Input from "@/components/admin/account/input";
import { FiSettings } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { RiMailFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import { useState } from "react";

function Account() {
  const [username, setUsername] = useState("username");
  const [mail, setMail] = useState("example@gmail.com");
  const [password, setPassword] = useState("password");

  function submitHandler(event) {
    event.preventDefault();

    // send data to api
    // ...
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
            generatePopUp
            isPassword
          />
        </div>
      </div>

      <div className={style.submit}>
        <button className={style.Button}>Appliquer les modifications</button>
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

  return {
    props: { session },
  };
}

export default Account;
