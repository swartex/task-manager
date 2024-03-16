'use client';

import { Plus } from 'lucide-react';
import { ChangeEvent, FC, useState, KeyboardEvent } from 'react';
import { cn } from '@/libs/utils';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const AddNewTodo: FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();

  if (!params?.categoryId) return null;

  const handleAddTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value.trim());
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setDisabled(true);
      await axios.post('/api/v1/todo', {
        title: newTodo,
        categoryId: params?.categoryId,
      });

      setNewTodo('');
      setDisabled(false);
      router.refresh();
    }
  };

  return (
    <div
      className={cn(
        'flex items-center rounded bg-white px-4 shadow transition-all',
        focused && 'shadow-blue-600',
      )}
    >
      <Plus className={cn('h-4 w-4 text-blue-600 transition-all', focused && 'text-black')} />
      <input
        type="text"
        className="h-[40px] w-full bg-transparent px-4 py-3 text-sm font-normal outline-none placeholder:text-blue-600 focus-within:outline-none focus:outline-none focus:placeholder:text-black active:outline-none disabled:text-muted"
        value={newTodo}
        onChange={handleAddTodo}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Add a task"
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    </div>
  );
};

export default AddNewTodo;
