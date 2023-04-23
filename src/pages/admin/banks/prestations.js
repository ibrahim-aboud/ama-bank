import AdminLayout from "@/layouts/adminLayout";
import { getSession } from "next-auth/react";

function Prestations() {
  return(
    <div>
      what's up
    </div>
  );
}

Prestations.getLayout = function PageLayout(page) {
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

export default Prestations;
