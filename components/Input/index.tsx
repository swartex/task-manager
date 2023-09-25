'use client';
import useInput from '@/hooks/useInput';
import { cn } from '@/libs/utils';
import { FC } from 'react';

interface InputProps {
  type?: 'text' | 'number';
  className?: string;
}

const Input: FC<InputProps> = ({ type = 'text', className }) => {
  const input = useInput();

  return (
    <input
      className={cn(
        `
        border-input
        bg-background
        ring-offset-background
        placeholder:text-muted-foreground
        focus-visible:ring-ring
        flex
        h-10
        w-full
        rounded-md
        border
        px-3
        py-2
        text-sm
        transition
        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium
        focus-visible:border-0
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50`,
        className,
      )}
      type={type}
      {...input}
    />
  );
};

export default Input;
