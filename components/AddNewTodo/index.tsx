'use client';

import { Plus } from 'lucide-react';
import { ChangeEvent, FC, useState, KeyboardEvent } from 'react';
import { cn } from '@/libs/utils';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Actions from './Actions';

const AddNewTodo: FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();

  if (!params?.categoryId) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value.trim());
  };

  const handleAdd = async () => {
    if (newTodo === '') return;

    setDisabled(true);
    await axios.post('/api/v1/todo', {
      title: newTodo,
      categoryId: params?.categoryId,
    });

    setNewTodo('');
    setDisabled(false);
    router.refresh();
  }


  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };


  return (
    <div
      className={cn(
        'rounded bg-white shadow transition-all overflow-hidden mb-4',
        focused && 'shadow-blue-600',
      )}
    >
      <div className='flex items-center px-4'>
        <Plus className={cn('h-4 w-4 text-blue-600 transition-all', focused && 'text-black')} />
        <input
          type="text"
          className="h-10 w-full bg-transparent px-4 py-3 text-sm font-normal outline-none placeholder:text-blue-600 focus-within:outline-none focus:outline-none focus:placeholder:text-black active:outline-none disabled:text-muted"
          value={newTodo}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Add a task"
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </div>
      <Actions disabled={disabled} onAddTodo={handleAdd} />
    </div>
  );
};

export default AddNewTodo;
