import { type FC } from "react";

const Error: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <img src="/ninja-error.png" className="max-w-xs" />
      <div className="mt-4 text-lg font-bold text-primary">
        An error has occurred
      </div>
    </div>
  );
};
export default Error;
