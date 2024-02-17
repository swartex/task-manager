'use client';

import { FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TodoWithCategory } from '@/types/TodoWithCategory';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { DeleteIcon, Edit3 } from 'lucide-react';
import { useModal } from '@/hooks/useModal';

interface TodoItemProps {
  todo: TodoWithCategory;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { onOpen } = useModal();
  const handleCheckComplite = async (todoId: string, newStatus: boolean) => {
    await axios.patch('api/v1/todo', {
      todoId: todo.id,
      ...todo,
      status: newStatus,
    });
    router.refresh();
  };
  const handleDeleteTodo = async (todoId: string) => {
    await axios.delete('api/v1/todo', {
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
    <div className="group flex flex-row items-center gap-5 rounded-md p-3 shadow-md ">
      <Checkbox
        onCheckedChange={(status) => handleCheckComplite(todo.id, !!status)}
        checked={todo.status}
      />{' '}
      <span>{todo.title}</span>
      <div className="ml-auto flex max-w-[250px] flex-row gap-2 opacity-0 transition group-hover:opacity-100">
        <button
          onClick={() => {
            onOpen('updateTodo', {
              todo,
            });
          }}
        >
          <Edit3 className="h-4 w-4 text-sky-600" />
        </button>
        <button>
          <DeleteIcon className="h-4 w-4 text-red-500" onClick={() => handleDeleteTodo(todo.id)} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
