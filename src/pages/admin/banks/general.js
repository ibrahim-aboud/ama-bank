import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";

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

  return {
    props: { session },
  };
}

export default General;
