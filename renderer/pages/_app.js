import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

import { SessionProvider, signIn, useSession } from "next-auth/react";

import "assets/css/nextjs-material-dashboard.css?v=1.1.0";
import { Toaster } from "react-hot-toast";
import { useUser } from "../hooks/useUser";

Router.events.on("routeChangeStart", (url) => {
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const {
      Component,
      pageProps: { session, ...pageProps },
    } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <Layout>
        <SessionProvider session={session}>
          {Component.auth ? (
            <Auth {...pageProps}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
        <Toaster />
      </Layout>
    );
  }
}

function Auth({ children }) {
  const { session, loading } = useUser();

  useEffect(() => {
    if (!session?.email && !loading) {
      signIn();
    }
  }, [session, loading]);

  return children;
}
