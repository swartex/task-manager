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

interface CategoryTableProps {
  categories: (Category & {
    _count: {
      Todos: number;
    };
  })[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  const { onOpen } = useModal();

  return (
    <div>
      <Button variant="outline" onClick={() => onOpen('cteateCategory')}>
        Add
      </Button>
      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{item._count.Todos}</TableCell>
              <TableCell className="fle-row flex gap-2">
                <Button variant="outline">Update</Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
