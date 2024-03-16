'use client';
import { TodoWithCategory } from '@/types/TodoWithCategory';

import TodoItem from './TodoItem';
import AddNewTodo from '@/components/AddNewTodo';

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
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <p className="py-7 text-lg font-semibold text-muted-foreground">No todos</p>
      )}
    </>
  );
}
