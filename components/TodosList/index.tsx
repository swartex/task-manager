'use client';
import { TodoWithCategory } from '@/types/TodoWithCategory';

import TodoItem from './TodoItem';

interface TodoListProps {
  todos: TodoWithCategory[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
