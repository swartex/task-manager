'use client';
import AddNewTodo from '@/components/AddNewTodo';
import EmptyState from '@/components/ui/EmptyState';
import { type TodoWithCategory } from '@/types/TodoWithCategory';

import TodoItem from './TodoItem';

interface TodoListProps {
  todos: TodoWithCategory[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <>
      <AddNewTodo />
      {todos.length > 0 ? (
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem key={todo.id}    todo={todo} />
          ))}
        </div>
      ) : (
        <EmptyState text="No todos" />
      )}
    </>
  );
}
