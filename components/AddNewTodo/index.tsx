'use client';

import { ChangeEvent, FC, useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useAction } from '@/hooks/useAction';
import { createTodo } from '@/actions/createTodo';
import { cn } from '@/libs/utils';
import Actions from './Actions';

const AddNewTodo: FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const params = useParams();

  const { execute } = useAction(createTodo, {
    onSuccess: (data) => {
      toast.success(`Todo ${data.title} created!`);
      setNewTodo('');
      setDisabled(false);
    },
  });

  if (!params.slug) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value.trim());
  };

  const handleAdd = async () => {
    if (newTodo === '') return;
    execute({
      title: newTodo,
      category_id: params.categoryId as string, // FIXME: need select category by slug
      status: false,
    });
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
      <Actions disabled={newTodo === ''} onAddTodo={handleAdd} />
    </div>
  );
};

export default AddNewTodo;
