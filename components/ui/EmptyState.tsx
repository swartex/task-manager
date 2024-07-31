'use client';

import { type FC } from 'react';

interface EmptyStateProps {
  text: string;
}

const EmptyState: FC<EmptyStateProps> = ({ text }) => {
  return (
    <div className="flex min-h-52 items-center justify-center">
      <p className="text-lg font-semibold text-muted-foreground">{text}</p>
    </div>
  );
};

export default EmptyState;
