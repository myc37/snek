import { type AppType } from "next/app";
// Components
import MyHead from "~/components/MyHead";

// Utils
import { api } from "~/utils/api";

// Styles
import "@fontsource/inter";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <MyHead />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
