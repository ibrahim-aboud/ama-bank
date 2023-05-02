import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";
import Comp from "src/components/admin/editBankDataPage/editBankData.js"

function Agencies() {
  return (
    <>
    <Comp></Comp>
    </>
    
  );
}

Agencies.getLayout = function PageLayout(page) {
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

export default Agencies;
