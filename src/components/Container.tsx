import { type PropsWithChildren, type FC } from "react";

type Props = {
  className?: string;
};

const Container: FC<PropsWithChildren<Props>> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex justify-center px-6 ${className}`}>
      <div className="w-full max-w-7xl bg-primary">{children}</div>
    </div>
  );
};
export default Container;
