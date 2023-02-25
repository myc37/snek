import { useRouter } from "next/router";
import { type FC } from "react";
import { BiCalendarExclamation, BiDollar, BiPackage } from "react-icons/bi";

const AppBar: FC = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 z-10 flex h-16 w-screen items-center justify-around bg-gradient-to-b from-primary-light to-primary px-6">
      <div
        className={`flex cursor-pointer flex-col items-center ${
          router.pathname === "/earnings" ? "text-white" : "text-gray"
        }`}
        onClick={() => void router.push("/earnings")}
      >
        <BiDollar className="text-3xl" />
        Earnings
      </div>
      <div
        className={`flex cursor-pointer flex-col items-center ${
          router.pathname === "/orders" ? "text-white" : "text-gray"
        }`}
        onClick={() => void router.push("/orders")}
      >
        <BiPackage className="text-3xl" />
        Orders
      </div>
      <div
        className={`flex cursor-pointer flex-col items-center ${
          router.pathname === "/quests" ? "text-white" : "text-gray"
        }`}
        onClick={() => void router.push("/quests")}
      >
        <BiCalendarExclamation className="text-3xl" />
        Quests
      </div>
    </div>
  );
};
export default AppBar;
