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
    <aside className="fixed left-0 top-0 z-30 flex h-full w-[200px] min-w-[200px] flex-col gap-4 bg-slate-100/50 px-2 py-3">
      {categories.map((category) => {
        return (
          <Link
            href={`/category/${category.id}`}
            key={category.id}
            className="flex items-center justify-between gap-3 rounded-md p-2 transition hover:bg-blue-300/20"
          >
            {category.title}
            <span className="rounded-lg bg-slate-400/50 px-[10px] py-[3px] text-[10px] text-zinc-700">
              {category._count.Todos}
            </span>
          </Link>
        );
      })}

      <ActionButtons />
    </aside>
  );
};

export default SideBar;
