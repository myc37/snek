import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import MyHead from "~/components/MyHead";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <MyHead />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
