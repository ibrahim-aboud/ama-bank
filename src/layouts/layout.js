import Head from "next/head";

import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>amaBank</title>
        <meta name="description" content="Banks Comparison" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
