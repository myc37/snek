import { useEffect, useState, type FC } from "react";

const Loading: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((count) => (count === 3 ? 0 : count + 1));
    }, 500);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <img src="/ninja-loading.png" alt="ninja reading" className="max-w-xs" />
      <div className="mt-4 text-lg font-bold text-primary">{`Loading${".".repeat(
        count
      )}`}</div>
    </div>
  );
};
export default Loading;
