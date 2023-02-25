import Head from "next/head";
import { type FC } from "react";

const MyHead: FC = () => {
  return (
    <Head>
      <title>Ninjavan Last Mile Driver App</title>
      <meta
        name="description"
        content="Ninjavan Last Mile Driver App | Increasing driver satisfaction one delivery at a time"
      />
      <link rel="icon" href="/favicon.ico?1" />

      <meta name="application-name" content="Ninjavan Last Mile Driver App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta
        name="apple-mobile-web-app-title"
        content="Ninjavan Last Mile Driver App"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/touch-icon-ipad.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/touch-icon-ipad-retina.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="icons/maskable_icon.png" color="#C2002F" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://snek-eight.vercel.app/" />
      <meta name="twitter:title" content="Ninjavan Last Mile Driver App" />
      <meta
        name="twitter:description"
        content="Ninjavan Last Mile Driver App | Increasing driver satisfaction one delivery at a time"
      />
      <meta name="twitter:image" content="icons/192.png" />
      <meta name="twitter:creator" content="@Ninjavan" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Ninjavan Last Mile Driver App" />
      <meta
        property="og:description"
        content="Ninjavan Last Mile Driver App | Increasing driver satisfaction one delivery at a time"
      />
      <meta property="og:site_name" content="Ninjavan Last Mile Driver App" />
      <meta property="og:url" content="https://snek-eight.vercel.app/" />
      <meta property="og:image" content="icons/192.png" />
    </Head>
  );
};
export default MyHead;
