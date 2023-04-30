import AdminLayout from "@/layouts/adminLayout";
import { getSession, useSession } from "next-auth/react";
import BankInfoFormADD from "@/components/admin/banks/general/bankInfoForm+";

function NewBank() {
  

  const session = useSession();

  return (
    <div className="mt-5 mb-24">
      <BankInfoFormADD />
    </div>
  );
}

NewBank.getLayout = function PageLayout(page) {
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

export default NewBank;
