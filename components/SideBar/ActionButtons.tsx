'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';

const ActionButtons = () => {
  const { onOpen } = useModal();

  return (
    <div className="mt-auto flex flex-col gap-3">
      <Button variant="secondary" className="w-full" size="sm" onClick={() => onOpen('createTodo')}>
        Create new todo
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        size="sm"
        onClick={() => onOpen('createCategory')}
      >
        Create new category
      </Button>
    </div>
  );
};

export default ActionButtons;
