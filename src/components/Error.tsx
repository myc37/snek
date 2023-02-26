import { useRouter } from "next/router";
import { type FC } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";

const Error: FC = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <img src="/ninja-error.png" className="max-w-xs" />
      <div className="mt-4 text-lg font-bold text-primary">
        An error has occurred
      </div>
      <button
        className="mt-4 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-lg text-gray-1"
        onClick={() => router.back()}
      >
        <BiLeftArrowAlt />
        Back
      </button>
    </div>
  );
};
export default Error;
