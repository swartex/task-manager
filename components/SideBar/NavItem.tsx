'use client';

import { cn } from '@/libs/utils';
import { Category } from '@prisma/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC } from 'react';

type CategoryWithTodosCount = Category & {
  _count: {
    Todos: number;
  };
};
interface NavItemProps {
  category: CategoryWithTodosCount;
}

const NavItem: FC<NavItemProps> = ({ category }) => {
  const params = useParams();
  return (
    <li>
      <Link
        href={`/category/${category.id}`}
        key={category.id}
        className={cn(
          'flex items-center justify-between gap-3 px-6 py-3 transition hover:bg-blue-300/20',
          category.id === params?.categoryId && 'border-l-4 border-cyan-600 bg-blue-300/10',
        )}
      >
        {category.title}
        <span className="text-[12px] font-semibold text-zinc-700">{category._count.Todos}</span>
      </Link>
    </li>
  );
};

export default NavItem;
