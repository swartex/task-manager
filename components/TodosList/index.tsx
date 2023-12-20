'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';
import { TodoWithCategory } from '@/types/TodoWithCategory';
import { Check, CheckCheck } from 'lucide-react';

interface TodoListProps {
  todos: TodoWithCategory[];
}

export default function TodoList({ todos }: TodoListProps) {
  const { onOpen } = useModal();
  // console.log(todos);

  return (
    <>
      <Button variant="outline" onClick={() => onOpen('createTodo')}>
        Add
      </Button>
      <Table>
        <TableCaption>All todos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                {item.status ? (
                  <CheckCheck className="h-4 w-4 text-green-500" />
                ) : (
                  <Check className="h-4 w-4 text-red-500" />
                )}
              </TableCell>
              <TableCell>{item.category.title}</TableCell>
              <TableCell className="fle-row flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    onOpen('updateTodo', {
                      todo: item,
                    })
                  }
                >
                  Update
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
