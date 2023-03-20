import { getSession, useSession, signOut } from "next-auth/react";

function Dashboard() {
  const session = useSession();

  return (
    <div>
      <div>Dashboard</div>
      <div>{JSON.stringify(session)}</div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

Dashboard.getLayout = function PageLayout(page) {
  return <>{page}</>;
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

export default Dashboard;
