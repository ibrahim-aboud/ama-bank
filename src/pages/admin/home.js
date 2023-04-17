import AdminLayout from "@/layouts/adminLayout";
import { getSession, useSession } from "next-auth/react";

function Home() {
  const session = useSession();

  return (
    <div>
      <div>Home Admin</div>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}

Home.getLayout = function PageLayout(page) {
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

export default Home;
