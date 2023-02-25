import { type FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <img src="/ninja-loading.png" alt="ninja reading" className="max-w-xs" />
      <div className="mt-4 text-lg font-bold text-primary">Loading...</div>
    </div>
  );
};
export default Loading;
