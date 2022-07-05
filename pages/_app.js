import HeaderComponent from "../components/HeaderComponent";
import Footer from "../components/FooterComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "font-awesome/css/font-awesome.min.css";
import "../styles/nprogress.css";
import nProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
