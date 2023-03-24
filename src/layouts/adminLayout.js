import Head from "next/head";

import AdminNavbar from "@/components/common/adminNavbar";

function AdminLayout({ children }) {
  return (
    <>
      <Head>
        <title>amaBank</title>
        <meta name="description" content="Banks Comparison" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AdminNavbar />
        {children}
      </main>
    </>
  );
}

export default AdminLayout;
