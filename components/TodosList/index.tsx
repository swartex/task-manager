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
import { useToast } from '@/components/ui/use-toast';
import { TodoWithCategory } from '@/types/TodoWithCategory';
import { Check, CheckCheck, PlusCircle } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface TodoListProps {
  todos: TodoWithCategory[];
}

export default function TodoList({ todos }: TodoListProps) {
  const { onOpen } = useModal();
  const router = useRouter();
  const { toast } = useToast();

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
    <>
      <Button
        variant="outline"
        onClick={() => onOpen('createTodo')}
        className="flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4 text-green-800" /> Add new
      </Button>
      <Table>
        <TableCaption>All todos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">№</TableHead>
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
                <Button variant="destructive" onClick={() => handleDeleteTodo(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
