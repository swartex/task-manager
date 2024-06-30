'use client';

import { type Category } from '@prisma/client';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

import { deleteCategory } from '@/actions/deleteCategory';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAction } from '@/hooks/useAction';
import { useModal } from '@/hooks/useModal';

interface CategoryListProps {
  categories: (Category & {
    _count: {
      Todos: number;
    };
  })[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const { onOpen } = useModal();
  const { execute } = useAction(deleteCategory, {
    onSuccess: (data) => {
      toast.success(`Category ${data.title} remove`);
    },
    onError: (error) => toast.error(error),
  });

  const handleDeleteCategory = async (id: string) => {
    execute({ id });
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => onOpen('createCategory')}
        className="flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4 text-green-800" /> Add new
      </Button>
      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-center">Count</TableHead>
            <TableHead className="w-[200px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                {item.description ?? <span className="text-gray-400/70">Empty</span>}
              </TableCell>
              <TableCell>{item.slug ?? <span className="text-gray-400/70">Empty</span>}</TableCell>
              <TableCell className="text-center">{item._count.Todos}</TableCell>
              <TableCell className="fle-row flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    onOpen('updateCategory', {
                      category: item,
                    })
                  }
                >
                  Update
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteCategory(item.id)}>
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
