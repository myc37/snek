import Head from "next/head";
import { type FC } from "react";

const MyHead: FC = () => {
  return (
    <Head>
      <title>Ninjavan Driver App</title>
      <meta name="description" content="Ninjavan Driver App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default MyHead;
