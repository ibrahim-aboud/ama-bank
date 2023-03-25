import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import axios from "axios";
import Bank from "@/server/models/bankModel";

function General() {
  return <div>General</div>;
}

General.getLayout = function PageLayout(page) {
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
    const response = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/banks",
      {
        bank: new Bank(1, "bank name", "desc", 10, "link", null),
      },
      {
        headers: {
          "Content-Type": "application/json",
          cookie: context.req.headers.cookie,
        },
      }
    );

    console.log(response.data);
  } catch (e) {
    console.log(e.response.data);
  }

  return {
    props: { session },
  };
}

export default General;
