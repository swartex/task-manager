'use client';

import { FC, useState, useRef, FocusEvent, useEffect, KeyboardEvent } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TodoWithCategory } from '@/types/TodoWithCategory';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { CalendarClock, DeleteIcon, Edit3, Tags } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { format } from 'date-fns';
import Tag from '@/components/ui/Tag';
import Input from '@/components/ui/input';
import { cn } from '@/libs/utils';
import { Todo } from '@prisma/client';

interface TodoItemProps {
  todo: TodoWithCategory;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { onOpen } = useModal();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  const handleCheckComplite = async (todoId: string, newStatus: boolean) => {
    await axios.patch('/api/v1/todo', {
      id: todoId,
      status: newStatus,
    });
    router.refresh();
  };
  const handleDeleteTodo = (todoId: string) => {
    axios
      .delete('/api/v1/todo', {
        data: {
          todoId,
        },
      })
      .then(() => {
        router.refresh();
        toast({
          variant: 'success',
          description: `Toto was been deleted`,
        });
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (isEdit && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editInputRef.current, isEdit]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>, todo: Todo) => {
    console.log(e.key);
    //
    if (e.key === 'Enter') {
      if (newTitle !== todo.title) {
        await axios.patch('/api/v1/todo', {
          id: todo.id,
          title: newTitle,
        });
        router.refresh();
      }
      setIsEdit(false);
      setNewTitle(todo.title);
    }
    if (e.key === 'Escape') {
      setIsEdit(false);
      setNewTitle(todo.title);
    }
  };

  return (
    <div className={cn('group rounded-md p-3 shadow-md', todo.status && 'opacity-70')}>
      <div className="flex flex-row items-center gap-5">
        <Checkbox
          onCheckedChange={(status) => handleCheckComplite(todo.id, !!status)}
          checked={todo.status}
        />{' '}
        {!isEdit && (
          <span
            onClick={() => setIsEdit(true)}
            className={cn('font-semibold', todo.status && 'text-muted-foreground line-through')}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <Input
            ref={editInputRef}
            value={newTitle}
            onKeyDown={(e) => handleKeyDown(e, todo)}
            onBlur={() => {
              setIsEdit(false);
              setNewTitle(todo.title);
            }}
            className="max-w-[300px]"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        )}
        <div className="ml-auto flex max-w-[250px] flex-row gap-2 opacity-0 transition group-hover:opacity-100">
          <button
            className="h-6 w-6 rounded p-[3px] transition hover:bg-slate-200"
            onClick={() => {
              onOpen('updateTodo', {
                todo,
              });
            }}
          >
            <Edit3 className="h-4 w-4 text-sky-600 transition " />
          </button>
          <button className="h-6 w-6 rounded p-[3px] hover:bg-slate-200">
            <DeleteIcon
              className="h-4 w-4 text-red-500"
              onClick={() => handleDeleteTodo(todo.id)}
            />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1 pl-9 pt-2 text-[10px] leading-none text-zinc-400 group-hover:visible">
        {todo.deadline && (
          <>
            <CalendarClock className="h-3 w-3" />{' '}
            <span className="mr-4">
              {todo.deadline && format(new Date(todo.deadline), 'd MMM yyyy, HH:mm')}
            </span>
          </>
        )}
        <div className="flex items-center gap-2">
          <Tags className="h-3 w-3" />
          <Tag title="tags" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
