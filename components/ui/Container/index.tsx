import { type FC, type ReactNode } from 'react';

import { cn } from '@/libs/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={cn('mx-auto max-w-screen-xl', className)}>{children}</div>;
};

export default Container;
