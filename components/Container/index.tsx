import { Children, FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-screen-2xl px-5">{children}</div>;
};

export default Container;
