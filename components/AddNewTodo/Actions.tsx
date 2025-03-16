import { Bell, Repeat } from 'lucide-react';
import { type FC } from 'react';

import { Button } from '@/components/ui/button';
import Hint from '@/components/ui/Hint';

interface ActionsProps {
  onAddTodo: () => void;
  onTimeChange: (unixTime: number) => void;
  disabled?: boolean;
}

const Actions: FC<ActionsProps> = ({ onAddTodo, disabled = true }) => {
  const handleAddTodo = () => {
    onAddTodo();
  };

  return (
    <div className="flex h-10 items-center gap-3 bg-[#e1dfdd]/40 px-4 py-2 text-xs text-[#292827]">
      <button className="rounded p-1 transition hover:bg-zinc-300/40">
        <Hint title="Remind me">
          <Bell size={16} className="opacity-75" />
        </Hint>
      </button>
      <button className="rounded p-1 transition hover:bg-zinc-300/40">
        <Hint title="Repeat">
          <Repeat size={16} className="opacity-75" />
        </Hint>
      </button>
      <Button
        disabled={disabled}
        className="ml-auto h-7 rounded-none disabled:hover:cursor-default"
        variant="outline"
        size="sm"
        onClick={handleAddTodo}
      >
        Add
      </Button>
    </div>
  );
};

export default Actions;
