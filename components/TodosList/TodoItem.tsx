'use client';

import { FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TodoWithCategory } from '@/types/TodoWithCategory';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { CalendarClock, DeleteIcon, Edit3, Tags } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { format } from 'date-fns';
import Tag from '@/components/ui/Tag';

interface TodoItemProps {
  todo: TodoWithCategory;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { onOpen } = useModal();
  const handleCheckComplite = async (todoId: string, newStatus: boolean) => {
    await axios.patch('/api/v1/todo', {
      ...todo,
      status: newStatus,
    });
    router.refresh();
  };
  const handleDeleteTodo = async (todoId: string) => {
    await axios.delete('/api/v1/todo', {
      data: {
        todoId,
      },
    });
    router.refresh();
    toast({
      variant: 'success',
      description: `Toto was been deleted`,
    });
  };

  return (
    <div className="group rounded-md p-3 shadow-md ">
      <div className="flex flex-row items-center gap-5">
        <Checkbox
          onCheckedChange={(status) => handleCheckComplite(todo.id, !!status)}
          checked={todo.status}
        />{' '}
        <span>{todo.title}</span>
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
        <CalendarClock className="h-3 w-3" />{' '}
        {todo.deadline && format(new Date(todo.deadline), 'd MMM yyyy, HH:mm')}
        <div className="ml-4 flex items-center gap-2">
          <Tags className="h-3 w-3" />
          <Tag title="tags" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
