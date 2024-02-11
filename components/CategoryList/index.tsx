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
import { Category } from '@prisma/client';
import { useModal } from '@/hooks/useModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';

interface CategoryListProps {
  categories: (Category & {
    _count: {
      Todos: number;
    };
  })[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const { onOpen } = useModal();
  const router = useRouter();

  const handleDeleteCategory = async (id: string) => {
    await axios.delete('/api/v1/category', {
      data: {
        id,
      },
    });
    router.refresh();
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
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Count</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
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
