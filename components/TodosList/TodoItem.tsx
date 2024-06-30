'use client';

import { type Todo } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarClock, DeleteIcon, Edit3, Tags } from 'lucide-react';
import { type FC, useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { toast } from 'sonner';

import { deleteTodo } from '@/actions/deleteTodo';
import { updateTodo } from '@/actions/updateTodo';
import { Checkbox } from '@/components/ui/checkbox';
import Input from '@/components/ui/input';
import Tag from '@/components/ui/Tag';
import { useAction } from '@/hooks/useAction';
import { useModal } from '@/hooks/useModal';
import { cn } from '@/libs/utils';
import { type TodoWithCategory } from '@/types/TodoWithCategory';

interface TodoItemProps {
  todo: TodoWithCategory;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const { onOpen } = useModal();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  const { execute: executeDelete } = useAction(deleteTodo, {
    onSuccess: (data) => {
      toast.warning(`Todo "${data.title} was been deleted`);
    },
  });

  const { execute: executeUpdate } = useAction(updateTodo, {
    onSuccess: (data) => {
      toast.success(`Todo "${data.title}" was updated`);
    },
  });

  const handleDeleteTodo = (todoId: string) => {
    executeDelete({
      id: todoId,
    });
  };

  useEffect(() => {
    if (isEdit && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEdit]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>, todo: Todo) => {
    if (e.key === 'Enter') {
      if (newTitle !== todo.title) {
        executeUpdate({
          id: todo.id,
          title: newTitle,
        });
      }
      setIsEdit(false);
      setNewTitle(todo.title);
    }
    if (e.key === 'Escape') {
      setIsEdit(false);
    }
  };

  const handleCheckComplite = async (todoId: string, newStatus: boolean) => {
    executeUpdate({
      id: todoId,
      status: newStatus,
    });
  };

  return (
    <div className={cn('group rounded-md bg-white p-3 shadow-md', todo.status && 'opacity-70')}>
      <div className="flex flex-row items-center gap-5">
        <Checkbox
          onCheckedChange={(status) => handleCheckComplite(todo.id, !!status)}
          checked={todo.status}
        />
        {!isEdit && (
          <span
            role="button"
            onClick={() => setIsEdit(true)}
            className={cn('font-medium', todo.status && 'text-muted-foreground line-through')}
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
            className="h-6 w-6 rounded p-1 transition hover:bg-slate-200"
            onClick={() => {
              onOpen('updateTodo', {
                todo,
              });
            }}
          >
            <Edit3 size={16} className="text-sky-600 transition" />
          </button>
          <button className="h-6 w-6 rounded p-1 hover:bg-slate-200">
            <DeleteIcon
              size={16}
              className="text-red-500"
              onClick={() => handleDeleteTodo(todo.id)}
            />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1 pl-9 pt-2 text-[10px] leading-none text-zinc-400 group-hover:visible">
        {todo.deadline && (
          <>
            <CalendarClock size={12} />{' '}
            <span className="mr-4">
              {todo.deadline && format(new Date(todo.deadline), 'd MMM yyyy, HH:mm')}
            </span>
          </>
        )}
        <div className="flex items-center gap-2">
          <Tags size={12} />
          <Tag title="tags" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
