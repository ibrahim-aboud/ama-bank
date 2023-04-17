import { SessionProvider } from "next-auth/react";
import Layout from "@/layouts/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return (
      <SessionProvider session={pageProps.session}>
        {Component.getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
