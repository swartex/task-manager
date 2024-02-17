'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';
import { TodoWithCategory } from '@/types/TodoWithCategory';
import { PlusCircle } from 'lucide-react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: TodoWithCategory[];
}

export default function TodoList({ todos }: TodoListProps) {
  const { onOpen } = useModal();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => onOpen('createTodo')}
        className="flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4 text-green-800" /> Add new
      </Button>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
