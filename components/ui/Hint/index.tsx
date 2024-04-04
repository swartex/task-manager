'use client';

import { FC, ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HintProps {
  title: string;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

const delay = 50;

const Hint: FC<HintProps> = ({ children, title, align, side = 'bottom' }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <span className="block text-xs">{title}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
