import { FC } from 'react';
import prisma from '@/libs/prismadb';
import Link from 'next/link';
import ActionButtons from './ActionButtons';

const SideBar: FC = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          Todos: {
            where: {
              status: false,
            },
          },
        },
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  return (
    <aside className="w-[300px] border-r-2 border-slate-300/20">
      {categories.map((category) => {
        return (
          <Link
            href={`/category/${category.id}`}
            key={category.id}
            className="flex items-center justify-between gap-3 px-6 py-3 transition hover:bg-blue-300/20"
          >
            {category.title}
            <span className="text-[12px] font-semibold text-zinc-700">{category._count.Todos}</span>
          </Link>
        );
      })}

      {/* <ActionButtons /> */}
    </aside>
  );
};

export default SideBar;
