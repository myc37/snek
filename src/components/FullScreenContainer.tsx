import { type PropsWithChildren, type FC } from "react";
import Container from "./Container";

type Props = {
  className?: string;
};

const FullScreenContainer: FC<PropsWithChildren<Props>> = ({
  children,
  className = "",
}) => {
  return (
    <Container className={`min-h-screen pt-4 pb-20 ${className}`}>
      {children}
    </Container>
  );
};
export default FullScreenContainer;
