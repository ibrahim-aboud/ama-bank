import Head from "next/head";
import style from "@/styles/layout.module.css";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Scrollbar from "@/components/common/scrollbar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>amaBank</title>
        <meta name="description" content="Banks Comparison" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen">
        <Scrollbar>
          <div className={style.container}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </Scrollbar>
      </div>
    </>
  );
}

export default Layout;
