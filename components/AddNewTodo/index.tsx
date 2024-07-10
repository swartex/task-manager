'use client';

import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { type ChangeEvent, type FC, useState, type KeyboardEvent } from 'react';
import { toast } from 'sonner';

import { createTodo } from '@/actions/createTodo';
import { getCategoryBySlug } from '@/actions/getCategoryBySlug';
import { useAction } from '@/hooks/useAction';
import { cn } from '@/libs/utils';

import Actions from './Actions';

const AddNewTodo: FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<number>(0);
  const params = useParams();

  const { execute } = useAction(createTodo, {
    onSuccess: (data) => {
      toast.success(`Todo "${data.title}" created!`);
      setNewTodo('');
      setDisabled(false);
    },
  });

  if (!params.slug) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value.trim());
  };

  const handleAdd = async () => {
    if (!newTodo) return;

    const category = await getCategoryBySlug(params.slug as string);

    if (category) {
      execute({
        title: newTodo,
        category_id: category.id,
        status: false,
        deadline: new Date(deadline),
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div
      className={cn(
        'mb-4 overflow-hidden rounded bg-white shadow transition-all',
        focused && 'shadow-blue-600',
      )}
    >
      <div className="flex items-center px-4">
        <Plus size={16} className={cn('text-blue-600 transition-all', focused && 'text-black')} />
        <input
          type="text"
          className="h-10 w-full bg-transparent p-4 text-sm font-normal outline-none placeholder:text-blue-600 focus-within:outline-none focus:outline-none focus:placeholder:text-black active:outline-none disabled:text-muted"
          value={newTodo}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Add a task"
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </div>
      <Actions onTimeChange={setDeadline} disabled={!newTodo} onAddTodo={handleAdd} />
    </div>
  );
};

export default AddNewTodo;
